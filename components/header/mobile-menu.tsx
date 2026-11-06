"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { MenuIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { Button } from "../ui/button"
import { clients, menuOptions } from "./header"

export default function MobileMenu({ className }: { className?: string }) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const pendingHref = useRef<string | null>(null)

    const go = (href: string) => () => {
        pendingHref.current = href
        setOpen(false)
    }

    const navigate = (href: string) => {
        router.push(href)
        const [path, hash] = href.split("#")
        if (hash && path === window.location.pathname) {
            document.getElementById(hash)?.scrollIntoView()
        }
    }

    return (
        <div className={cn(className, "z-50")}>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <div
                        className={cn(
                            "fixed bottom-6 right-6 w-14 h-14",
                            "bg-primary rounded-full",
                            "shadow-lg grid items-center justify-center",
                        )}
                    >
                        <MenuIcon size={28} className="text-white" />
                    </div>
                </SheetTrigger>
                <SheetContent
                    side="bottom"
                    className="max-w-[30em] mx-auto"
                    onCloseAutoFocus={(event) => {
                        const href = pendingHref.current
                        if (href) {
                            event.preventDefault()
                            pendingHref.current = null
                            navigate(href)
                        }
                    }}
                >
                    <SheetHeader className="mb-4">
                        <SheetTitle className="text-center">Jutge.org API</SheetTitle>
                    </SheetHeader>
                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="secondary" onClick={go("/")} className="h-16">
                            Home
                        </Button>
                        {menuOptions.map((option) => (
                            <Button
                                variant="secondary"
                                key={option.path}
                                className="h-16"
                                onClick={go(option.path)}
                            >
                                {option.name}
                            </Button>
                        ))}
                    </div>
                    <div className="font-semibold text-lg mt-10 mb-2 text-foreground">Clients</div>
                    <div className="grid grid-cols-3 gap-2">
                        {clients.map((client) => (
                            <Button
                                variant="secondary"
                                key={client.id}
                                className="h-16"
                                onClick={go(`/clients/${client.id}`)}
                            >
                                {client.title}
                            </Button>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
