"use client"

import Logo from "@/components/header/logo"
import PageWidth from "@/components/page-width"
import ThemeSwitcher from "@/components/theme/theme-switcher"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const clients: { title: string; id: string; description: string }[] = [
    { title: "Python", id: "python", description: "Client en Python" },
    { title: "Typescript", id: "typescript", description: "Client en Typescript" },
    { title: "Javascript", id: "javascript", description: "Client en Javascript" },
    { title: "PHP", id: "php", description: "Client en PHP" },
    { title: "C++", id: "cpp", description: "Client en C++" },
]

export default function Header() {
    const pathname = usePathname()

    return (
        <header className="bg-background fixed top-0 left-0 right-0 px-3 border-b pt-[2px] flex flex-row items-stretch z-50">
            <PageWidth className="flex flex-row items-stretch gap-2">
                <Logo />
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem
                            className={cn(
                                "border-b-2 border-b-transparent h-[var(--topbar-height)] flex items-center",
                                pathname.startsWith("/clients") && "border-b-black",
                            )}
                        >
                            <NavigationMenuTrigger>Clients</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="flex flex-col gap-3 p-2 md:grid-cols-1 min-w-[16em]">
                                    {clients.map((client) => (
                                        <ClientItem
                                            key={client.id}
                                            id={client.id}
                                            title={client.title}
                                            href={`/clients/${client.id}`}
                                        >
                                            {client.description}
                                        </ClientItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <Link
                            href="/docs"
                            className={cn(
                                "border-b-2 border-b-transparent h-[var(--topbar-height)] flex items-center",
                                pathname.startsWith("/docs") && "border-b-black",
                            )}
                        >
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <div>Documentation</div>
                            </NavigationMenuLink>
                        </Link>
                        <Link
                            href="/notebook"
                            className={cn(
                                "border-b-2 border-b-transparent h-[var(--topbar-height)] flex items-center",
                                pathname.startsWith("/notebook") && "border-b-black",
                            )}
                        >
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <div>Playground</div>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="flex-1"></div>
                <ThemeSwitcher />
            </PageWidth>
        </header>
    )
}

const ClientItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
    ({ className, title, id, href, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <Link
                        href={href || "/"}
                        ref={ref}
                        className={cn(
                            "flex flex-row items-center gap-3",
                            "select-none space-y-1 rounded-md p-2 leading-none",
                            "no-underline outline-none transition-colors",
                            "hover:bg-accent hover:text-accent-foreground",
                            "focus:bg-accent focus:text-accent-foreground",
                            className,
                        )}
                        {...props}
                    >
                        <Image
                            src={`/logos/${id}.svg`}
                            width={42}
                            height={32}
                            alt={`${title} logo`}
                        />
                        <div className="flex flex-col flex-1">
                            <div className="text-sm font-medium leading-none">{title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {children}
                            </p>
                        </div>
                    </Link>
                </NavigationMenuLink>
            </li>
        )
    },
)
ClientItem.displayName = "ListItem"
