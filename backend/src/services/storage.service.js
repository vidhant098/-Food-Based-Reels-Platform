const cloudinary = require("cloudinary").v2;
const mime = require("mime-types");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function assertCloudinaryConfigured() {
  const missing = [];
  if (!process.env.CLOUDINARY_CLOUD_NAME) missing.push('CLOUDINARY_CLOUD_NAME');
  if (!process.env.CLOUDINARY_API_KEY) missing.push('CLOUDINARY_API_KEY');
  if (!process.env.CLOUDINARY_API_SECRET) missing.push('CLOUDINARY_API_SECRET');
  if (missing.length) {
    throw new Error(
      `Cloudinary is not configured. Missing env vars: ${missing.join(', ')}`
    );
  }
}


async function uploadFile(file, fileName) {
  try {
    const mimeType = mime.lookup(fileName) || "application/octet-stream";
    const base64File = `data:${mimeType};base64,${file.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64File, {
      public_id: fileName,
      resource_type: "auto",
      folder: "food-reels",
    });

    // cloudinary returns { secure_url, ... }
    return result?.secure_url;
  } catch (error) {
    console.error("[storage.service] Cloudinary upload failed:", {
      fileName,
      message: error?.message,
      http_code: error?.http_code,
    });

    const details = error?.http_code ? ` (http_code: ${error.http_code})` : "";
    throw new Error(`Cloudinary upload failed${details}: ${error?.message || "Unknown error"}`);
  }
}

module.exports = { uploadFile };

