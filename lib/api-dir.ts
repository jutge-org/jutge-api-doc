import { jutgeApiAddress } from './utilities'

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
    const response = await fetch(`${jutgeApiAddress()}/api/dir`)
    const dir = await response.json()
    return dir
}
