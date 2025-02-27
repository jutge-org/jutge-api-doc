export type ApiInfo = {
    name: string
    description: string
    version: string
}

export type ApiModel = {
    $ref?: string
    anyOf?: ApiModel[]
    type?: string
    properties?: Record<string, any>
    items?: ApiModel
    patternProperties?: Record<string, any>
    required?: string[]
}

export type ApiEndpoint = {
    status?: string
    name: string
    summary?: string
    description?: string
    actor?: string
    input: any
    output: any
    ifiles: string
    ofiles: string
}

export type ApiModule = {
    name: string
    description?: string
    endpoints: ApiEndpoint[]
    submodules: ApiModule[]
}

export type ApiDir = {
    info: ApiInfo
    models: Map<string, ApiModel>
    root: ApiModule
}

export type Item = {
    name: string
    url: string
    type: string
    actor?: string
    isActive?: boolean
    items?: Item[]
}
