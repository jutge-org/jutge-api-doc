import TypeView from "@/components/documentation/type-view"
import EndpointBackgroundFlash from "@/components/endpoint-background-flash"
import { ApiEndpoint, ApiModel } from "@/lib/api-dir"
import ActorIcon from "../actor-icon"

type EndpointProps = {
    endpoint: ApiEndpoint
    spath: string
    models: Map<string, ApiModel>
}
export default function Endpoint({ endpoint, spath, models }: EndpointProps) {
    return (
        <EndpointBackgroundFlash id={`${spath}.${endpoint.name}`}>
            <h2 className="flex flex-row gap-2 items-center my-0">
                <code className="mt-0.5 font-semibold text-[1.05rem]">{endpoint.name}</code>
                <ActorIcon actor={endpoint.actor} />
                <span className="text-gray-400 font-normal mx-1">&mdash;</span>
                <span className="pt-0.5 font-normal text-sm">{endpoint.summary}</span>
            </h2>
            {endpoint.description && (
                <div className="pb-2 text-xs text-muted-foreground max-w-[45em]">
                    <p>{endpoint.description}</p>
                </div>
            )}
            <div className="flex flex-col gap-0.5 mt-0">
                <TypeView name="input" input={endpoint.input} spath={spath} models={models} />
                <TypeView name="output" input={endpoint.output} spath={spath} models={models} />
                {endpoint.ifiles !== "none" && (
                    <div className="text-xs italic text-muted-foreground">
                        input files: <b>{endpoint.ifiles}</b>
                    </div>
                )}
                {endpoint.ofiles !== "none" && (
                    <div className="text-xs italic text-muted-foreground">
                        output files: <b>{endpoint.ofiles}</b>
                    </div>
                )}
            </div>
        </EndpointBackgroundFlash>
    )
}
