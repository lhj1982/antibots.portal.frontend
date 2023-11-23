/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async redirects() {
        return [
            {
                source: '/',
                destination: '/namelist',
                permanent: true,
            }
        ]
    }
}

module.exports = nextConfig
