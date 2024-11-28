import EndpointBackgroundFlash from '@/components/endpoint-background-flash'
import TypeView from '@/components/type-view'
import { Label } from '@/components/ui/label'
import { ApiDir, ApiEndpoint, ApiModel, ApiModule, getApiDir } from '@/lib/api-dir'
import { cn } from '@/lib/utils'
import { KeyRound, Package, SquareFunction } from 'lucide-react'

export default async function Page() {
    const { models, root } = await getApiDir()
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Module models={models} module={root} path={[]} level={0} />
        </div>
    )
}

type ModuleProps = {
    models: Map<string, ApiModel>
    module: ApiModule
    path: string[]
    level: number
}
function Module({ models, module, path, level }: ModuleProps) {
    const { endpoints, submodules } = module
    const spath = path.join('.')

    return (
        <div id={spath} className={cn(level > 0 ? 'bg-gray-50 p-4 rounded-xl' : '')}>
            {path.length > 0 && (
                <h1
                    className={cn(
                        'mb-4 flex gap-2 font-semibold ',
                        level === 1 ? 'border-b pb-1 text-[1.35em]' : 'mb-6',
                    )}
                >
                    <Package className={cn(level === 1 ? 'w-8 h-8' : '')} />
                    {spath}
                </h1>
            )}

            {endpoints.length > 0 && (
                <div className={cn('pb-6 pt-2 flex flex-col gap-5', level > 0 ? 'px-4' : 'px-8')}>
                    <Label className="uppercase text-gray-600">Endpoints</Label>
                    {endpoints.map((endpoint) => (
                        <Endpoint
                            models={models}
                            key={endpoint.name}
                            endpoint={endpoint}
                            spath={spath}
                        />
                    ))}
                </div>
            )}

            {/* {models.length > 0 && (
                <div className={cn('pb-4 flex flex-col gap-4', level > 0 ? 'px-4' : 'px-8')}>
                    <Label className="uppercase text-gray-600">Types</Label>
                    {models.map((model) => (
                        <Model
                            key={crypto.randomUUID()}
                            model={model}
                            spath={spath}
                            models={models}
                        />
                    ))}
                </div>
            )} */}

            <div className={cn('flex flex-col gap-4', level > 0 ? 'pl-0' : '')}>
                {submodules.map((submodule: any) => (
                    <Module
                        models={models}
                        key={submodule.name}
                        module={submodule}
                        path={path.concat(submodule.name)}
                        level={level + 1}
                    />
                ))}
            </div>
        </div>
    )
}

type EndpointProps = {
    endpoint: ApiEndpoint
    spath: string
    models: Map<string, ApiModel>
}
function Endpoint({ endpoint, spath, models }: EndpointProps) {
    return (
        <EndpointBackgroundFlash id={`${spath}.${endpoint.name}`}>
            <h2 className="font-semibold flex flex-row gap-2 items-center mb-0">
                <SquareFunction className="w-6 h-6" />
                <code className="mt-0.5">{endpoint.name}</code>
                {endpoint.actor && <KeyRound size={15} className="-ml-1" />}
                <span className="font-normal">
                    <span className="text-gray-400">&mdash;</span>
                    <span className="ml-2 text-sm">{endpoint.summary}</span>
                </span>
            </h2>
            {endpoint.description && (
                <div className="pb-3 pl-8 text-xs text-gray-700 max-w-[45em]">
                    <p>{endpoint.description}</p>
                </div>
            )}
            <div className="flex flex-col mt-0 pl-8">
                <TypeView name="input" input={endpoint.input} spath={spath} models={models} />
                <TypeView name="output" input={endpoint.output} spath={spath} models={models} />
            </div>
        </EndpointBackgroundFlash>
    )
}
