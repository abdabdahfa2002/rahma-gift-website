export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "demp2u6fj",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY ?? "693394869692574",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET ?? "MkXvmLIW1UeUNKzTpTzd-3ZWVHw",
};
