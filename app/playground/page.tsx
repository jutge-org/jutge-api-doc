"use client"

import PageWidth from "@/components/page-width"
import TextWidth from "@/components/text-width"
import dynamic from "next/dynamic"

const PlaygroundNoSSR = dynamic(() => import("./playground"), { ssr: false })

export default function PlaygroundPage() {
    return (
        <PageWidth className="px-4 md:px-0 pt-4">
            <TextWidth>
                <h1 className="mb-4">Playground</h1>
                <PlaygroundNoSSR />
            </TextWidth>
        </PageWidth>
    )
}
