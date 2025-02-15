import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getApiDir, modules } from "@/lib/api-dir"

export default async function Layout({ children }: { children: React.ReactNode }) {
    const dir = await getApiDir()
    const tree = modules(dir.root)

    return (
        <SidebarProvider>
            <AppSidebar className="mt-[var(--topbar-height)]" tree={tree} />
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    )
}
