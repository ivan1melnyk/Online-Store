require("dotenv").config();
const streamifier = require("streamifier");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

console.log("Cloudinary config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "SET" : "undefined",
  api_key: process.env.CLOUDINARY_API_KEY ? "SET" : "NOT SET",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "SET" : "NOT SET",
  secure: true,
});

class CloudinaryService {
  async uploadImage(buffer, folder = "devices") {
    try {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "devices" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        streamifier.createReadStream(buffer).pipe(uploadStream);
      });

      console.log("Upload successful:");
      console.log("Public ID:", result.public_id);
      console.log("URL:", result.secure_url);

      return result;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error(`Cloudinary upload error: ${error.message}`);
    }
  }

  async deleteImage(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result;
    } catch (error) {
      throw new Error(`Cloudinary delete error: ${error.message}`);
    }
  }

  getImageUrl(publicId, transformations = {}) {
    if (!publicId) {
      console.warn("No publicId provided for Cloudinary URL");
      return "";
    }

    const url = cloudinary.url(publicId, {
      ...transformations,
      secure: true,
    });

    console.log("Generated Cloudinary URL for", publicId, ":", url);
    return url;
  }

  getOptimizedImageUrl(publicId, width = 300, height = 300) {
    if (!publicId) {
      console.warn("No publicId provided for optimized URL");
      return "";
    }

    const url = cloudinary.url(publicId, {
      width: width,
      height: height,
      crop: "fill",
      quality: "auto",
      fetch_format: "auto",
      secure: true,
    });

    console.log("Generated optimized URL:", url);
    return url;
  }
}

module.exports = new CloudinaryService();
