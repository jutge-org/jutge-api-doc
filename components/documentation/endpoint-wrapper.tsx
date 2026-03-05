"use client"

import { matchesFilter, useFilter } from "@/components/filter-provider"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

type Props = {
    id: string
    actor?: string
    domains?: string[]
    children: React.ReactNode
}
export default function EndpointWrapper({ id, actor, domains, children }: Props) {
    const [hash, setHash] = useState("")
    const { actorFilter, domainFilter } = useFilter()

    const onHashChange = () => {
        setHash(window.location.hash)
    }

    useEffect(() => {
        setHash(window.location.hash)
        window.addEventListener("hashchange", onHashChange)
        return () => window.removeEventListener("hashchange", onHashChange)
    }, [])

    const visible = matchesFilter(actor, domains, { actor: actorFilter, domain: domainFilter })
    if (!visible) return null

    return (
        <div
            className={cn(
                "px-4 py-2 pt-0.5 flex flex-col",
                "relative md:rounded",
                "border-t-2 border-dashed first:border-t-0",
                hash === `#${id}` && "border-[0.2em] border-primary md:outline md:outline-primary md:border-none",
            )}
        >
            <div id={id} className="absolute -top-[5em] md:-top-[15em] left-0"></div>
            {children}
        </div>
    )
}
