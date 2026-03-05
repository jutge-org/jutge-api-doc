"use client"

import { matchesFilter, useFilter } from "@/components/filter-provider"

type Props = {
    endpoints: { actor: string; domains: string[] }[]
    children: React.ReactNode
}
export default function ModuleWrapper({ endpoints, children }: Props) {
    const { actorFilter, domainFilter } = useFilter()
    const filter = { actor: actorFilter, domain: domainFilter }

    if (filter.actor || filter.domain) {
        const anyVisible = endpoints.some((ep) => matchesFilter(ep.actor, ep.domains, filter))
        if (!anyVisible) return null
    }

    return <>{children}</>
}
