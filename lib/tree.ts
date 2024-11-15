import { ApiDir } from './api-dir'

export type Item = {
    name: string
    url: string
    type: string
    auth: boolean
    isActive?: boolean
    items?: Item[]
}

export function models(mod: any, path: string[]): Item[] {
    return mod.models.map((model: any): Item => {
        return {
            name: model[0],
            url: `#${path.join('.')}.${model[0]}`,
            type: 'model',
            isActive: false,
            auth: false,
        }
    })
}

export function endpoints(mod: any, path: string[]): Item[] {
    return mod.endpoints.map((endpoint: any): Item => {
        return {
            name: endpoint.name,
            url: `#${path.join('.')}.${endpoint.name}`,
            type: 'endpoint',
            auth: endpoint.actor,
            isActive: false,
        }
    })
}

export function modules(mod: ApiDir, parentPath: string[] = []): Item[] {
    return mod.modules.map((submod: any) => {
        let path: string[] = [...parentPath, submod.name].filter((p) => p !== 'root')
        return {
            name: submod.name,
            url: `#${path.join('.')}`,
            type: 'module',
            auth: submod.actor,
            isActive: false,
            items: [...endpoints(submod, path), ...models(submod, path), ...modules(submod, path)],
        }
    })
}

export type Tree = ReturnType<typeof modules>
