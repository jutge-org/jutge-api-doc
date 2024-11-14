import { cn } from '@/lib/utils'
import Link from 'next/link'
import YAML from 'yaml'

type TypeViewProps = {
    className?: string
    name?: string
    input: Record<string, any>
    spath: string
}
export default async function TypeView({ className, name, input, spath }: TypeViewProps) {
    let body = <pre className="text-xs pl-2 pt-2">{YAML.stringify(input, null, 4)}</pre>

    const _BasicType = ({ type }: { type: string }) => (
        <div className="bg-blue-50 box-border border border-blue-100 rounded text-blue-800 text-[0.9em] h-[1.5em] px-1 flex flex-col justify-center items-center">
            <span className="">{type}</span>
        </div>
    )

    const _Reference = ({ name }: { name: string }) => (
        <Link href={`#${spath}.${name}`} className="text-blue-900 text-[0.9em] font-semibold">
            <code>{input.$ref}</code>
        </Link>
    )

    const _AnyOf = ({ types }: { types: any[] }) => (
        <div className="flex flex-row items-center gap-2">
            <TypeView input={types[0]} spath={spath} />
            {types.slice(1).map((type) => (
                <>
                    <div className="h-4 border border-blue-200"></div>
                    <TypeView key={type.type} input={type} spath={spath} />
                </>
            ))}
        </div>
    )

    const _Object = ({ properties }: { properties: Record<string, any> }) => (
        <div className="border px-3 p-1 rounded bg-white">
            <div className="flex flex-col gap-0.5">
                {Object.entries(properties).map(([name, type]) => (
                    <div key={name} className="flex flex-row gap-3 items-baseline">
                        <code className="text-[0.9em]">{name}</code>
                        <span className="text-gray-300">&ndash;</span>
                        <TypeView input={type} spath={spath} />
                    </div>
                ))}
            </div>
        </div>
    )

    if (input.type === 'void') {
        return
    }

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
                className,
            )}
        >
            {name && <h4 className="min-w-[4em] text-gray-700">{name}</h4>}
            {body}
        </div>
    )
}
