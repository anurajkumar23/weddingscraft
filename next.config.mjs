/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: ['source.unsplash.com','localhost:3000','localhost'], protocol: 'https' },
          ],
    },
   
};

export default nextConfig;