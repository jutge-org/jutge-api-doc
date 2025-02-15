import env from "@/lib/env"
import createMDX from "@next/mdx"
import rehypeShiki from "@shikijs/rehype"
import type { NextConfig } from "next"
import remarkGfm from "remark-gfm"

const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${env.JUTGE_API_URL}/api/:path*`,
            },
            {
                source: "/packs/:path*",
                destination: `${env.JUTGE_API_URL}/packs/:path*`,
            },
        ]
    },
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
}

const withMDX = createMDX({
    options: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            [
                rehypeShiki,
                {
                    themes: {
                        light: "dark-plus",
                        dark: "dark-plus",
                    },
                },
            ],
        ],
    },
})

export default withMDX(nextConfig)
