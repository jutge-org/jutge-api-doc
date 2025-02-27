import type { Item, ApiDir, ApiModule } from "./types"

export const searchDirectory = (dir: ApiDir, query: string): Item[] => {
    const match = (name: string) => {
        return name.toLowerCase().includes(query.toLowerCase())
    }

    const search = (mod: ApiModule, path: string[]): Item[] => {
        const results: Item[] = []
        for (const endpoint of mod.endpoints) {
            if (match(endpoint.name)) {
                results.push({
                    name: endpoint.name,
                    url: `/documentation#${path.join(".")}.${endpoint.name}`,
                    type: "endpoint",
                    actor: endpoint.actor,
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

    return search(dir.root, [])
}
