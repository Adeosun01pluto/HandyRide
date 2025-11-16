// src/pages/AdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  limit,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { toSlug } from "../utils/slug";
import { useAuthAdmin } from "../hooks/useAuthAdmin";
import {
  MdAdminPanelSettings,
  MdRestaurant,
  MdVerified,
  MdAdd,
  MdRefresh,
  MdCheckCircle,
  MdCancel,
  MdLocationOn,
  MdAccessTime,
  MdDeliveryDining,
  MdImage,
  MdCode,
  MdWarning,
} from "react-icons/md";

/* ---------------------------------------------------
   Cloudinary upload helper (reusable everywhere)
   --------------------------------------------------- */

const CLOUDINARY_CLOUD_NAME = "ddvuazhuj"; // from CLOUDINARY_URL
const CLOUDINARY_UPLOAD_PRESET = "Handyride"; // unsigned preset name

/**
 * Upload an image file to Cloudinary (unsigned preset).
 * @param {File} file - File object from <input type="file" />
 * @returns {Promise<{ secureUrl: string, publicId: string, raw: any }>}
 */
export async function uploadImageToCloudinary(file) {
  if (!file) throw new Error("No file provided for upload.");

  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  // Optional: put files into a folder in your account
  // formData.append("folder", "handyride/restaurants");

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) {
    console.error("Cloudinary error:", data);
    throw new Error(data.error?.message || "Cloudinary upload failed");
  }

  return {
    secureUrl: data.secure_url,
    publicId: data.public_id,
    raw: data,
  };
}

/* ---------------------------------------------------
   Admin Dashboard
   --------------------------------------------------- */

