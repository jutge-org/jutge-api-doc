import EndpointWrapper from "@/components/documentation/endpoint-wrapper"
import TypeView from "@/components/documentation/type-view"
import type { ApiEndpoint, ApiModel } from "@/lib/api/types"
import ActorIcon from "../actor-icon"

type EndpointProps = {
    endpoint: ApiEndpoint
    spath: string
    models: Map<string, ApiModel>
}
export default function Endpoint({ endpoint, spath, models }: EndpointProps) {
    return (
        <EndpointWrapper id={`${spath}.${endpoint.name}`}>
            <h2 className="flex flex-col items-baseline mt-1.5 m-0 leading-snug">
                <div className="flex flex-row gap-2 items-center">
                    <code className="mt-0.5 font-semibold text-[1.05rem]">
                        <span className="text-muted-foreground text-[0.95rem]">{spath}.</span>
                        {endpoint.name}
                    </code>
                    <ActorIcon actor={endpoint.actor} />
                </div>
            </h2>
            <span className="pt-0.5 font-normal text-sm">{endpoint.summary}</span>
            {endpoint.description && (
                <div className="text-xs text-muted-foreground max-w-[45em] mt-1.5 mb-1">
                    <p>{endpoint.description}</p>
                </div>
            )}
            <div className="flex flex-col gap-0.5 mt-1.5">
                <TypeView name="input" input={endpoint.input} spath={spath} models={models} />
                {endpoint.ifiles !== "none" && (
                    <div className="text-xs">
                        <span className=" text-muted-foreground italic mr-2">input files</span>
                        <span className="font-bold">{endpoint.ifiles}</span>
                    </div>
                )}
                <TypeView name="output" input={endpoint.output} spath={spath} models={models} />
                {endpoint.ofiles !== "none" && (
                    <div className="text-xs">
                        <span className=" text-muted-foreground italic mr-2">output files</span>
                        <span className="font-bold">{endpoint.ofiles}</span>
                    </div>
                )}
            </div>
        </EndpointWrapper>
    )
}
