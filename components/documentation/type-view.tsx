import { ApiModel } from "@/lib/api/types"
import { cn } from "@/lib/utils"
import React from "react"
import YAML from "yaml"
import { TypeViewReference } from "./type-view-reference"

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
                "font-mono font-bold",
                "text-[0.9em] h-[1.1em] px-0.5",
                "flex flex-col justify-center items-center",
            )}
        >
            {type}
        </div>
    )

    const _AnyOf = ({ types }: { types: any[] }) => (
        <div className="flex flex-wrap items-baseline gap-1 gap-y-0">
            <TypeView input={types[0]} spath={spath} models={models} />
            {types.slice(1).map((type, i) => (
                <React.Fragment key={`${type.type}${i}`}>
                    <span className="italic text-xs text-muted-foreground">or</span>
                    <TypeView input={type} spath={spath} models={models} />
                </React.Fragment>
            ))}
        </div>
    )

    const _Array = ({ items }: { items: any }) => (
        <div className="flex flex-row items-baseline gap-0 ml-1">
            <span className="text-muted-foreground font-bold font-mono text-xs mr-0.5">
                array of
            </span>
            <TypeView input={items} spath={spath} models={models} />
        </div>
    )

    const _Dict = ({ properties }: { properties: any }) => (
        <div className="flex flex-row items-baseline gap-0 ml-1">
            <span className="text-muted-foreground font-bold font-mono text-xs mr-0.5">
                dict of
            </span>
            <TypeView input={properties} spath={spath} models={models} />
        </div>
    )

    const _Object = ({ properties }: { properties: Record<string, any> }) => (
        <div
            className={cn(
                "no-border dark:border-zinc-700 border-zinc-300",
                "pl-1.5 pt-0.5 pb-1 pr-0.5 rounded flex flex-col overflow-x-auto",
            )}
        >
            <table>
                <tbody>
                    {Object.entries(properties).map(([name, type], i) => (
                        <tr key={`${name}${i}`} className="align-baseline border-t border-b">
                            <td className="text-[0.9em] flex flex-row shrink-0 items-center mr-3">
                                {name}
                            </td>
                            {/* <span className="text-gray-300 h-[1.4em] ml-2">&ndash;</span> */}
                            <td>
                                <TypeView input={type} spath={spath} models={models} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

    if (input.type === "void") {
        return
    }

    if (input.$ref) {
        body = (
            <TypeViewReference refName={input.$ref} input={input} models={models} spath={spath} />
        )
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
