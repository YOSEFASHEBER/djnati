import cloudinary from "./cloudinary";

export const uploadBufferToCloudinary = (buffer, folder = "cars") => {
  return new Promise((resolve, reject) => {
    try {
      // ================= VALIDATION =================
      if (!buffer) {
        return reject(new Error("No file buffer provided"));
      }

      if (!Buffer.isBuffer(buffer)) {
        return reject(new Error("Invalid buffer format"));
      }

      const timeout = setTimeout(() => {
        reject(new Error("Cloudinary upload timeout"));
      }, 15000); // 15s safety timeout

      // ================= UPLOAD STREAM =================
      const stream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          clearTimeout(timeout);

          if (error) {
            return reject(
              new Error(error.message || "Cloudinary upload failed"),
            );
          }

          if (!result) {
            return reject(new Error("No result returned from Cloudinary"));
          }

          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            format: result.format,
            width: result.width,
            height: result.height,
          });
        },
      );

      stream.on("error", (err) => {
        clearTimeout(timeout);
        reject(new Error(err.message || "Stream error during upload"));
      });

      stream.end(buffer);
    } catch (err) {
      reject(new Error(err.message || "Unexpected upload error"));
    }
  });
};
