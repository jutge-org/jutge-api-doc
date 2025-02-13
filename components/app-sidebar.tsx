import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Item, type Tree } from "@/lib/api-dir"
import { ChevronDown, Cog, Package, Type } from "lucide-react"
import Link from "next/link"
import * as React from "react"
import { NavUser } from "./nav-user"
import { cn } from "@/lib/utils"

type ApiRawItem = {
    name: string
    url: string
    icon?: string
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
    tree: Tree
}

const clients: Item[] = [
    {
        name: "FakeHome",
        type: "client",
        url: "/home",
        isActive: false,
    },
    {
        name: "Python",
        type: "client",
        url: "/python",
        isActive: false,
    },
    {
        name: "TypeScript",
        type: "client",
        url: "/typescript",
        isActive: false,
    },
    {
        name: "JavaScript",
        type: "client",
        url: "/javascript",
        isActive: false,
    },
    {
        name: "C++",
        type: "client",
        url: "/cpp",
        isActive: false,
    },
    {
        name: "PHP",
        type: "client",
        url: "/php",
        isActive: false,
    },
]

const user = {
    name: "guest",
    email: "guest@example.com",
    avatar: "/avatars/shadcn.jpg",
}

const apiRaw = [
    { name: "Notebook", url: "/notebook" },
    { name: "Raw Directory", url: "/api/dir" },
]

export function AppSidebar({ ...props }: AppSidebarProps) {
    const { tree } = props
    return (
        <Sidebar {...props} className={cn("sidebar", props.className)}>
            <SidebarContent>
                <Directory tree={tree} />
                <ApiRaw apiRaw={apiRaw} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}

function ApiRaw({ apiRaw: items }: { apiRaw: ApiRawItem[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>API Tools</SidebarGroupLabel>
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

function Directory({ tree: treeDir }: { tree: Item[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>API Directory</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {treeDir.map((item, index) => (
                        <Tree key={index} item={item} />
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

function Tree({ item }: { item: Item }) {
    if (item.type === "model") {
        return (
            <SidebarMenuSubItem>
                <SidebarMenuSubButton href={item.url}>
                    <Type />
                    <span>{item.name}</span>
                </SidebarMenuSubButton>
            </SidebarMenuSubItem>
        )
    }

    if (item.type === "endpoint") {
        return (
            <SidebarMenuSubItem>
                <SidebarMenuSubButton href={item.url}>
                    <span className="font-mono text-[0.95em]">{item.name}</span>
                </SidebarMenuSubButton>
            </SidebarMenuSubItem>
        )
    }

    if (item.type === "module") {
        return (
            <Collapsible className="group/collapsible [&[data-state=open]>button>button>svg:first-child]:rotate-90">
                <SidebarMenuSubItem>
                    <CollapsibleTrigger className="w-full">
                        <SidebarMenuSubButton>
                            <Package />
                            {item.name}
                            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuSubButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        {item.items && (
                            <SidebarMenuSub className="pr-0 mr-0">
                                {item.items.map((subItem: any, index: number) => (
                                    <Tree key={index} item={subItem} />
                                ))}
                            </SidebarMenuSub>
                        )}
                    </CollapsibleContent>
                </SidebarMenuSubItem>
            </Collapsible>
        )
    }

    console.log("Unknown item type:", item.type)
}
