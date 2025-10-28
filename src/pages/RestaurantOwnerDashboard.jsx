// // src/pages/RestaurantOwnerDashboard.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   orderBy,
//   query,
//   updateDoc,
// } from "firebase/firestore";
// import { db } from "../lib/firebase";
// import { useAuthOwner } from "../hooks/useAuthOwner";

// const emptyForm = { name: "", price: "", description: "", image: "", available: true };

// const RestaurantOwnerDashboard = () => {
//   const { loading, restaurant } = useAuthOwner();
//   const [menu, setMenu] = useState([]);
//   const [form, setForm] = useState(emptyForm);
//   const [saving, setSaving] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [err, setErr] = useState("");

//   // edit state
//   const [editingId, setEditingId] = useState(null);
//   const [edit, setEdit] = useState(emptyForm);

//   // load menu realtime for this restaurant
//   useEffect(() => {
//     if (!restaurant?.id) return;
//     const q = query(
//       collection(db, "restaurants", restaurant.id, "menu"),
//       orderBy("name")
//     );
//     const unsub = onSnapshot(
//       q,
//       (snap) => {
//         setMenu(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
//       },
//       (e) => setErr(e.message || "Failed to load menu")
//     );
//     return () => unsub();
//   }, [restaurant?.id]);

//   const canAdd = useMemo(
//     () => form.name && form.price && !isNaN(Number(form.price)),
//     [form]
//   );

//   const addMenuItem = async (e) => {
//     e.preventDefault();
//     if (!restaurant?.id) return;
//     setSaving(true);
//     setMsg("");
//     setErr("");
//     try {
//       await addDoc(collection(db, "restaurants", restaurant.id, "menu"), {
//         name: form.name.trim(),
//         price: Number(form.price),
//         description: form.description || "",
//         image: form.image || "",
//         available: !!form.available,
//       });
//       setForm(emptyForm);
//       setMsg("Menu item added!");
//     } catch (e) {
//       setErr(e.message || "Failed to add menu item.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const startEdit = (row) => {
//     setEditingId(row.id);
//     setEdit({
//       name: row.name || "",
//       price: row.price || "",
//       description: row.description || "",
//       image: row.image || "",
//       available: !!row.available,
//     });
//     setMsg("");
//     setErr("");
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setEdit(emptyForm);
//   };

//   const saveEdit = async (id) => {
//     if (!restaurant?.id) return;
//     setSaving(true);
//     setMsg("");
//     setErr("");
//     try {
//       await updateDoc(doc(db, "restaurants", restaurant.id, "menu", id), {
//         name: edit.name.trim(),
//         price: Number(edit.price),
//         description: edit.description || "",
//         image: edit.image || "",
//         available: !!edit.available,
//       });
//       setMsg("Menu item updated!");
//       cancelEdit();
//     } catch (e) {
//       setErr(e.message || "Failed to update item.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const removeItem = async (id) => {
//     if (!restaurant?.id) return;
//     setErr("");
//     setMsg("");
//     try {
//       await deleteDoc(doc(db, "restaurants", restaurant.id, "menu", id));
//       setMsg("Item deleted.");
//     } catch (e) {
//       setErr(e.message || "Failed to delete item.");
//     }
//   };

//   const toggleAvailability = async (row) => {
//     if (!restaurant?.id) return;
//     setErr("");
//     try {
//       await updateDoc(doc(db, "restaurants", restaurant.id, "menu", row.id), {
//         available: !row.available,
//       });
//     } catch (e) {
//       setErr(e.message || "Failed to change availability.");
//     }
//   };

//   if (loading) return <div className="px-4 md:px-10 lg:px-20 py-6">Loading…</div>;
//   if (!restaurant)
//     return (
//       <div className="px-4 md:px-10 lg:px-20 py-6">
//         <p className="text-amber-700">
//           No confirmed restaurant found for your account yet.
//         </p>
//       </div>
//     );

//   return (
//     <div className="px-4 md:px-10 lg:px-20 py-6">
//       <h1 className="text-2xl font-bold mb-2">Restaurant Dashboard</h1>
//       <p className="text-sm text-gray-600 mb-4">
//         <b>{restaurant.name}</b> — <code>/r/{restaurant.slug}</code> —{" "}
//         <span className={restaurant.status === "confirmed" ? "text-green-700" : "text-amber-700"}>
//           {restaurant.status}
//         </span>
//       </p>

