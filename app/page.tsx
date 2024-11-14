import TypeView from '@/components/type-view'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import { ApiDir, getApiDir } from '@/lib/api-dir'
import { cn } from '@/lib/utils'
import { CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { ChevronRight, Package, SquareFunction, Type } from 'lucide-react'

export default async function Page() {
    const dir = await getApiDir()
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Module mod={dir} path={[]} level={0} />
        </div>
    )
}

type ModuleProps = {
    mod: ApiDir
    path: string[]
    level: number
}
function Module({ mod, path, level }: ModuleProps) {
    const { endpoints, modules, models } = mod
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
                <div className={cn("pb-6 pt-2 flex flex-col gap-4", level > 0 ? "px-4" : "px-8")}>
                    <Label className="uppercase text-gray-600">Methods</Label>
                    {endpoints.map((endpoint: any) => (
                        <Endpoint key={endpoint.name} endpoint={endpoint} spath={spath} />
                    ))}
                </div>
            )}

            {models.length > 0 && (
                <div className={cn("pb-4 flex flex-col gap-4", level > 0 ? "px-4" : "px-8")}>
                    <Label className="uppercase text-gray-600">Types</Label>
                    {models.map((model: any) => (
                        <Model key={crypto.randomUUID()} model={model} spath={spath} />
                    ))}
                </div>
            )}

            <div className={cn("flex flex-col gap-4", level > 0 ? "pl-0" : "")}>
                {modules.map((submod: any) => (
                    <Module
                        key={submod.name}
                        mod={submod}
                        path={path.concat(submod.name)}
                        level={level + 1}
                    />
                ))}
            </div>
        </div>
    )
}

function Model({ model, spath }: any) {
    const [name, data] = model
    return (
        <Collapsible className="[&[data-state=open]>div>button>svg]:rotate-90">
            <div id={`${spath}.${name}`}>
                <CollapsibleTrigger className="flex flex-row gap-1.5 items-center">
                    <ChevronRight className="ml-auto size-4 transition-transform text-gray-500 mb-0.5" />
                    <h2 className="font-semibold flex gap-2">
                        <Type className="w-5 h-5" />
                        <code className="text-blue-900">{name}</code>
                    </h2>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <TypeView input={data} spath={spath} className="pb-4" />
                </CollapsibleContent>
            </div>
        </Collapsible>
    )
}

function Endpoint({ endpoint, spath }: any) {
    return (
        <div id={`${spath}.${endpoint.name}`}>
            <h2 className="font-semibold flex flex-row gap-2 items-center mb-2">
                <SquareFunction className="w-6 h-6" />
                <code className="mt-0.5">{endpoint.name}</code>
                <span className="font-normal">
                    <span className="text-gray-400">&mdash;</span>
                    <span className="ml-2 text-sm">{endpoint.summary}</span>
                </span>
            </h2>
            {endpoint.description && (
                <div className="pb-3 pl-8 text-sm max-w-[45em]">
                    <p>{endpoint.description}</p>
                </div>
            )}
            <div className="flex flex-col gap-1 mt-1 pl-8">
                <TypeView name="input" input={endpoint.input} spath={spath} />
                <TypeView name="output" input={endpoint.output} spath={spath} />
            </div>
        </div>
    )
}
