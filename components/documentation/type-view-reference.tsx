import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { ApiModel } from "@/lib/api/types"
import { cn } from "@/lib/utils"
import HoverCardTip from "./hover-card-tip"
import TypeView from "./type-view"
import { makeExample } from "@/lib/api/dir"

type TypeViewProps = {
    refName: string
    name?: string
    input: any
    spath: string
    models: Map<string, ApiModel>
    className?: string
}

export const TypeViewReference = ({ refName, className, input, spath, models }: TypeViewProps) => {
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
                        className,
                        "p-4 border-black dark:border-white relative flex flex-col",
                        "[&_div.up]:data-[side=top]:hidden [&_div.down]:data-[side=bottom]:hidden",
                        "w-[24em]",
                    )}
                >
                    <div className="up absolute -top-2.5 h-2.5 left-0 right-0 flex flex-row justify-center">
                        <HoverCardTip side="up" />
                    </div>
                    <h3 className="font-semibold mb-2 font-mono break-all">{refName}</h3>
                    <TypeView input={model} spath={spath} models={models} />
                    <h4 className="uppercase font-normal text-xs mt-3 mb-1 text-gray-600">
                        Example
                    </h4>
                    <pre className="text-xs bg-gray-100 dark:bg-stone-900 px-2 py-1 overflow-x-auto">
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
