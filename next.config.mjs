/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'localhost:3000', protocol: 'http' },
            { hostname: 'localhost:3000', protocol: 'http' },
            { hostname: 'localhost', protocol: 'http' },
        ],
        domains: ['localhost:3000','localhost:3001'],
    },
};

export default nextConfig;
