/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'standalone',
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
