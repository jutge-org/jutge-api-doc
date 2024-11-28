import type { NextConfig } from 'next'
import env from '@/lib/env'

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${env.JUTGE_API_URL}/api/:path*`,
            },
        ]
    },
}

export default nextConfig
