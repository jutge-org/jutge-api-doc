import EndpointBackgroundFlash from '@/components/endpoint-background-flash'
import TypeView from '@/components/type-view'
import { ApiEndpoint, ApiModel } from '@/lib/api-dir'
import { SquareFunction } from 'lucide-react'
import ActorIcon from './actor-icon'

type EndpointProps = {
    endpoint: ApiEndpoint
    spath: string
    models: Map<string, ApiModel>
}
export default function Endpoint({ endpoint, spath, models }: EndpointProps) {
    return (
        <EndpointBackgroundFlash id={`${spath}.${endpoint.name}`}>
            <h2 className="font-semibold flex flex-row gap-2 items-center mb-0">
                <SquareFunction className="w-6 h-6" />
                <code className="mt-0.5">{endpoint.name}</code>
                <ActorIcon actor={endpoint.actor} />
                <span className="font-normal">
                    <span className="text-gray-400">&mdash;</span>
                    <span className="ml-2 text-sm">{endpoint.summary}</span>
                </span>
            </h2>
            {endpoint.description && (
                <div className="pb-3 pl-8 text-xs text-gray-700 max-w-[45em]">
                    <p>{endpoint.description}</p>
                </div>
            )}
            <div className="flex flex-col mt-0 pl-8">
                <TypeView name="input" input={endpoint.input} spath={spath} models={models} />
                <TypeView name="output" input={endpoint.output} spath={spath} models={models} />
                {endpoint.ifiles !== 'none' && (
                    <div className="text-xs italic text-gray-700">
                        input files: <b>{endpoint.ifiles}</b>
                    </div>
                )}
                {endpoint.ofiles !== 'none' && (
                    <div className="text-xs italic text-gray-700">
                        output files: <b>{endpoint.ofiles}</b>
                    </div>
                )}
            </div>
        </EndpointBackgroundFlash>
    )
}
