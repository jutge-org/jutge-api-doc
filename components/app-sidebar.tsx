"use client"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
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
import { type Tree } from "@/lib/api/dir"
import { Item } from "@/lib/api/types"
import { cn } from "@/lib/utils"
import { ChevronDown, Cog, Package, Type } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

type ApiRawItem = {
    name: string
    url: string
    icon?: string
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
    tree: Tree
}

const apiRaw = [{ name: "Directory JSON File", url: "/api/dir" }]

export function AppSidebar({ ...props }: AppSidebarProps) {
    const pathname = usePathname()
    const [selected, setSelected] = useState("")
    const [openset, setOpenSet] = useState(new Set<string>())

    const openModule = (path: string) => (open: boolean) => {
        if (open) {
            setOpenSet((prev) => new Set([...prev, path]))
        } else {
            setOpenSet((prev) => new Set([...prev].filter((p) => p !== path)))
        }
    }

    const onPopState = (e: PopStateEvent) => {
        const hash = window.location.hash.slice(1)
        console.log("onPopState", hash)
        setSelected(hash)
    }

    const onHashChange = (e: HashChangeEvent) => {
        const hash = window.location.hash.slice(1)
        console.log("onHashChange", hash)
        setSelected(hash)
    }

    useEffect(() => {
        const hash = window.location.hash.slice(1)
        setSelected(hash)
    }, [pathname])

    useEffect(() => {
        const parts = selected.split(".")
        const paths: string[] = []
        for (let i = 0; i < parts.length; i++) {
            const path = parts.slice(0, i + 1).join(".")
            paths.push(path)
        }
        setOpenSet((prev) => new Set([...prev, ...paths]))

        addEventListener("popstate", onPopState)
        addEventListener("hashchange", onHashChange)
        return () => {
            removeEventListener("popstate", onPopState)
            removeEventListener("hashchange", onHashChange)
        }
    }, [selected])

    const Module = ({ item, path }: { item: Item; path: string }) => {
        return (
            <Collapsible
                className="group/collapsible [&[data-state=open]>button>button>svg:first-child]:rotate-90"
                open={openset.has(path)}
                onOpenChange={openModule(path)}
            >
                <SidebarMenuSubItem>
                    <CollapsibleTrigger>
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
                                    <Tree
                                        key={index}
                                        item={subItem}
                                        path={`${path}.${subItem.name}`}
                                    />
                                ))}
                            </SidebarMenuSub>
                        )}
                    </CollapsibleContent>
                </SidebarMenuSubItem>
            </Collapsible>
        )
    }

    const Endpoint = ({ item, path }: { item: Item; path: string }) => {
        const highlight = path === selected
        return (
            <SidebarMenuSubItem>
                <SidebarMenuSubButton
                    href={item.url}
                    className={cn(
                        "hover:outline-accent outline-offset-0",
                        highlight ? "bg-accent hover:bg-accent" : "",
                    )}
                >
                    <span className={cn("font-mono text-[0.95em]", highlight ? "text-white" : "")}>
                        {item.name}
                    </span>
                </SidebarMenuSubButton>
            </SidebarMenuSubItem>
        )
    }

    const Model = ({ item }: { item: Item }) => (
        <SidebarMenuSubItem>
            <SidebarMenuSubButton href={item.url}>
                <Type />
                <span>{item.name}</span>
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    )

    function Tree({ item, path }: { item: Item; path: string }) {
        switch (item.type) {
            case "module":
                return <Module item={item} path={path} />
            case "endpoint":
                return <Endpoint item={item} path={path} />
            case "model":
                return <Model item={item} />
            default:
                console.error("Unknown item type:", item.type)
        }
    }

    function Directory({ tree }: { tree: Item[] }) {
        return (
            <SidebarGroup>
                <SidebarGroupLabel>API Directory</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {tree.map((item, index) => (
                            <Tree key={index} item={item} path={item.name} />
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        )
    }

    const { tree } = props
    return (
        <Sidebar {...props} className={cn("sidebar", props.className)}>
            <SidebarContent>
                <Directory tree={tree} />
                <RawFiles apiRaw={apiRaw} />
            </SidebarContent>
        </Sidebar>
    )
}

function RawFiles({ apiRaw: items }: { apiRaw: ApiRawItem[] }) {
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
