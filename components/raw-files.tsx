import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Cog } from "lucide-react"
import Link from "next/link"

export type ApiRawItem = {
    name: string
    url: string
    icon?: string
}

export function RawFiles({ apiRaw: items }: { apiRaw: ApiRawItem[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>API Raw Files</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item, index) => (
                        <SidebarMenuItem key={index}>
                            <Link target="_blank" href={item.url}>
                                <SidebarMenuButton>
                                    <Cog />
                                    {item.name}
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
