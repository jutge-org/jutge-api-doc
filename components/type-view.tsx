import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { ApiModel, makeExample } from '@/lib/api-dir'
import { cn } from '@/lib/utils'
import React from 'react'
import YAML from 'yaml'

type TypeViewProps = {
    className?: string
    name?: string
    input: any
    spath: string
    models: Map<string, ApiModel>
}
export default async function TypeView({ className, name, input, spath, models }: TypeViewProps) {
    let body = <pre className="text-xs pl-2 pt-2">{YAML.stringify(input, null, 4)}</pre>

    const _BasicType = ({ type }: { type: string }) => (
        <div
            className={cn(
                'bg-blue-50 box-border border border-blue-100 rounded text-blue-800',
                'text-[0.9em] h-[1.3em] px-1 flex flex-col justify-center items-center',
            )}
        >
            {type}
        </div>
    )

    const _Reference = ({ refName }: { refName: string }) => {
        const link = (
            <div className="text-blue-900 text-[0.9em] font-semibold cursor-pointer">
                <code>{input.$ref}</code>
            </div>
        )
        const model = models.get(refName)
        if (model === undefined) {
            console.log(`Model not found: ${refName}`)
            return link
        }
        return (
            <HoverCard openDelay={0} closeDelay={0}>
                <HoverCardTrigger asChild className="data-[state=open]:bg-blue-100 rounded px-1.5">
                    {link}
                </HoverCardTrigger>
                {model && (
                    <HoverCardContent className="p-4 border-black relative flex flex-col w-auto min-w-[22em]">
                        <div className="absolute -top-2.5 h-2.5 left-0 right-0 flex flex-row justify-center">
                            <svg viewBox="0 0 30 10">
                                <path d="M 0 10 L 15 2 L 30 10" fill="white" stroke="black" />
                            </svg>
                        </div>
                        <h3 className="font-semibold mb-2 font-mono">{refName}</h3>
                        <TypeView input={model} spath={spath} models={models} />
                        <h4 className="uppercase font-normal text-xs mt-3 mb-1 text-gray-600">
                            Example
                        </h4>
                        <pre className="text-xs bg-gray-100 px-2 py-1">
                            {JSON.stringify(makeExample(model, models), null, 2)}
                        </pre>
                    </HoverCardContent>
                )}
            </HoverCard>
        )
    }

    const _AnyOf = ({ types }: { types: any[] }) => (
        <div className="flex flex-row items-center gap-1">
            <TypeView input={types[0]} spath={spath} models={models} />
            {types.slice(1).map((type, i) => (
                <React.Fragment key={`${type.type}${i}`}>
                    <span className="italic text-xs text-gray-600">or</span>
                    <TypeView input={type} spath={spath} models={models} />
                </React.Fragment>
            ))}
        </div>
    )

    const _Array = ({ items }: { items: any }) => (
        <div className="flex flex-row items-baseline gap-2">
            <span className="text-gray-700 italic text-xs">Array of</span>
            <TypeView input={items} spath={spath} models={models} />
        </div>
    )

    const _Object = ({ properties }: { properties: Record<string, any> }) => (
        <div className="border px-3 p-1 pb-2 mr-4 rounded bg-white flex flex-col">
            {Object.entries(properties).map(([name, type], i) => (
                <div
                    key={`${name}${i}`}
                    className="flex flex-row gap-3 items-baseline p-0 h-[1.4em]"
                >
                    <code className="text-[0.9em]">{name}</code>
                    <span className="text-gray-300 h-[1.4em]">&ndash;</span>
                    <TypeView input={type} spath={spath} models={models} />
                </div>
            ))}
        </div>
    )

    if (input.type === 'void') {
        return
    }

    if (input.$ref) {
        body = <_Reference refName={input.$ref} />
    } else if (input.anyOf) {
        body = <_AnyOf types={input.anyOf} />
    } else if (input.type === 'object') {
        if (input.properties) {
            body = <_Object properties={input.properties} />
        } else if (input.patternProperties) {
            body = <_Object properties={input.patternProperties} />
        }
    } else if (input.type === 'array') {
        body = <_Array items={input.items} />
    } else {
        body = <_BasicType type={input.type} />
    }
    return (
        <div className={cn('flex flex-row text-sm items-baseline', className)}>
            {name && <div className="min-w-[3.5em] text-gray-600 italic text-xs">{name}</div>}
            {body}
        </div>
    )
}
