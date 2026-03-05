import Module from "@/components/documentation/module"
import { getApiDir } from "@/lib/api/dir"

export const dynamic = "auto"

export default async function Page() {
    const { models, root } = await getApiDir()
    return (
        <div className="flex flex-col p-4 gap-8 w-full items-center">
            <Module models={models} module={root} path={[]} level={0} />
        </div>
    )
}
