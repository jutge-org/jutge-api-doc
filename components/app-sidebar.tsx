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
} from '@/components/ui/sidebar'
import {
    ChevronRight,
    Cog,
    List,
    Package,
    SquareChevronRight,
    SquareFunction,
    Type,
} from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'
import { NavUser } from './nav-user'
import Link from 'next/link'

type Item = {
    name: string
    url: string
    type: string
    isActive?: boolean
    items?: Item[]
}

type Items = Item[]

type ApiRawItem = {
    name: string
    url: string
    icon?: string
}

type Module = any

function models(mod: Module): Items {
    return mod.models.map((model: any) => {
        return {
            name: model[0],
            url: '#',
            type: 'model',
            isActive: false,
        }
    })
}

function endpoints(mod: Module): Items {
    return mod.endpoints.map((endpoint: any) => {
        return {
            name: endpoint.name,
            url: '#',
            type: 'endpoint',
            isActive: false,
        }
    })
}

function modules(mod: Module): Items {
    return mod.modules.map((mod: any) => {
        return {
            name: mod.name,
            url: '#',
            type: 'module',
            isActive: false,
            items: models(mod).concat(endpoints(mod)).concat(modules(mod)),
        }
    })
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
    dir: Module
}

export function AppSidebar({ ...props }: AppSidebarProps) {
    const clients: Items = [
        {
            name: 'TypeScript',
            type: 'client',
            url: '/api/clients/typescript',
            isActive: false,
        },
        {
            name: 'Python',
            type: 'client',
            url: '/api/clients/python',
            isActive: false,
        },
    ]

    const tree = modules(props.dir)

    const user = {
        name: 'guest',
        email: 'guest@example.com',
        avatar: '/avatars/shadcn.jpg',
    }

    const apiRaw = [
        { name: 'Directory', url: '/api/dir' },
        { name: 'Run', url: '/api/run' },
    ]

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
                        <a href="#">
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                <Image src="/jutge.png" width={64} height={64} alt="" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">API Documentation</span>
                                <span className="truncate text-xs">Jutge.org</span>
                            </div>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )
}

function Clients({ clients }: { clients: Items }) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>API Clients</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {clients.map((item, index) => (
                        <SidebarMenuItem key={index}>
                            <SidebarMenuButton>
                                <SquareChevronRight />
                                <a target="_blank" href={item.url}>
                                    {item.name}
                                </a>
                            </SidebarMenuButton>
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
                            <SidebarMenuButton>
                                <Cog />
                                <a target="_blank" href={item.url}>
                                    {item.name}
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}

function Directory({ tree: treeDir }: { tree: Items }) {
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
            <SidebarMenuButton isActive={false} className="data-[active=true]:bg-transparent">
                <Type />
                {item.name}
            </SidebarMenuButton>
        )
    }

    if (item.type === 'endpoint') {
        return (
            <SidebarMenuButton isActive={false} className="data-[active=true]:bg-transparent">
                <SquareFunction />
                {item.name}
            </SidebarMenuButton>
        )
    }

    if (item.type === 'module') {
        return (
            <SidebarMenuItem>
                <Collapsible
                    className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
                    defaultOpen={item.name === 'components' || item.name === 'ui'}
                >
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                            <ChevronRight className="transition-transform" />
                            <Package />
                            {item.name}
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.items ? (
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                {item.items.map((subItem: any, index: number) => (
                                    <Tree key={index} item={subItem} />
                                ))}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    ) : null}
                </Collapsible>
            </SidebarMenuItem>
        )
    }

    console.log('Unknown item type:', item.type)
}
