import env from '@/lib/env'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${env.JUTGE_API_URL}/api/:path*`,
            },
            {
                source: '/packs/:path*',
                destination: `${env.JUTGE_API_URL}/packs/:path*`,
            },
        ]
    },
}

export default nextConfig
