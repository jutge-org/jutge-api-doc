import { loadAllSamples } from "@/actions/load-code"
import { CodeSamples } from "@/components/landing/code-samples"
import Hero from "@/components/landing/hero"
import PageWidth from "@/components/page-width"

export default async function Page() {
    const allCodeSamples = await loadAllSamples()

    return (
        <PageWidth className="mx-auto pt-2 px-2 md:px-0">
            <Hero />
            <CodeSamples allCodeSamples={allCodeSamples} />
        </PageWidth>
    )
}
