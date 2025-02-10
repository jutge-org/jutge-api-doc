import Module from "@/components/module"
import PageWidth from "@/components/page-width"
import { getApiDir } from "@/lib/api-dir"

export default async function Page() {
    const { models, root } = await getApiDir()
    return (
        <PageWidth>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
                <Module models={models} module={root} path={[]} level={0} />
            </div>
        </PageWidth>
    )
}
