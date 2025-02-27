import Module from "@/components/documentation/module"
import PageWidth from "@/components/page-width"
import { getApiDir } from "@/lib/api/dir"

export const dynamic = 'auto'

export default async function Page() {
    const { models, root } = await getApiDir()
    return (
        <PageWidth>
            <div className="flex flex-col p-4 gap-8">
                <Module models={models} module={root} path={[]} level={0} className="w-[60em]" />
            </div>
        </PageWidth>
    )
}