//       {msg && <p className="mb-3 text-sm text-green-700">{msg}</p>}
//       {err && <p className="mb-3 text-sm text-red-600">{err}</p>}

//       {/* Add menu item */}
//       <div className="bg-white rounded shadow p-4 mb-6">
//         <h2 className="font-semibold mb-3">Add New Menu Item</h2>
//         <form onSubmit={addMenuItem} className="grid md:grid-cols-2 gap-3">
//           <input
//             value={form.name}
//             onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
//             placeholder="Name"
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="number"
//             value={form.price}
//             onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
//             placeholder="Price (₦)"
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             value={form.image}
//             onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
//             placeholder="Image URL"
//             className="border p-2 rounded"
//           />
//           <select
//             value={form.available ? "1" : "0"}
//             onChange={(e) => setForm((f) => ({ ...f, available: e.target.value === "1" }))}
//             className="border p-2 rounded"
//           >
//             <option value="1">Available</option>
//             <option value="0">Unavailable</option>
//           </select>
//           <textarea
//             value={form.description}
//             onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
//             placeholder="Description"
//             className="border p-2 rounded md:col-span-2"
//             rows={3}
//           />
//           <button disabled={!canAdd || saving} className="bg-red-600 text-white py-2 rounded md:col-span-2">
//             {saving ? "Saving…" : "Add Item"}
//           </button>
//         </form>
//       </div>

//       {/* List + edit menu items */}
//       <div className="bg-white rounded shadow p-4">
//         <h2 className="font-semibold mb-3">Your Menu</h2>
//         {menu.length === 0 ? (
//           <p className="text-sm text-gray-500">No items yet.</p>
//         ) : (
//           <div className="overflow-auto rounded border">
//             <table className="min-w-full text-sm">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="text-left py-2 px-3">Item</th>
//                   <th className="text-left py-2 px-3">Price</th>
//                   <th className="text-left py-2 px-3">Available</th>
//                   <th className="text-right py-2 px-3">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {menu.map((row) => (
//                   <tr key={row.id} className="border-t align-top">
//                     <td className="py-2 px-3">
//                       {editingId === row.id ? (
//                         <>
//                           <input
//                             value={edit.name}
//                             onChange={(e) => setEdit((x) => ({ ...x, name: e.target.value }))}
//                             className="border p-2 rounded w-full mb-2"
//                             placeholder="Name"
//                           />
//                           <textarea
//                             value={edit.description}
//                             onChange={(e) => setEdit((x) => ({ ...x, description: e.target.value }))}
//                             className="border p-2 rounded w-full"
//                             placeholder="Description"
//                             rows={3}
//                           />
//                           <input
//                             value={edit.image}
//                             onChange={(e) => setEdit((x) => ({ ...x, image: e.target.value }))}
//                             className="border p-2 rounded w-full mt-2"
//                             placeholder="Image URL"
//                           />
//                         </>
//                       ) : (
//                         <>
//                           <div className="font-medium">{row.name}</div>
//                           <div className="text-xs text-gray-500 line-clamp-2">{row.description}</div>
//                         </>
//                       )}
//                     </td>
//                     <td className="py-2 px-3">
//                       {editingId === row.id ? (
//                         <input
//                           type="number"
//                           value={edit.price}
//                           onChange={(e) => setEdit((x) => ({ ...x, price: e.target.value }))}
//                           className="border p-2 rounded w-28"
//                           placeholder="Price"
//                         />
//                       ) : (
//                         <>₦{Number(row.price || 0).toLocaleString()}</>
//                       )}
//                     </td>
//                     <td className="py-2 px-3">
//                       {editingId === row.id ? (
//                         <select
//                           value={edit.available ? "1" : "0"}
//                           onChange={(e) => setEdit((x) => ({ ...x, available: e.target.value === "1" }))}
//                           className="border p-2 rounded"
//                         >
//                           <option value="1">Available</option>
//                           <option value="0">Unavailable</option>
//                         </select>
//                       ) : (
//                         <button
//                           onClick={() => toggleAvailability(row)}
//                           className={
//                             row.available
//                               ? "text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
//                               : "text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
//                           }
//                           title="Toggle availability"
//                         >
//                           {row.available ? "Available" : "Unavailable"}
//                         </button>
//                       )}
//                     </td>
//                     <td className="py-2 px-3 text-right space-x-2">
//                       {editingId === row.id ? (
//                         <>
//                           <button
//                             onClick={() => saveEdit(row.id)}
//                             disabled={saving}
//                             className="text-xs bg-blue-600 text-white px-3 py-1 rounded"
//                           >
//                             {saving ? "Saving…" : "Save"}
//                           </button>
//                           <button
//                             onClick={cancelEdit}
//                             className="text-xs border px-3 py-1 rounded"
//                           >
//                             Cancel
//                           </button>
//                         </>
//                       ) : (
//                         <>
//                           <button
//                             onClick={() => startEdit(row)}
//                             className="text-xs border px-3 py-1 rounded"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => removeItem(row.id)}
//                             className="text-xs bg-red-600 text-white px-3 py-1 rounded"
//                           >
//                             Delete
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RestaurantOwnerDashboard;












































































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
  MdAttachMoney,
  MdDescription
} from "react-icons/md";

