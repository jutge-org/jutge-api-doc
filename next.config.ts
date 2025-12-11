import createMDX from "@next/mdx"
import rehypeShiki from "@shikijs/rehype"
import type { NextConfig } from "next"
import remarkGfm from "remark-gfm"

const nextConfig: NextConfig = {
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
    output: process.env.DOCKER_BUILD ? "standalone" : undefined,
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
