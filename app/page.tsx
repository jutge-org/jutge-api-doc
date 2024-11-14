import { getApiDir } from '@/lib/api-dir'
import { jutgeApiAddress } from '@/lib/utilities'
import { cn } from '@/lib/utils'
import { Package, SquareFunction, Type } from 'lucide-react'
import Link from 'next/link'
import YAML from 'yaml'

export default async function Page() {
    const dir = await getApiDir()

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
                <Module mod={dir} path={[]} />
            </div>
        </div>
    )
}

function Module({ mod, path }: any) {
    const _Header = () =>
        path.length === 0 ? null : (
            <h1 className="pt-1 pl-1 pb-4 flex gap-2 rounded-xl font-semibold">
                <Package />
                {path.join('.')}
            </h1>
        )

    const _Models = () =>
        mod.models.length > 0 && (
            <div className="px-8 pb-12 flex flex-col gap-8">
                {mod.models.map((model: any) => (
                    <Model key={crypto.randomUUID()} model={model} path={path} />
                ))}
            </div>
        )

    const _Endpoints = () =>
        _Endpoints.length > 0 && (
            <div className="px-8 pb-12 flex flex-col gap-8">
                {mod.endpoints.map((endpoint: any) => (
                    <Endpoint key={endpoint.name} endpoint={endpoint} path={path} />
                ))}
            </div>
        )

    const _Submodules = () => mod.modules.map((submod: any) => (
        <Module key={submod.name} mod={submod} path={path.concat(submod.name)} />
    ))

    return (
        <div id={path}>
            <_Header />
            <_Models />
            <_Endpoints />
            <_Submodules />
        </div>
    )
}

function Model({ model, path }: any) {
    const [name, data] = model
    return (
        <div id={`${path.join('.')}.${name}`}>
            <h2 className="font-semibold flex gap-2">
                <Type className="w-5 h-5" />
                <code>{name}</code>
            </h2>
            <TypeView input={data} path={path} />
        </div>
    )
}

function Endpoint({ endpoint, path }: any) {
    return (
        <div id={`${path.join('.')}.${endpoint.name}`}>
            <h2 className="font-semibold flex flex-row gap-2 items-center">
                <SquareFunction className="w-6 h-6" />
                <code className="mt-1">{endpoint.name}</code>
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
                <TypeView name="input" input={endpoint.input} path={path} />
                <TypeView name="output" input={endpoint.output} path={path} />
            </div>
        </div>
    )
}

type TypeViewProps = {
    name?: string
    input: Record<string, any>
    path: string[]
}
function TypeView({ name, input, path }: TypeViewProps) {
    let body = <pre className="text-xs pl-2 pt-2">{YAML.stringify(input, null, 4)}</pre>

    const _BasicType = ({ type }: { type: string }) => (
        <div className="bg-gray-100 box-border border border-gray-200 rounded-full px-2 text-gray-800">
            {type}
        </div>
    )

    const _Reference = ({ name }: { name: string }) => (
        <Link href={`#${path.join('.')}.${name}`}>
            <code>{input.$ref}</code>
        </Link>
    )

    const _AnyOf = ({ types }: { types: any[] }) => (
        <div className="flex flex-row items-center gap-3">
            <TypeView input={types[0]} path={path} />
            {types.slice(1).map((type) => (
                <>
                    <div className="h-4 border"></div>
                    <TypeView key={type.type} input={type} path={path} />
                </>
            ))}
        </div>
    )

    const _Object = ({ properties }: { properties: Record<string, any> }) => (
        <div className="border px-3 p-1 rounded">
            <div className="flex flex-col gap-1">
                {Object.entries(properties).map(([name, type]) => (
                    <div key={name} className="flex flex-row gap-2 items-baseline">
                        <code className="text-sm">{name}</code>
                        <TypeView input={type} path={path} />
                    </div>
                ))}
            </div>
        </div>
    )

    if (input.$ref) {
        body = <_Reference name={input.$ref} />
    } else if (input.anyOf) {
        body = <_AnyOf types={input.anyOf} />
    } else if (input.type === 'object') {
        if (input.properties) {
            body = <_Object properties={input.properties} />
        }
    } else {
        body = <_BasicType type={input.type} />
    }
    return (
        <div
            className={cn(
                'flex flex-row gap-3 text-sm items-baseline',
                input.type === 'object' && !name ? 'pl-8' : '',
            )}
        >
            {name && <h4 className="min-w-[4em] text-gray-700">{name}</h4>}
            {body}
        </div>
    )
}
