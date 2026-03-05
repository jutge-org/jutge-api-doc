"use client"

import { createContext, useContext, useState } from "react"

type FilterContextType = {
    actorFilter: string
    setActorFilter: (value: string) => void
    domainFilter: string
    setDomainFilter: (value: string) => void
}

const FilterContext = createContext<FilterContextType>({
    actorFilter: "",
    setActorFilter: () => {},
    domainFilter: "",
    setDomainFilter: () => {},
})

export function FilterProvider({ children }: { children: React.ReactNode }) {
    const [actorFilter, setActorFilter] = useState("")
    const [domainFilter, setDomainFilter] = useState("")

    return (
        <FilterContext.Provider value={{ actorFilter, setActorFilter, domainFilter, setDomainFilter }}>
            {children}
        </FilterContext.Provider>
    )
}

export function useFilter() {
    return useContext(FilterContext)
}

export function matchesFilter(
    actor: string | undefined,
    domains: string[] | undefined,
    filter: { actor: string; domain: string },
): boolean {
    if (filter.actor && actor !== filter.actor) return false
    if (filter.domain === "jutge" && !domains?.includes("jutge")) return false
    if (filter.domain === "exam_contest" && !(domains?.includes("exam") && domains?.includes("contest")))
        return false
    return true
}
