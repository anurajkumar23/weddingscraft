/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '3000',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '3001',
        },
        {
          protocol: 'https',
          hostname: 'source.unsplash.com',
        },
      ],
      domains: ['localhost', 'source.unsplash.com'],
    },
  };
  
  export default nextConfig;
  