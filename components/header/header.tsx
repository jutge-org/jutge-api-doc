"use client"

import Logo from "@/components/header/logo"
import PageWidth from "@/components/page-width"
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
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

const clients: { title: string; href: string; description: string }[] = [
    { title: "Python", href: "/clients/python", description: "Client en Python" },
    { title: "Typescript", href: "/clients/typescript", description: "Client en Typescript" },
    { title: "Javascript", href: "/clients/javascript", description: "Client en Javascript" },
    { title: "PHP", href: "/clients/php", description: "Client en PHP" },
    { title: "C++", href: "/clients/cpp", description: "Client en C++" },
]

export default function Header() {
    const pathname = usePathname()

    return (
        <header className="bg-white fixed top-0 left-0 right-0 px-3 border-b pt-[2px] flex flex-row items-stretch z-50">
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
                                <ul className="grid w-[300px] gap-3 p-3 md:w-[400px] md:grid-cols-2 lg:w-[500px] ">
                                    {clients.map((client) => (
                                        <ListItem
                                            key={client.title}
                                            title={client.title}
                                            href={client.href}
                                        >
                                            {client.description}
                                        </ListItem>
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
                                <div>Documentació</div>
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
                                <div>Prova la API</div>
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuList>
                </NavigationMenu>
            </PageWidth>
        </header>
    )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className,
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </a>
                </NavigationMenuLink>
            </li>
        )
    },
)
ListItem.displayName = "ListItem"
