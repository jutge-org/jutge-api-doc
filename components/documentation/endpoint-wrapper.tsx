"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

type EndpointBackgroundFlashProps = {
    id: string
    children: React.ReactNode
}
export default function EndpointBackgroundFlash({ id, children }: EndpointBackgroundFlashProps) {
    const [hash, setHash] = useState("")

    const onHashChange = () => {
        setHash(window.location.hash)
    }

    useEffect(() => {
        setHash(window.location.hash)
        window.addEventListener("hashchange", onHashChange)
        return () => window.removeEventListener("hashchange", onHashChange)
    }, [])

    return (
        <div
            className={cn(
                "px-4 py-2 pt-0.5 flex flex-col items-start",
                "relative rounded",
                hash === `#${id}` && "outline outline-accent",
            )}
        >
            <div id={id} className="absolute -top-[15em] -left-10"></div>
            {children}
        </div>
    )
}
