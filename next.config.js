/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/namelist',
                permanent: true
            }
        ]
    }
}

module.exports = nextConfig
