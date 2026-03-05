"use client"

import { RawFiles } from "@/components/raw-files"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { matchesFilter, useFilter } from "@/components/filter-provider"
import { type Tree } from "@/lib/api/dir"
import { Item } from "@/lib/api/types"
import { cn } from "@/lib/utils"
import { ChevronDown, Package, Type } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

function filterTree(items: Item[], filter: { actor: string; domain: string }): Item[] {
    if (!filter.actor && !filter.domain) return items
    return items
        .map((item) => {
            if (item.type === "endpoint") {
                return matchesFilter(item.actor, item.domains, filter) ? item : null
            }
            if (item.type === "module" && item.items) {
                const filtered = filterTree(item.items, filter)
                return filtered.length > 0 ? { ...item, items: filtered } : null
            }
            return item
        })
        .filter((item): item is Item => item !== null)
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
        const isOpen = openset.has(path)
        return (
            <Collapsible
                className="[&[data-state=open]>button>button>svg:first-child]:rotate-90"
                open={isOpen}
                onOpenChange={openModule(path)}
            >
                <SidebarMenuSubItem>
                    <CollapsibleTrigger>
                        <SidebarMenuSubButton>
                            <Package />
                            {item.name}
                            <ChevronDown
                                className={cn(
                                    "ml-auto transition-transform",
                                    isOpen && "rotate-180",
                                )}
                            />
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
                        "hover:outline-primary outline-offset-0",
                        highlight ? "bg-primary hover:bg-primary" : "",
                    )}
                >
                    <span
                        className={cn("font-mono text-[0.95em]", highlight ? "text-secondary" : "")}
                    >
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
    const { actorFilter, setActorFilter, domainFilter, setDomainFilter } = useFilter()
    const filteredTree = filterTree(tree, { actor: actorFilter, domain: domainFilter })

    return (
        <Sidebar {...props} className={props.className}>
            <SidebarContent>
                <Directory tree={filteredTree} />
                <RawFiles apiRaw={apiRaw} />
                <SidebarGroup>
                    <SidebarGroupLabel>Filter</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <div className="flex flex-col gap-2 px-2">
                            <select
                                className="text-xs border rounded px-1 py-0.5 bg-background"
                                value={actorFilter}
                                onChange={(e) => setActorFilter(e.target.value)}
                            >
                                <option value="">Credentials: All</option>
                                <option value="anyActor">Public</option>
                                <option value="userActor">User</option>
                                <option value="instructorActor">Instructor</option>
                                <option value="competitionsActor">Competitions</option>
                                <option value="adminActor">Admin</option>
                            </select>
                            <select
                                className="text-xs border rounded px-1 py-0.5 bg-background"
                                value={domainFilter}
                                onChange={(e) => setDomainFilter(e.target.value)}
                            >
                                <option value="">Domain: All</option>
                                <option value="jutge">Normal (jutge)</option>
                                <option value="exam_contest">Exam / Contest</option>
                            </select>
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
