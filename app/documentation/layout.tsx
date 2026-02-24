import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { getApiDir, modules } from "@/lib/api/dir"

export default async function Layout({ children }: { children: React.ReactNode }) {
    const dir = await getApiDir()
    const tree = modules(dir.root)

    return (
        <SidebarProvider>
            <AppSidebar
                variant="sidebar"
                side="left"
                className="mt-(--topbar-height)"
                tree={tree}
            />
            <div className="md:ml-[calc(var(--sidebar-width)+2em)] xl:ml-0 w-full flex flex-row justify-center debug">
                {children}
            </div>
        </SidebarProvider>
    )
}
