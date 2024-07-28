/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'source.unsplash.com', protocol: 'https' },
            { hostname: 'localhost', protocol: 'http' },
        ],
        domains: ['localhost'],
    },
};

export default nextConfig;
