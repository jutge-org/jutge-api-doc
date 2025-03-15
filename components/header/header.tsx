"use client"

import Logo from "@/components/header/logo"
import PageWidth from "@/components/page-width"
import ThemeSwitcher from "@/components/theme/theme-switcher"
import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

import type { ApiDir } from "@/lib/api/types"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { Button } from "../ui/button"
import MobileMenu from "./mobile-menu"
import SearchBar from "./search-bar"

export const clients: { title: string; id: string; description: string }[] = [
    { title: "Python", id: "python", description: "Python client" },
    { title: "TypeScript", id: "typescript", description: "TypeScript client" },
    { title: "JavaScript", id: "javascript", description: "JavaScript client" },
    { title: "PHP", id: "php", description: "PHP client" },
    { title: "C++", id: "cpp", description: "C++ client" },
]

export const menuOptions: { path: string; name: string }[] = [
    { path: "/clients", name: "Clients" },
    { path: "/documentation", name: "Documentation" },
    { path: "/playground", name: "Playground" },
    { path: "/cmdline", name: "CLI" },
    { path: "/faqs", name: "FAQs" },
    { path: "/about", name: "About" },
]

export default function Header({ directory }: { directory: ApiDir }) {
    const pathname = usePathname()

    const _MenuOption = ({ path, name }: { path: string; name: string }) => {
        return (
            <Link
                href={path}
                tabIndex={-1}
                className={cn(
                    "h-[var(--topbar-height)]",
                    "border-b-[2px] border-b-transparent flex items-center",
                    pathname.startsWith(path) && "border-b-primary",
                )}
                
            >
                <NavigationMenuLink asChild>
                    <Button variant="ghost" className="no-underline">
                        {name}
                    </Button>
                </NavigationMenuLink>
            </Link>
        )
    }

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 pt-0.5 md:px-3 bg-background",
                    "flex flex-row items-end z-50 border-b border-muted",
                )}
            >
                <PageWidth className="px-3 flex flex-row items-stretch gap-2">
                    <Logo />
                    <NavigationMenu className="hidden lg:block">
                        <NavigationMenuList>
                            {menuOptions.map((option) => (
                                <_MenuOption key={option.path} {...option} />
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="flex-1" />
                    <SearchBar directory={directory} className="pb-[2px]" />
                    <ThemeSwitcher />
                </PageWidth>
            </header>
            <MobileMenu className="lg:hidden" />
        </>
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
                            className,
                        )}
                        {...props}
                    >
                        <div className="flex flex-col flex-1">
                            <div className="text-sm font-medium leading-none">
                                {title}
                            </div>
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
