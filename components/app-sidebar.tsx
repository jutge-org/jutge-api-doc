'use client'

import * as React from 'react'
import {
    BookOpen,
    Package,
    Gavel,
    Type,
    SquareFunction,
    Map,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
    LifeBuoy,
    SquareChevronRight,
} from 'lucide-react'
import Image from 'next/image'
import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { isAbsolute } from 'path'

type Props = React.ComponentProps<typeof Sidebar> & {
    dir: any
}

function moduleItems(dir: any, items: any[], path: string) {
    const endpoints = dir.endpoints.map((endpoint: any) => ({
        title: endpoint.name,
        url: '#',
        icon: SquareFunction,
        isActive: false,
    }))

    const models = dir.models.map((model: any) => ({
        title: model[0],
        url: '#',
        icon: Type,
        isActive: false,
    }))

    items.push({
        title: path + dir.name,
        url: '#',
        icon: Package,
        isActive: false,
        items: models.concat(endpoints),
    })
    for (const mod of dir.modules) {
        moduleItems(mod, items, path + dir.name + '.')
    }
}

export function AppSidebar({ ...props }: Props) {
    const user = {
        name: 'guest',
        email: 'guest@example.com',
        avatar: '/avatars/shadcn.jpg',
    }

    const dirItems: any[] = []
    for (const mod of props.dir.modules) {
        moduleItems(mod, dirItems, '')
    }

    const clientsItems: any[] = [
        {
            title: 'TypeScript',
            url: '#',
            icon: SquareChevronRight,
            isActive: false,
        },
        {
            title: 'Python',
            url: '#',
            icon: SquareChevronRight,
            isActive: false,
        },
        {
            title: 'Shell',
            url: '#',
            icon: SquareChevronRight,
            isActive: false,
        },
    ]

    const data = {
        user,
        dirMenu: {
            title: 'Directory',
            items: dirItems,
        },
        clientsMenu: {
            title: 'Clients',
            items: clientsItems,
        },
        navSecondary: [
            {
                title: 'Support',
                url: '#',
                icon: LifeBuoy,
            },
            {
                title: 'Feedback',
                url: '#',
                icon: Send,
            },
        ],
    }

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Image src="/jutge.png" width={64} height={64} alt="" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        API Documentation
                                    </span>
                                    <span className="truncate text-xs">Jutge.org</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain menu={data.clientsMenu} />
                <NavMain menu={data.dirMenu} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}
