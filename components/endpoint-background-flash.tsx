"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useTheme } from "./theme/hook"

type EndpointBackgroundFlashProps = {
    id: string
    children: React.ReactNode
}
export default function EndpointBackgroundFlash({ id, children }: EndpointBackgroundFlashProps) {
    const [hash, setHash] = useState("")
    const [flash, setFlash] = useState(true)
    const { mode } = useTheme()

    const onHashChange = () => {
        setHash(window.location.hash)
        setFlash(true)
        setTimeout(() => setFlash(false), 600)
    }

    useEffect(() => {
        window.addEventListener("hashchange", onHashChange)
        return () => window.removeEventListener("hashchange", onHashChange)
    })

    const flashBackground = mode === "dark" ? "bg-stone-700" : "bg-yellow-100"

    return (
        <div
            className={cn(
                "relative rounded transition-colors duration-1000 ease-out",
                hash === `#${id}` && flash ? flashBackground : "",
            )}
        >
            <div id={id} className="absolute -top-16 -left-10"></div>
            {children}
        </div>
    )
}
