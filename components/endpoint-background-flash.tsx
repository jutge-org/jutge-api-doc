"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

type EndpointBackgroundFlashProps = {
    id: string
    children: React.ReactNode
}
export default function EndpointBackgroundFlash({ id, children }: EndpointBackgroundFlashProps) {
    const [hash, setHash] = useState("")
    const [flash, setFlash] = useState(true)

    const onHashChange = () => {
        setHash(window.location.hash)
        setFlash(true)
        setTimeout(() => setFlash(false), 600)
    }

    useEffect(() => {
        window.addEventListener("hashchange", onHashChange)
        return () => window.removeEventListener("hashchange", onHashChange)
    })

    return (
        <div
            className={cn(
                "relative p-2 rounded transition-colors duration-1000 ease-out",
                hash === `#${id}` && flash ? "bg-yellow-200" : "",
            )}
        >
            <div id={id} className="absolute -top-16 -left-10"></div>
            {children}
        </div>
    )
}
