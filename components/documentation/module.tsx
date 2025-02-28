import type { ApiModel, ApiModule } from "@/lib/api/types"
import { cn } from "@/lib/utils"
import { Package } from "lucide-react"
import { Fragment } from "react"
import Endpoint from "./endpoint"

type ModuleProps = {
    models: Map<string, ApiModel>
    module: ApiModule
    path: string[]
    level: number
    className?: string
}
export default function Module({ models, module, path, level, className }: ModuleProps) {
    const { endpoints, submodules } = module
    const spath = path.join(".")

    return (
        <>
            {path.length > 0 && endpoints.length > 0 && (
                <div
                    id={spath}
                    className={cn(
                        level > 0
                            ? "dark:bg-secondary-background bg-stone-50 py-2.5 rounded-lg"
                            : "",
                        "flex flex-col w-full max-w-[45em]",
                        className,
                    )}
                >
                    {path.length > 0 && (
                        <h1
                            className={cn(
                                "mb-4 flex flex-row gap-2 font-semibold items-center",
                                "border-b pb-1 text-[1.75em] pl-3",
                            )}
                        >
                            <Package className={cn("w-6 h-6")} />
                            {spath}
                        </h1>
                    )}

                    {endpoints.length > 0 && (
                        <div
                            className={cn(
                                "flex flex-col w-full items-stretch gap-1 pl-4",
                                level > 0 ? "px-0" : "px-4",
                            )}
                        >
                            {endpoints.map((endpoint, index) => (
                                <Fragment key={endpoint.name}>
                                    {index > 0 && <div className="border-t-2 border-dashed" />}
                                    <Endpoint models={models} endpoint={endpoint} spath={spath} />
                                </Fragment>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {submodules
                .filter((submodule: any) => !submodule.hideFromDoc)
                .map((submodule: any) => (
                    <Module
                        models={models}
                        key={submodule.name}
                        module={submodule}
                        path={path.concat(submodule.name)}
                        level={level + 1}
                    />
                ))}
        </>
    )
}
