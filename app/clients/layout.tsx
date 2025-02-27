import PageWidth from "@/components/page-width"
import TextWidth from "@/components/text-width"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <PageWidth className="pt-8 px-4 md:px-0">
            <TextWidth className="markdown w-full">{children}</TextWidth>
        </PageWidth>
    )
}
