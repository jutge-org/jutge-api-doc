import Module from "@/components/documentation/module"
import PageWidth from "@/components/page-width"
import { getApiDir } from "@/lib/api/dir"

export const dynamic = 'auto'

export default async function Page() {
    const { models, root } = await getApiDir()
    return (
        <PageWidth>
            <div className="flex flex-col items-stretch md:p-4 gap-8">
                <Module models={models} module={root} path={[]} level={0} />
            </div>
        </PageWidth>
    )
}
