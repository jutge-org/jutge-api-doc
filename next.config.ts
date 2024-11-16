import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${process.env.JUTGE_API_ADDRESS}/api/:path*`,
            },
        ]
    },
}

export default nextConfig
