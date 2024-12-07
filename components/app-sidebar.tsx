import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { Item, type Tree } from '@/lib/api-dir'
import { ChevronDown, Cog, Package, SquareChevronRight, SquareFunction, Type } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { NavUser } from './nav-user'

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
        name: 'Python',
        type: 'client',
        url: '/python',
        isActive: false,
    },
    {
        name: 'TypeScript',
        type: 'client',
        url: '/typescript',
        isActive: false,
    },
    {
        name: 'JavaScript',
        type: 'client',
        url: '/javascript',
        isActive: false,
    },
    {
        name: 'PHP',
        type: 'client',
        url: '/php',
        isActive: false,
    },
]

const user = {
    name: 'guest',
    email: 'guest@example.com',
    avatar: '/avatars/shadcn.jpg',
}

const apiRaw = [
    { name: 'Directory', url: '/api/dir' },
    { name: 'Run', url: '/api/run' },
]

export function AppSidebar({ ...props }: AppSidebarProps) {
    const { tree } = props
    return (
        <Sidebar {...props}>
            <Header />

            <SidebarContent>
                <Clients clients={clients} />
                <Directory tree={tree} />
                <ApiRaw apiRaw={apiRaw} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}

function Header() {
    return (
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" asChild>
                        <Link href="/">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <Image src="/jutge.png" width={64} height={64} alt="" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">API Documentation</span>
                                <span className="truncate text-xs">Jutge.org</span>
                            </div>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )
}

function Clients({ clients }: { clients: Item[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>API Clients</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {clients.map((item, index) => (
                        <SidebarMenuItem key={index}>
                            <Link download="client" href={item.url}>
                                <SidebarMenuButton>
                                    <SquareChevronRight />
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

function ApiRaw({ apiRaw: items }: { apiRaw: ApiRawItem[] }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>API Raw</SidebarGroupLabel>
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
    if (item.type === 'model') {
        return (
            <SidebarMenuSubItem>
                <SidebarMenuSubButton href={item.url}>
                    <Type />
                    {item.name}
                </SidebarMenuSubButton>
            </SidebarMenuSubItem>
        )
    }

    if (item.type === 'endpoint') {
        return (
            <SidebarMenuSubItem>
                <SidebarMenuSubButton href={item.url}>
                    <SquareFunction />
                    <span>{item.name}</span>
                </SidebarMenuSubButton>
            </SidebarMenuSubItem>
        )
    }

    if (item.type === 'module') {
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

    console.log('Unknown item type:', item.type)
}
