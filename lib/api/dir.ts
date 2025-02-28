import env from "@/lib/env"
import { ApiDir, ApiModel, ApiModule, Item } from "./types"

export async function getApiDir(): Promise<ApiDir> {
    const response = await fetch(`${env.JUTGE_API_URL}/api/dir`)
    const result = await response.json()
    return {
        info: result.info,
        root: result.root,
        models: new Map(result.models),
    }
}

// Tree information for the sidebar

export function models(mod: ApiDir, path: string[]): Item[] {
    const items: Item[] = []
    for (const [name, _] of mod.models) {
        items.push({
            name: name,
            url: `#${path.join(".")}.${name}`,
            type: "model",
            path: path.map((p) => `${p}.`).join(""),
            isActive: false,
        })
    }
    return items
}

export function endpoints(mod: ApiModule, path: string[]): Item[] {
    return mod.endpoints.map((endpoint: any): Item => {
        return {
            name: endpoint.name,
            url: `#${path.join(".")}.${endpoint.name}`,
            type: "endpoint",
            path: path.map((p) => `${p}.`).join(""),
            actor: endpoint.actor,
            isActive: false,
        }
    })
}

export function modules(mod: ApiModule, parentPath: string[] = []): Item[] {
    return mod.submodules
        .filter((submodule: any) => !submodule.hideFromDoc)
        .map((submod: any) => {
            let path: string[] = [...parentPath, submod.name].filter((p) => p !== "root")
            return {
                name: submod.name,
                url: `#${path.join(".")}`,
                type: "module",
                path: path.map((p) => `${p}.`).join(""),
                auth: submod.actor,
                isActive: false,
                items: [...endpoints(submod, path), ...modules(submod, path)],
            }
        })
}

export type Tree = ReturnType<typeof modules>

// Examples as in Scalar

export function makeExample(model: ApiModel, modelMap: Map<string, ApiModel>): any {
    function make(model: ApiModel | undefined): any {
        if (model === undefined) {
            throw new Error("Model is undefined")
        } else if (model.anyOf) {
            return make(model.anyOf[0])
        } else if (model.$ref) {
            const ref = model.$ref
            return make(modelMap.get(ref))
        } else if (model.type) {
            if (model.type === "object") {
                if (model.patternProperties) {
                    const sub = model.patternProperties["^(.*)$"]
                    const obj: Record<string, any> = {}
                    obj["..."] = make(sub)
                    obj["..."] = make(sub)
                    return obj
                } else if (model.properties) {
                    const obj: any = {}
                    for (const key in model.properties) {
                        obj[key] = make(model.properties[key])
                    }
                    return obj
                }
            } else if (model.type === "array") {
                return [make(model.items), make(model.items)]
            } else if (model.type === "string") {
                return "..."
            } else if (model.type === "number") {
                return 3.14
            } else if (model.type === "integer") {
                return 1
            } else if (model.type === "boolean") {
                return true
            } else if (model.type === "Date") {
                return "YYYY-MM-DD HH:mm:ss"
            } else {
                return `UNKNOWN TYPE: ${model.type}`
            }
        } else if (Object.keys(model).length === 0) {
            return "{ ... }"
        } else {
            return "UNKNOWN SCHEMA"
        }
    }

    return make(model)
}