const emptyForm = { name: "", price: "", description: "", image: "", available: true };

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

  const canAdd = useMemo(
    () => form.name && form.price && !isNaN(Number(form.price)),
    [form]
  );

  const addMenuItem = async (e) => {
    e.preventDefault();
    if (!restaurant?.id) return;
    setSaving(true);
    setMsg("");
    setErr("");
    try {
      await addDoc(collection(db, "restaurants", restaurant.id, "menu"), {
        name: form.name.trim(),
        price: Number(form.price),
        description: form.description || "",
        image: form.image || "",
        available: !!form.available,
      });
      setForm(emptyForm);
      setMsg("Menu item added!");
    } catch (e) {
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
    setSaving(true);
    setMsg("");
    setErr("");
    try {
      await updateDoc(doc(db, "restaurants", restaurant.id, "menu", id), {
        name: edit.name.trim(),
        price: Number(edit.price),
        description: edit.description || "",
        image: edit.image || "",
        available: !!edit.available,
      });
      setMsg("Menu item updated!");
      cancelEdit();
    } catch (e) {
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
      setErr(e.message || "Failed to change availability.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium text-lg">Loading dashboard...</p>
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
          <h2 className="text-2xl font-bold text-gray-800 mb-3">No Restaurant Found</h2>
          <p className="text-amber-700 leading-relaxed">
            No confirmed restaurant found for your account yet. Please contact admin for activation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30">
      <div className="px-4 md:px-10 lg:px-20 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-gray-100">
            <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-500 p-8 md:p-12">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              </div>

              <div className="relative flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <MdRestaurant className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl font-black text-white mb-2">{restaurant.name}</h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <code className="bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-mono">
                      /r/{restaurant.slug}
                    </code>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                      restaurant.status === "confirmed" 
                        ? "bg-green-400 text-green-900" 
                        : "bg-amber-400 text-amber-900"
                    }`}>
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

          {/* Add Menu Item Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <MdAdd className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Add New Menu Item</h2>
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
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
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
                      onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                      placeholder="e.g., 2500"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Image URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MdImage className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      value={form.image}
                      onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none"
                    />
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    value={form.available ? "1" : "0"}
                    onChange={(e) => setForm((f) => ({ ...f, available: e.target.value === "1" }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none"
                  >
                    <option value="1">✓ Available</option>
                    <option value="0">✗ Unavailable</option>
                  </select>
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
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
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
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
                <span className="text-sm font-bold text-gray-700">{menu.length} items</span>
              </div>
            </div>

            {menu.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MdRestaurant className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">No menu items yet. Add your first item above!</p>
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
                            onChange={(e) => setEdit((x) => ({ ...x, name: e.target.value }))}
                            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                            placeholder="Name"
                          />
                          <input
                            type="number"
                            value={edit.price}
                            onChange={(e) => setEdit((x) => ({ ...x, price: e.target.value }))}
                            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                            placeholder="Price"
                          />
                        </div>
                        <textarea
                          value={edit.description}
                          onChange={(e) => setEdit((x) => ({ ...x, description: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none resize-none"
                          placeholder="Description"
                          rows={3}
                        />
                        <input
                          value={edit.image}
                          onChange={(e) => setEdit((x) => ({ ...x, image: e.target.value }))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                          placeholder="Image URL"
                        />
                        <select
                          value={edit.available ? "1" : "0"}
                          onChange={(e) => setEdit((x) => ({ ...x, available: e.target.value === "1" }))}
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
                            <span>{saving ? "Saving..." : "Save Changes"}</span>
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
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{row.name}</h3>
                          {row.description && (
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{row.description}</p>
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
                              {row.available ? "✓ Available" : "✗ Unavailable"}
                            </button>
                          </div>
                        </div>
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