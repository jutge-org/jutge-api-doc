import PageWidth from "@/components/page-width"

export default function Layout({ children }: { children: React.ReactNode }) {
    return <PageWidth>{children}</PageWidth>
}
