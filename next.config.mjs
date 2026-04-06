/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "share.google.com", // your Google-hosted images
      "cdn.prod.website-files.com",
      "www.mansory.com",
      "res.cloudinary.com",
      "via.placeholder.com",
    ],
  },
};

export default nextConfig;
