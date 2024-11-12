import type { NextConfig } from 'next'
import { jutgeApiAddress } from '@/lib/utilities'

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${jutgeApiAddress()}/api/:path*`,
            },
        ]
    },
}

export default nextConfig
