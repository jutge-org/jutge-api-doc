import type { ApiDir, ApiModule, Item } from "./types"

export const searchDirectory = (dir: ApiDir, query: string): Item[] => {
    const queryWords = query
        .split(" ")
        .filter(Boolean)
        .map((w) => w.trim())

    const match = (name: string) => {
        return queryWords.every((queryWord) => name.toLowerCase().includes(queryWord))
    }

    const search = (mod: ApiModule, path: string[]): Item[] => {
        const results: Item[] = []
        const spath = path.map((p) => `${p}.`).join("")
        for (const endpoint of mod.endpoints) {
            if (match(spath + endpoint.name)) {
                results.push({
                    name: endpoint.name,
                    url: `/documentation#${path.join(".")}.${endpoint.name}`,
                    type: "endpoint",
                    actor: endpoint.actor,
                    spath: spath,
                })
            }
        }
        for (const submodule of mod.submodules) {
            // if (submodule.name.includes(query)) {
            //     results.push({
            //         name: submodule.name,
            //         url: `/documentation#${path.join(".")}`,
            //         type: "module",
            //     })
            // }
            const subresults = search(submodule, [...path, submodule.name])
            results.push(...subresults)
        }
        return results
    }

    const results = search(dir.root, [])
    results.sort((a, b) => {
        if (a.name !== b.name) {
            return a.name.localeCompare(b.name)
        } else {
            return a.spath.localeCompare(b.spath)
        }
    })
    return results
}
