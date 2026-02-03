import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { ENV } from "./_core/env";

// Configure Cloudinary
cloudinary.config({
  cloud_name: ENV.cloudinaryCloudName,
  api_key: ENV.cloudinaryApiKey,
  api_secret: ENV.cloudinaryApiSecret,
});

export interface UploadResult {
  url: string;
  publicId: string;
  resourceType: string;
  format: string;
}

/**
 * Upload a file to Cloudinary
 * @param fileBuffer - The file buffer to upload
 * @param fileName - The name of the file
 * @param folder - The folder path in Cloudinary (default: "memories")
 * @returns Upload result with URL and metadata
 */
export async function uploadToCloudinary(
  fileBuffer: Buffer,
  fileName: string,
  folder: string = "memories"
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        public_id: fileName.replace(/\.[^/.]+$/, ""), // Remove extension
      },
      (error, result) => {
        if (error) {
          reject(new Error(`Upload failed: ${error.message}`));
        } else if (result) {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            resourceType: result.resource_type,
            format: result.format,
          });
        } else {
          reject(new Error("Upload failed: No result returned"));
        }
      }
    );

    // Write the buffer to the stream
    stream.end(fileBuffer);
  });
}

/**
 * Delete a file from Cloudinary
 * @param publicId - The public ID of the file to delete
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Delete failed:", error);
    throw new Error(`Delete failed: ${error}`);
  }
}

/**
 * Generate a signed URL for a file (for private files)
 * @param publicId - The public ID of the file
 * @param expiresIn - Expiration time in seconds (default: 1 hour)
 */
export function generateSignedUrl(publicId: string, expiresIn: number = 3600): string {
  const timestamp = Math.floor(Date.now() / 1000) + expiresIn;
  const signature = cloudinary.utils.api_sign_request(
    {
      public_id: publicId,
      timestamp,
    },
    ENV.cloudinaryApiSecret || ""
  );

  return `https://res.cloudinary.com/${ENV.cloudinaryCloudName}/image/authenticated/s--${signature}--/v${timestamp}/${publicId}`;
}
