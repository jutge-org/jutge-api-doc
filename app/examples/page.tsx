import { loadAllSamples } from "@/actions/load-code"
import { CodeSamples } from "@/components/landing/code-samples"
import PageWidth from "@/components/page-width"

export default async function ExamplesPage() {
    const allCodeSamples = await loadAllSamples()

    return (
        <PageWidth className="mx-auto pt-12">
            <CodeSamples allCodeSamples={allCodeSamples} />
        </PageWidth>
    )
}
