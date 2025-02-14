import Module from "@/components/documentation/module"
import PageWidth from "@/components/page-width"
import { getApiDir } from "@/lib/api-dir"

export default async function Page() {
    const { models, root } = await getApiDir()
    return (
        <PageWidth>
            <div className="flex flex-col p-4">
                <Module models={models} module={root} path={[]} level={0} className="w-[60em]" />
            </div>
        </PageWidth>
    )
}
