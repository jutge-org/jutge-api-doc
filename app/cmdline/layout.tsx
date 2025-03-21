import PageWidth from "@/components/page-width"
import TextWidth from "@/components/text-width"

export default async function Layout({ children }: { children: React.ReactNode }) {
    return (
        <PageWidth>
            <TextWidth className="markdown">{children}</TextWidth>
        </PageWidth>
    )
}
