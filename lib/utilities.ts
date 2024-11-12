import settings from './settings'

export function jutgeApiAddress() {
    const api = settings.servers.api
    return `${api.protocol}://${api.host}:${api.port}`
}
