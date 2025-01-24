/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            'localhost',
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL ? new URL(process.env.NEXT_PUBLIC_BACKEND_BASE_URL).hostname : 'galactic-pet-backend.onrender.com'
        ]
    }
};

export default nextConfig;