const AdminDashboard = () => {
  const { user, isAdmin, loading } = useAuthAdmin();

  const [form, setForm] = useState({
    name: "",
    image: "", // Cloudinary URL will be stored here
    location: "",
    operatingHours: "9am to 10pm",
    deliveryAmount: "₦500",
    whatsappLink: "",
    ownerCode: "",
  });

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  // image upload state
  const [imageUploading, setImageUploading] = useState(false);

  // OwnerCode verification UI
  const [ownerVerified, setOwnerVerified] = useState(false);
  const [ownerEmail, setOwnerEmail] = useState("");
  const [verifying, setVerifying] = useState(false);

  // Pending list state
  const [pending, setPending] = useState([]);
  const [loadingPending, setLoadingPending] = useState(false);

  const slug = useMemo(() => toSlug(form.name), [form.name]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  /* ---------------- Image upload handler ---------------- */

  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErr("");
    setMsg("");
    setImageUploading(true);

    try {
      const { secureUrl } = await uploadImageToCloudinary(file);
      setForm((f) => ({ ...f, image: secureUrl }));
      setMsg("Image uploaded successfully ✅");
    } catch (error) {
      console.error(error);
      setErr(error.message || "Failed to upload image.");
    } finally {
      setImageUploading(false);
    }
  };

  /* ---------------- Owner code verification ---------------- */

  const verifyOwnerCode = async () => {
    setErr("");
    setMsg("");
    setOwnerVerified(false);
    setOwnerEmail("");

    if (!form.ownerCode.trim()) {
      setErr("Enter an Owner Code to verify.");
      return;
    }

    setVerifying(true);
    try {
      const qOwners = query(
        collection(db, "owners"),
        where("ownerCode", "==", form.ownerCode.trim()),
        limit(1)
      );
      const snap = await getDocs(qOwners);
      if (snap.empty) {
        setErr("No owner found with that Owner Code.");
        return;
      }
      const data = snap.docs[0].data();
      setOwnerVerified(true);
      setOwnerEmail(data?.email || "");
      setMsg("Owner Code verified ✅");
    } catch (e) {
      setErr(e.message || "Failed to verify Owner Code.");
    } finally {
      setVerifying(false);
    }
  };

  /* ---------------- Utility: check slug uniqueness ---------------- */

  const slugExists = async (s) => {
    const qR = query(
      collection(db, "restaurants"),
      where("slug", "==", s),
      limit(1)
    );
    const rs = await getDocs(qR);
    return !rs.empty;
  };

  /* ---------------- Create restaurant as PENDING ---------------- */

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    setErr("");

    try {
      const ownerCode = form.ownerCode.trim();
      if (!ownerCode) {
        throw new Error(
          "Owner Code is required to link the restaurant to its owner."
        );
      }
      if (!slug) throw new Error("Please enter a valid restaurant name.");

      if (imageUploading) {
        throw new Error("Please wait for the image upload to finish.");
      }

      // ensure owner code exists
      const qOwners = query(
        collection(db, "owners"),
        where("ownerCode", "==", ownerCode),
        limit(1)
      );
      const ownerSnap = await getDocs(qOwners);
      if (ownerSnap.empty) {
        throw new Error(
          "Owner Code not found. Ask the owner to register and send you their code."
        );
      }

      // prevent duplicate slug
      if (await slugExists(slug)) {
        throw new Error(
          `The slug "${slug}" already exists. Please adjust the restaurant name.`
        );
      }

      const payload = {
        name: form.name,
        slug,
        image: form.image || "", // Cloudinary URL if uploaded
        location: form.location || "",
        operatingHours: form.operatingHours || "",
        deliveryAmount: form.deliveryAmount || "",
        whatsappLink: form.whatsappLink || "",
        ownerCode,
        status: "pending",
        createdBy: user?.uid || null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, "restaurants"), payload);

      setMsg("✅ Restaurant created as PENDING and linked by Owner Code!");
      setForm({
        name: "",
        image: "",
        location: "",
        operatingHours: "9am to 10pm",
        deliveryAmount: "₦500",
        whatsappLink: "",
        ownerCode: "",
      });
      setOwnerVerified(false);
      setOwnerEmail("");
      await loadPending();
    } catch (e) {
      setErr(e.message || "Failed to create restaurant.");
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- Load pending restaurants ---------------- */

  const loadPending = async () => {
    setLoadingPending(true);
    setErr("");
    try {
      const qP = query(
        collection(db, "restaurants"),
        where("status", "==", "pending")
      );
      const snap = await getDocs(qP);
      const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPending(rows);
    } catch (e) {
      setErr(e.message || "Failed to load pending restaurants.");
    } finally {
      setLoadingPending(false);
    }
  };

  useEffect(() => {
    if (isAdmin) loadPending();
  }, [isAdmin]);

  /* ---------------- Confirm / Reject ---------------- */

  const confirmRestaurant = async (id) => {
    try {
      await updateDoc(doc(db, "restaurants", id), {
        status: "confirmed",
        verifiedAt: serverTimestamp(),
        verifiedBy: user?.uid || null,
        updatedAt: serverTimestamp(),
      });
      setMsg("Restaurant confirmed ✅");
      await loadPending();
    } catch (e) {
      setErr(e.message || "Failed to confirm restaurant.");
    }
  };

  const rejectRestaurant = async (id) => {
    try {
      await updateDoc(doc(db, "restaurants", id), {
        status: "rejected",
        updatedAt: serverTimestamp(),
        rejectedAt: serverTimestamp(),
        rejectedBy: user?.uid || null,
      });
      setMsg("Restaurant rejected.");
      await loadPending();
    } catch (e) {
      setErr(e.message || "Failed to reject restaurant.");
    }
  };

  /* ---------------- Access guard ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-400 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-800 font-medium text-lg">
            Checking admin access...
          </p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-12 max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MdWarning className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            Admins only. Please login to continue.
          </p>
          <a
            href="/admin-login"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
          >
            Go to Admin Login
          </a>
        </div>
      </div>
    );
  }

  /* ---------------- Render ---------------- */

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 md:px-10 lg:px-20 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden mb-8 border border-white/20">
            <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-500 p-8 md:p-12">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              </div>

              <div className="relative flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <MdAdminPanelSettings className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-white mb-2">
                    Admin Dashboard
                  </h1>
                  <p className="text-white/90">
                    Manage restaurants and verify owners
                  </p>
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
              <MdWarning className="w-6 h-6 text-red-600 flex-shrink-0" />
              <p className="text-red-800 font-medium">{err}</p>
            </div>
          )}

          {/* Create Restaurant Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <MdAdd className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Add New Restaurant
              </h2>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              {/* Owner Code Verification */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <MdCode className="w-5 h-5 text-blue-600" />
                  Owner Code *
                </label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      name="ownerCode"
                      value={form.ownerCode}
                      onChange={(e) => {
                        onChange(e);
                        setOwnerVerified(false);
                        setOwnerEmail("");
                      }}
                      placeholder="e.g. amala-place-Q7FJ9M"
                      className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={verifyOwnerCode}
                    disabled={verifying || !form.ownerCode.trim()}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
                  >
                    {verifying ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Checking...</span>
                      </>
                    ) : (
                      <>
                        <MdVerified className="w-5 h-5" />
                        <span>Verify</span>
                      </>
                    )}
                  </button>
                </div>
                {ownerVerified && (
                  <div className="mt-3 flex items-center gap-2 bg-green-100 border border-green-300 rounded-xl p-3">
                    <MdCheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-800 font-medium">
                      Code belongs to:{" "}
                      <strong>{ownerEmail || "Owner found"}</strong>
                    </p>
                  </div>
                )}
              </div>

              {/* Restaurant Details */}
              <div className="grid md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Restaurant Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MdRestaurant className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      placeholder="Enter restaurant name"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Restaurant Image (Cloudinary upload) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Restaurant Image
                  </label>
                  <div className="flex flex-col gap-3">
                    <label className="relative flex items-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-500 hover:bg-red-50/40 transition-all">
                      <MdImage className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-700">
                        {imageUploading
                          ? "Uploading..."
                          : "Click to select image (JPG/PNG)"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageSelect}
                      />
                    </label>

                    {/* Optional manual URL override (if needed) */}
                    <input
                      name="image"
                      value={form.image}
                      onChange={onChange}
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

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MdLocationOn className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      name="location"
                      value={form.location}
                      onChange={onChange}
                      placeholder="e.g., Ilorin, Kwara"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Operating Hours */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Operating Hours
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MdAccessTime className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      name="operatingHours"
                      value={form.operatingHours}
                      onChange={onChange}
                      placeholder="e.g., 9am to 10pm"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Delivery Amount */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MdDeliveryDining className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      name="deliveryAmount"
                      value={form.deliveryAmount}
                      onChange={onChange}
                      placeholder="e.g., ₦500"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* WhatsApp Link */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    WhatsApp Link
                  </label>
                  <input
                    name="whatsappLink"
                    value={form.whatsappLink}
                    onChange={onChange}
                    placeholder="https://wa.me/..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                disabled={saving}
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
                    <span>Add Restaurant</span>
                  </>
                )}
              </button>

              {/* Preview */}
              <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Preview</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">Slug:</span>
                    <code className="bg-white px-3 py-1 rounded-lg border border-gray-300 font-mono">
                      {slug || "(enter name)"}
                    </code>
                  </div>
                  <div className="text-gray-600">
                    Public page:{" "}
                    <code className="bg-white px-2 py-1 rounded border">
                      /r/{slug || "your-slug"}
                    </code>
                  </div>
                  <ul className="mt-4 space-y-1 text-xs text-gray-600 list-disc pl-5">
                    <li>
                      New restaurants are created as{" "}
                      <strong>PENDING</strong>.
                    </li>
                    <li>
                      Confirm below when you've verified details/owner.
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>

          {/* Pending Restaurants */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <MdRestaurant className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Pending Restaurants
                  </h2>
                  <p className="text-sm text-gray-600">
                    {pending.length} awaiting approval
                  </p>
                </div>
              </div>
              <button
                onClick={loadPending}
                disabled={loadingPending}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-xl transition-all duration-300"
              >
                <MdRefresh
                  className={`w-5 h-5 ${
                    loadingPending ? "animate-spin" : ""
                  }`}
                />
                <span>
                  {loadingPending ? "Refreshing..." : "Refresh"}
                </span>
              </button>
            </div>

            {pending.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MdCheckCircle className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium">
                  No pending restaurants. All caught up!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pending.map((r) => (
                  <div
                    key={r.id}
                    className="border-2 border-amber-200 bg-amber-50/50 rounded-2xl p-5 hover:border-amber-300 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {r.name}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <MdCode className="w-4 h-4" />
                            <code className="bg-white px-2 py-1 rounded border">
                              {r.ownerCode}
                            </code>
                          </div>
                          {r.location && (
                            <div className="flex items-center gap-1 text-gray-600">
                              <MdLocationOn className="w-4 h-4" />
                              <span>{r.location}</span>
                            </div>
                          )}
                          <span className="bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-xs font-bold">
                            PENDING
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => confirmRestaurant(r.id)}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                        >
                          <MdCheckCircle className="w-5 h-5" />
                          <span>Confirm</span>
                        </button>
                        <button
                          onClick={() => rejectRestaurant(r.id)}
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                        >
                          <MdCancel className="w-5 h-5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>
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

export default AdminDashboard;
