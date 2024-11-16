export type ApiInfo = {
    name: string
    description: string
    version: string
}

export type ApiModuleDir = {
    name: string
    description?: string
    models: [string, any][]
    endpoints: ApiEndpointDir[]
    modules: ApiModuleDir[]
}

export type ApiEndpointDir = {
    status?: string
    name: string
    summary?: string
    description?: string
    actor: boolean
    input: any
    output: any
}

export type ApiDir = ApiModuleDir & {
    info: ApiInfo
}

export async function getApiDir(): Promise<ApiDir> {
    const response = await fetch(`${process.env.JUTGE_API_ADDRESS}/api/dir`)
    return await response.json()
}

// Tree information for the sidebar

export type Item = {
    name: string
    url: string
    type: string
    auth: boolean
    isActive?: boolean
    items?: Item[]
}

export function models(mod: ApiDir, path: string[]): Item[] {
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

export function endpoints(mod: ApiDir, path: string[]): Item[] {
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

// Examples as in Scalar

export function makeExample(schema: any, models: any): any {
    //

    function findSchema(name: string): any {
        for (const model of models) {
            const [modelName, schema] = model
            if (modelName === name) {
                return schema
            }
        }
        return 'NOT FOUND'
    }

    function make(schema: any): any {
        if ('type' in schema) {
            if (schema.type === 'object') {
                if ('patternProperties' in schema) {
                    const sub = schema.patternProperties['^(.*)$']
                    const obj: Record<string, any> = {}
                    obj['...'] = make(sub)
                    obj['...'] = make(sub)
                    return obj
                } else if ('properties' in schema) {
                    const obj: any = {}
                    for (const key in schema.properties) {
                        obj[key] = make(schema.properties[key])
                    }
                    return obj
                }
            } else if (schema.type === 'array') {
                return [make(schema.items), make(schema.items)]
            } else if (schema.type === 'string') {
                return '...'
            } else if (schema.type === 'number') {
                return 3.14
            } else if (schema.type === 'integer') {
                return 1
            } else if (schema.type === 'boolean') {
                return true
            } else if (schema.type === 'Date') {
                return 'YYYY-MM-DD HH:mm:ss'
            } else {
                return `UNKNOWN TYPE: ${schema.type}`
            }
        } else {
            if ('$ref' in schema) {
                const ref = schema.$ref
                return make(findSchema(ref))
            } else if ('anyOf' in schema) {
                return make(schema.anyOf[0])
            } else if (Object.keys(schema).length === 0) {
                return '{ ... }'
            } else {
                return 'UNKNOWN SCHEMA'
            }
        }
    }

    return make(schema)
}

async function main() {
    const dir = await getApiDir()
    const models = dir.modules[1].models
    for (const model of models) {
        const [name, schema] = model
        //    if (name != 'TCredentialsOut') continue
        console.log(makeExample(schema, models))
        console.log('------------------')
    }
}
