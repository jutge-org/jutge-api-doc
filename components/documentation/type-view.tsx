import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { makeExample } from "@/lib/api/dir"
import { ApiModel } from "@/lib/api/types"
import { cn } from "@/lib/utils"
import React from "react"
import YAML from "yaml"
import HoverCardTip from "./hover-card-tip"

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
                /*
                "box-border border rounded ml-2",
                "text-blue-600 border-blue-400",
                "dark:text-stone-400 dark:border-stone-600",
                */
                "font-mono font-bold",
                "text-[0.9em] h-[1.3em] px-1 flex flex-col justify-center items-center",
            )}
        >
            {type}
        </div>
    )

    const _Reference = ({ refName }: { refName: string }) => {
        const link = (
            <div className="text-blue-900 dark:text-blue-300 text-[0.9em] font-semibold cursor-pointer">
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
                <HoverCardTrigger
                    asChild
                    className="data-[state=open]:bg-blue-100 data-[state=open]:dark:bg-stone-900 rounded px-1.5"
                >
                    {link}
                </HoverCardTrigger>
                {model && (
                    <HoverCardContent
                        className={cn(
                            "p-4 border-black dark:border-white relative flex flex-col w-auto min-w-[22em]",
                            "[&_div.up]:data-[side=top]:hidden [&_div.down]:data-[side=bottom]:hidden",
                        )}
                    >
                        <div className="up absolute -top-2.5 h-2.5 left-0 right-0 flex flex-row justify-center">
                            <HoverCardTip side="up" />
                        </div>
                        <h3 className="font-semibold mb-2 font-mono">{refName}</h3>
                        <TypeView input={model} spath={spath} models={models} />
                        <h4 className="uppercase font-normal text-xs mt-3 mb-1 text-gray-600">
                            Example
                        </h4>
                        <pre className="text-xs bg-gray-100 dark:bg-stone-900 px-2 py-1">
                            {JSON.stringify(makeExample(model, models), null, 2)}
                        </pre>
                        <div className="down absolute -bottom-2 h-2.5 left-0 right-0 flex flex-row justify-center">
                            <HoverCardTip side="down" />
                        </div>
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
        <div className="flex flex-row items-baseline gap-0 ml-1">
            <span className="text-muted-foreground font-bold font-mono text-xs mr-0.5">array of</span>
            <TypeView input={items} spath={spath} models={models} />
        </div>
    )

    const _Dict = ({ properties }: { properties: any }) => (
        <div className="flex flex-row items-baseline gap-0 ml-1">
            <span className="text-muted-foreground font-bold font-mono text-xs">dict of</span>
            <TypeView input={properties} spath={spath} models={models} />
        </div>
    )

    const _Object = ({ properties }: { properties: Record<string, any> }) => (
        <div className="no-border dark:border-zinc-700 border-zinc-300 pl-1.5 pt-0.5 pb-1 pr-0.5 rounded flex flex-col">
            {Object.entries(properties).map(([name, type], i) => (
                <div key={`${name}${i}`} className="flex flex-row items-baseline p-0 h-[1.4em]">
                    <code className="text-[0.9em]">{name}</code>
                    <span className="text-gray-300 h-[1.4em] ml-2">&ndash;</span>
                    <TypeView input={type} spath={spath} models={models} />
                </div>
            ))}
        </div>
    )

    if (input.type === "void") {
        return
    }

    if (input.$ref) {
        body = <_Reference refName={input.$ref} />
    } else if (input.anyOf) {
        body = <_AnyOf types={input.anyOf} />
    } else if (input.type === "object") {
        if (input.properties) {
            body = <_Object properties={input.properties} />
        } else if (input.patternProperties) {
            body = <_Dict properties={input.patternProperties["^(.*)$"]} />
        }
    } else if (input.type === "array") {
        body = <_Array items={input.items} />
    } else {
        body = <_BasicType type={input.type} />
    }
    return (
        <div className={cn("flex flex-row text-sm items-baseline gap-1", className)}>
            {name && (
                <div className="min-w-[3.5em] text-muted-foreground italic text-xs">{name}</div>
            )}
            {body}
        </div>
    )
}
