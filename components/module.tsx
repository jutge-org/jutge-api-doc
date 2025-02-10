import { ApiModel, ApiModule } from '@/lib/api-dir'
import { cn } from '@/lib/utils'
import { Package } from 'lucide-react'
import Endpoint from './endpoint'

type ModuleProps = {
    models: Map<string, ApiModel>
    module: ApiModule
    path: string[]
    level: number
    className?: string
}
export default function Module({ models, module, path, level, className }: ModuleProps) {
    const { endpoints, submodules } = module
    const spath = path.join('.')

    return (
        <div id={spath} className={cn(level > 0 ? 'bg-zinc-50 p-4 rounded-xl' : '', className)}>
            {path.length > 0 && (
                <h1
                    className={cn(
                        'mb-4 flex gap-2 font-semibold ',
                        level === 1 ? 'border-b pb-3 text-[1.35em]' : 'mb-6',
                    )}
                >
                    <Package className={cn(level === 1 ? 'w-8 h-8' : '')} />
                    {spath}
                </h1>
            )}

            {endpoints.length > 0 && (
                <div className={cn('pb-6 pt-2 flex flex-col gap-5', level > 0 ? 'px-4' : 'px-8')}>
                    {/*<Label className="uppercase text-gray-600">Endpoints</Label>*/}
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
