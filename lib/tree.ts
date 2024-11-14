
export type Item = {
    name: string
    url: string
    type: string
    isActive?: boolean
    items?: Item[]
}

export type Items = Item[]

export type Module = any

export function models(mod: Module, path: string[]): Items {
    return mod.models.map((model: any) => {
        return {
            name: model[0],
            url: `#${path.join('.')}.${model[0]}`,
            type: 'model',
            isActive: false,
        }
    })
}

export function endpoints(mod: Module, path: string[]): Items {
    return mod.endpoints.map((endpoint: any) => {
        return {
            name: endpoint.name,
            url: `#${path.join('.')}.${endpoint.name}`,
            type: 'endpoint',
            isActive: false,
        }
    })
}

export function modules(mod: Module, parentPath: string[] = []): Items {
    return mod.modules.map((submod: any) => {
        let path: string[] = [...parentPath, submod.name].filter((p) => p !== 'root')
        return {
            name: submod.name,
            url: `#${path.join('.')}`,
            type: 'module',
            isActive: false,
            items: [...endpoints(submod, path), ...models(submod, path), ...modules(submod, path)],
        }
    })
}

export type Tree = ReturnType<typeof modules>