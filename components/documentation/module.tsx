import { ApiModel, ApiModule } from "@/lib/api-dir"
import { cn } from "@/lib/utils"
import { Package } from "lucide-react"
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
        <div
            id={spath}
            className={cn(
                level > 0 ? "dark:bg-secondary-background bg-stone-50 px-4 py-2.5 rounded-lg" : "",
                level > 1 ? "border-2 pt-1.5" : "",
                className,
            )}
        >
            {path.length > 0 && (
                <h1
                    className={cn(
                        "mb-4 flex flex-row gap-2 font-semibold items-center",
                        level === 1 ? "border-b pb-1 text-[1.75em]" : "mb-4 text-[1.3em] border-b ",
                    )}
                >
                    {level == 1 && <Package className={cn("w-6 h-6")} />}
                    {spath}
                </h1>
            )}

            {endpoints.length > 0 && (
                <div className={cn("flex flex-col items-start gap-5 pl-4", level > 0 ? "px-0" : "px-4")}>
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

            <div className={cn("flex flex-col", level > 0 ? "pl-0 gap-6" : "gap-12")}>
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
