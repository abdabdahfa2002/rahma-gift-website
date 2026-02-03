import { describe, expect, it } from "vitest";
import { v2 as cloudinary } from "cloudinary";

describe("Cloudinary Integration", () => {
  it("should validate Cloudinary credentials", async () => {
    // Configure Cloudinary with environment variables
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    try {
      // Test the connection by fetching account details
      const result = await cloudinary.api.resources({ max_results: 1 });
      
      // If we get here, credentials are valid
      expect(result).toBeDefined();
      expect(result.resources).toBeDefined();
      console.log("✓ Cloudinary credentials are valid");
    } catch (error: any) {
      // If credentials are invalid, this will throw
      console.error("✗ Cloudinary credentials validation failed:", error.message);
      throw new Error(`Cloudinary validation failed: ${error.message}`);
    }
  });
});
