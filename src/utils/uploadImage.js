// 🔁 Reusable Cloudinary upload helper
// You can move this to src/utils/uploadImage.js and import it where needed.
const CLOUDINARY_CLOUD_NAME = "ddvuazhuj";          // from CLOUDINARY_URL
const CLOUDINARY_UPLOAD_PRESET = "Handyride";       // your unsigned preset name

/**
 * Upload an image file to Cloudinary (unsigned preset).
 * @param {File} file - Browser File object from <input type="file" />
 * @returns {Promise<{ secureUrl: string, publicId: string, raw: any }>}
 */
export async function uploadImageToCloudinary(file) {
  if (!file) throw new Error("No file provided for upload.");

  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  // Optional: if you want folders
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
