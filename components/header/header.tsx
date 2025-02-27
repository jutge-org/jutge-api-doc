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
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import SearchBar from "./search-bar"

const clients: { title: string; id: string; description: string }[] = [
    { title: "Python", id: "python", description: "Python client" },
    { title: "TypeScript", id: "typescript", description: "TypeScript client" },
    { title: "JavaScript", id: "javascript", description: "JavaScript client" },
    { title: "PHP", id: "php", description: "PHP client" },
    { title: "C++", id: "cpp", description: "C++ client" },
]

export default function Header() {
    const pathname = usePathname()

    const _MenuOption = ({ path, name }: { path: string; name: string }) => {
        return (
            <Link
                href={path}
                className={cn(
                    "border-b-2 border-b-transparent h-[var(--topbar-height)] flex items-center",
                    pathname.startsWith(path) && "border-b-primary",
                )}
            >
                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                    <div>{name}</div>
                </NavigationMenuLink>
            </Link>
        )
    }

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 md:px-3 mb-8",
                "flex flex-row items-stretch z-50 border-b border-muted bg-background",
            )}
        >
            <PageWidth className="px-3 flex flex-row items-stretch gap-2 pt-0.5">
                <Logo />
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem
                            className={cn(
                                "border-b-4 border-b-transparent h-[var(--topbar-height)] flex items-center",
                                pathname.startsWith("/clients") &&
                                    "border-b-black dark:border-b-white",
                            )}
                        >
                            <NavigationMenuTrigger className="mt-0.5">
                                Clients
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="flex flex-col gap-3 p-2 md:grid-cols-1 min-w-[14em]">
                                    {clients.map((client) => (
                                        <ClientItem
                                            key={client.id}
                                            id={client.id}
                                            title={client.title}
                                            href={`/clients/${client.id}`}
                                        ></ClientItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <_MenuOption path="/documentation" name="Documentation" />
                        <_MenuOption path="/playground" name="Playground" />
                        <_MenuOption path="/faqs" name="FAQs" />
                        <_MenuOption path="/about" name="About" />
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex-1" />
                <SearchBar className="hidden lg:flex lg:flex-col lg:justify-center border-b-2 border-transparent" />
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
