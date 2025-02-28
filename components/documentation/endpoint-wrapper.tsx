"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

type Props = {
    id: string
    children: React.ReactNode
}
export default function EndpointWrapper({ id, children }: Props) {
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
                "px-4 py-2 pt-0.5 flex flex-col",
                "relative md:rounded",
                hash === `#${id}` && "border-[0.2em] border-accent md:outline md:outline-accent md:border-none",
            )}
        >
            <div id={id} className="absolute -top-[5em] md:-top-[15em] left-0"></div>
            {children}
        </div>
    )
}
