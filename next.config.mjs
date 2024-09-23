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
        {
          protocol: 'https',
          hostname: 'dream-wedding.s3.eu-north-1.amazonaws.com',
        },
      ],
      domains: ['localhost', 'source.unsplash.com',"dream-wedding.s3.eu-north-1.amazonaws.com"],
    },
  };
  
  export default nextConfig;
  