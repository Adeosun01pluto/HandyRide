// src/pages/RestaurantOwnerDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuthOwner } from "../hooks/useAuthOwner";
import {
  MdRestaurant,
  MdAdd,
  MdEdit,
  MdDelete,
  MdSave,
  MdClose,
  MdCheckCircle,
  MdCancel,
  MdImage,
  MdDescription,
} from "react-icons/md";

// 👇 Reuse the Cloudinary helper you exported from AdminDashboard
import { uploadImageToCloudinary } from "./AdminDashboard";

const emptyForm = {
  name: "",
  price: "",
  description: "",
  image: "",
  available: true,
  categoryId: "",
};

const RestaurantOwnerDashboard = () => {
  const { loading, restaurant } = useAuthOwner();

  const [menu, setMenu] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  // edit state
  const [editingId, setEditingId] = useState(null);
  const [edit, setEdit] = useState(emptyForm);

  // image upload states
  const [uploadingNew, setUploadingNew] = useState(false);
  const [uploadingEdit, setUploadingEdit] = useState(false);

  // 🏷 Categories
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [savingCategory, setSavingCategory] = useState(false);

  // load menu realtime for this restaurant
  useEffect(() => {
    if (!restaurant?.id) return;
    const q = query(
      collection(db, "restaurants", restaurant.id, "menu"),
      orderBy("name")
    );
    const unsub = onSnapshot(
      q,
      (snap) => {
        setMenu(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
      (e) => setErr(e.message || "Failed to load menu")
    );
    return () => unsub();
  }, [restaurant?.id]);

  // load categories realtime
  useEffect(() => {
    if (!restaurant?.id) return;
    const cq = query(
      collection(db, "restaurants", restaurant.id, "categories"),
      orderBy("name")
    );
    const unsub = onSnapshot(
      cq,
      (snap) => {
        setCategories(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
      (e) => setErr(e.message || "Failed to load categories")
    );
    return () => unsub();
  }, [restaurant?.id]);

  const canAdd = useMemo(
    () => form.name && form.price && !isNaN(Number(form.price)),
    [form]
  );

  /* ------------ Cloudinary upload handlers ------------ */

  const handleNewImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErr("");
    setMsg("");
    setUploadingNew(true);

    try {
      const { secureUrl } = await uploadImageToCloudinary(file);
      setForm((f) => ({ ...f, image: secureUrl }));
      setMsg("Menu image uploaded ✅");
    } catch (error) {
      console.error(error);
      setErr(error.message || "Failed to upload image.");
    } finally {
      setUploadingNew(false);
    }
  };

  const handleEditImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErr("");
    setMsg("");
    setUploadingEdit(true);

    try {
      const { secureUrl } = await uploadImageToCloudinary(file);
      setEdit((x) => ({ ...x, image: secureUrl }));
      setMsg("Menu image updated ✅");
    } catch (error) {
      console.error(error);
      setErr(error.message || "Failed to upload image.");
    } finally {
      setUploadingEdit(false);
    }
  };

  /* ------------ CATEGORY CRUD (simple add) ------------ */

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!restaurant?.id) return;
    const name = newCategoryName.trim();
    if (!name) return;

    setSavingCategory(true);
    setErr("");
    setMsg("");

    try {
      const ref = await addDoc(
        collection(db, "restaurants", restaurant.id, "categories"),
        { name }
      );
      setMsg("Category added!");
      setNewCategoryName("");

      // Auto-select this new category in the menu form
      setForm((f) => ({ ...f, categoryId: ref.id }));
    } catch (error) {
      console.error(error);
      setErr(error.message || "Failed to add category.");
    } finally {
      setSavingCategory(false);
    }
  };

  /* ------------ Menu CRUD ------------ */

  const addMenuItem = async (e) => {
    e.preventDefault();
    if (!restaurant?.id) return;
    if (uploadingNew) {
      setErr("Please wait for the image upload to finish.");
      return;
    }

    setSaving(true);
    setMsg("");
    setErr("");
    try {
      const selectedCat = categories.find((c) => c.id === form.categoryId);

      await addDoc(collection(db, "restaurants", restaurant.id, "menu"), {
        name: form.name.trim(),
        price: Number(form.price),
        description: form.description || "",
        image: form.image || "",
        available: !!form.available,
        categoryId: selectedCat ? selectedCat.id : "",
        categoryName: selectedCat ? selectedCat.name : "",
      });

      setForm(emptyForm);
      setMsg("Menu item added!");
    } catch (e) {
      console.error(e);
      setErr(e.message || "Failed to add menu item.");
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (row) => {
    setEditingId(row.id);
    setEdit({
      name: row.name || "",
      price: row.price || "",
      description: row.description || "",
      image: row.image || "",
      available: !!row.available,
      categoryId: row.categoryId || "",
    });
    setMsg("");
    setErr("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEdit(emptyForm);
  };

  const saveEdit = async (id) => {
    if (!restaurant?.id) return;
    if (uploadingEdit) {
      setErr("Please wait for the image upload to finish.");
      return;
    }

    setSaving(true);
    setMsg("");
    setErr("");
    try {
      const selectedCat = categories.find((c) => c.id === edit.categoryId);

      await updateDoc(doc(db, "restaurants", restaurant.id, "menu", id), {
        name: edit.name.trim(),
        price: Number(edit.price),
        description: edit.description || "",
        image: edit.image || "",
        available: !!edit.available,
        categoryId: selectedCat ? selectedCat.id : "",
        categoryName: selectedCat ? selectedCat.name : "",
      });
      setMsg("Menu item updated!");
      cancelEdit();
    } catch (e) {
      console.error(e);
      setErr(e.message || "Failed to update item.");
    } finally {
      setSaving(false);
    }
  };

  const removeItem = async (id) => {
    if (!restaurant?.id) return;
    setErr("");
    setMsg("");
    try {
      await deleteDoc(doc(db, "restaurants", restaurant.id, "menu", id));
      setMsg("Item deleted.");
    } catch (e) {
      console.error(e);
      setErr(e.message || "Failed to delete item.");
    }
  };

  const toggleAvailability = async (row) => {
    if (!restaurant?.id) return;
    setErr("");
    try {
      await updateDoc(doc(db, "restaurants", restaurant.id, "menu", row.id), {
        available: !row.available,
      });
    } catch (e) {
      console.error(e);
      setErr(e.message || "Failed to change availability.");
    }
  };

  /* ------------ Guards ------------ */

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium text-lg">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 flex items-center justify-center p-6">
        <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-md">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MdRestaurant className="w-10 h-10 text-amber-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            No Restaurant Found
          </h2>
          <p className="text-amber-700 leading-relaxed">
            No confirmed restaurant found for your account yet. Please contact
            admin for activation.
          </p>
        </div>
      </div>
    );
  }

  /* ------------ Render ------------ */

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30">
      <div className="px-4 md:px-10 lg:px-20 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-gray-100">
            <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-500 p-8 md:p-12">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              </div>

              <div className="relative flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <MdRestaurant className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-black text-white mb-2">
                    {restaurant.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <code className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-mono">
                      /r/{restaurant.slug}
                    </code>
                    <span
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                        restaurant.status === "confirmed"
                          ? "bg-green-400 text-green-900"
                          : "bg-amber-400 text-amber-900"
                      }`}
                    >
                      {restaurant.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          {msg && (
            <div className="mb-6 bg-green-50 border-2 border-green-300 rounded-2xl p-4 flex items-center gap-3">
              <MdCheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
              <p className="text-green-800 font-medium">{msg}</p>
            </div>
          )}
          {err && (
            <div className="mb-6 bg-red-50 border-2 border-red-300 rounded-2xl p-4 flex items-center gap-3">
              <MdCancel className="w-6 h-6 text-red-600 flex-shrink-0" />
              <p className="text-red-800 font-medium">{err}</p>
            </div>
          )}

          {/* CATEGORY MANAGER */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 text-lg">🏷️</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Menu Categories
                </h2>
                <p className="text-xs text-gray-500">
                  Add categories like &quot;Rice&quot;, &quot;Drinks&quot;,
                  &quot;Swallow&quot; to organize your menu.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleAddCategory}
              className="flex flex-col sm:flex-row gap-3 mb-4"
            >
              <input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g., Rice Dishes, Drinks, Protein"
                className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none text-sm"
              />
              <button
                type="submit"
                disabled={!newCategoryName.trim() || savingCategory}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {savingCategory ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Adding…</span>
                  </>
                ) : (
                  <>
                    <MdAdd className="w-4 h-4" />
                    <span>Add Category</span>
                  </>
                )}
              </button>
            </form>

            {categories.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <span
                    key={c.id}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-700"
                  >
                    {c.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500">
                No categories yet. Add at least one to start organizing your
                menu.
              </p>
            )}
          </div>

          {/* Add Menu Item Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <MdAdd className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Add New Menu Item
              </h2>
            </div>

            <form onSubmit={addMenuItem} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Item Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MdRestaurant className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="e.g., Jollof Rice Special"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (₦)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="w-5 h-5 text-gray-400">₦</span>
                    </div>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, price: e.target.value }))
                      }
                      placeholder="e.g., 2500"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Category select */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={form.categoryId}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, categoryId: e.target.value }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none text-sm"
                  >
                    <option value="">— No Category —</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Use the &quot;Menu Categories&quot; box above to create new
                    categories. New ones will show here immediately.
                  </p>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    value={form.available ? "1" : "0"}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        available: e.target.value === "1",
                      }))
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none"
                  >
                    <option value="1">✓ Available</option>
                    <option value="0">✗ Unavailable</option>
                  </select>
                </div>

                {/* Image (Cloudinary + manual URL) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Item Image
                  </label>
                  <div className="flex flex-col gap-3">
                    <label className="relative flex items-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-500 hover:bg-red-50/40 transition-all">
                      <MdImage className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        {uploadingNew
                          ? "Uploading..."
                          : "Click to select image (JPG/PNG)"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleNewImageSelect}
                      />
                    </label>

                    <input
                      value={form.image}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, image: e.target.value }))
                      }
                      placeholder="Or paste an image URL manually"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl text-xs focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none"
                    />

                    {form.image && (
                      <div className="flex items-center gap-3">
                        <img
                          src={form.image}
                          alt="Preview"
                          className="w-16 h-16 rounded-xl object-cover border"
                        />
                        <span className="text-xs text-gray-500 break-all">
                          {form.image}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-4 pointer-events-none">
                    <MdDescription className="w-5 h-5 text-gray-400" />
                  </div>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    placeholder="Describe your delicious dish..."
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none resize-none"
                    rows={3}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                disabled={!canAdd || saving}
                className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <MdAdd className="w-6 h-6" />
                    <span>Add Menu Item</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Menu List */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <MdRestaurant className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Your Menu</h2>
              <div className="ml-auto bg-gray-100 px-4 py-2 rounded-full">
                <span className="text-sm font-bold text-gray-700">
                  {menu.length} items
                </span>
              </div>
            </div>

            {menu.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MdRestaurant className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">
                  No menu items yet. Add your first item above!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {menu.map((row) => (
                  <div
                    key={row.id}
                    className="border-2 border-gray-200 rounded-2xl p-5 hover:border-red-200 hover:shadow-md transition-all duration-300"
                  >
                    {editingId === row.id ? (
                      // Edit Mode
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            value={edit.name}
                            onChange={(e) =>
                              setEdit((x) => ({
                                ...x,
                                name: e.target.value,
                              }))
                            }
                            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                            placeholder="Name"
                          />
                          <input
                            type="number"
                            value={edit.price}
                            onChange={(e) =>
                              setEdit((x) => ({
                                ...x,
                                price: e.target.value,
                              }))
                            }
                            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                            placeholder="Price"
                          />
                        </div>

                        {/* Category select in edit mode */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Category
                          </label>
                          <select
                            value={edit.categoryId || ""}
                            onChange={(e) =>
                              setEdit((x) => ({
                                ...x,
                                categoryId: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none text-sm"
                          >
                            <option value="">— No Category —</option>
                            {categories.map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <textarea
                          value={edit.description}
                          onChange={(e) =>
                            setEdit((x) => ({
                              ...x,
                              description: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none resize-none"
                          placeholder="Description"
                          rows={3}
                        />

                        {/* Edit image (Cloudinary + manual URL) */}
                        <div className="space-y-2">
                          <label className="block text-sm font-semibold text-gray-700">
                            Item Image
                          </label>
                          <label className="relative flex items-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-500 hover:bg-red-50/40 transition-all">
                            <MdImage className="w-5 h-5 text-gray-500" />
                            <span className="text-sm text-gray-700">
                              {uploadingEdit
                                ? "Uploading..."
                                : "Click to change image"}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleEditImageSelect}
                            />
                          </label>
                          <input
                            value={edit.image}
                            onChange={(e) =>
                              setEdit((x) => ({
                                ...x,
                                image: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl text-xs focus:border-red-500 focus:ring-2 focus:ring-red-100 outline-none"
                            placeholder="Image URL"
                          />
                          {edit.image && (
                            <div className="flex items-center gap-3 mt-1">
                              <img
                                src={edit.image}
                                alt="Preview"
                                className="w-16 h-16 rounded-xl object-cover border"
                              />
                              <span className="text-xs text-gray-500 break-all">
                                {edit.image}
                              </span>
                            </div>
                          )}
                        </div>

                        <select
                          value={edit.available ? "1" : "0"}
                          onChange={(e) =>
                            setEdit((x) => ({
                              ...x,
                              available: e.target.value === "1",
                            }))
                          }
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                        >
                          <option value="1">✓ Available</option>
                          <option value="0">✗ Unavailable</option>
                        </select>

                        <div className="flex gap-3">
                          <button
                            onClick={() => saveEdit(row.id)}
                            disabled={saving}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
                          >
                            <MdSave className="w-5 h-5" />
                            <span>
                              {saving ? "Saving..." : "Save Changes"}
                            </span>
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold px-6 py-3 rounded-xl transition-all duration-300"
                          >
                            <MdClose className="w-5 h-5" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-gray-900">
                              {row.name}
                            </h3>
                            {row.categoryName && (
                              <span className="px-3 py-0.5 rounded-full bg-gray-100 text-[11px] font-semibold text-gray-700">
                                {row.categoryName}
                              </span>
                            )}
                          </div>
                          {row.description && (
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                              {row.description}
                            </p>
                          )}
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-black text-gray-900">
                              ₦{Number(row.price || 0).toLocaleString()}
                            </span>
                            <button
                              onClick={() => toggleAvailability(row)}
                              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                                row.available
                                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                              }`}
                            >
                              {row.available
                                ? "✓ Available"
                                : "✗ Unavailable"}
                            </button>
                          </div>
                        </div>

                        {row.image && (
                          <img
                            src={row.image}
                            alt={row.name}
                            className="w-24 h-24 rounded-xl object-cover border md:self-center"
                          />
                        )}

                        <div className="flex md:flex-col gap-2">
                          <button
                            onClick={() => startEdit(row)}
                            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-xl transition-all duration-300"
                          >
                            <MdEdit className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => removeItem(row.id)}
                            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl transition-all duration-300"
                          >
                            <MdDelete className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantOwnerDashboard;
