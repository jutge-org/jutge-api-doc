"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { MenuIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "../ui/button"
import { clients, menuOptions } from "./header"

export default function MobileMenu({ className }: { className?: string }) {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const go = (href: string) => () => {
        setOpen(false)
        router.push(href)
    }

    return (
        <div className={cn(className, "z-50")}>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <div
                        className={cn(
                            "fixed bottom-6 right-6 w-14 h-14",
                            "bg-accent rounded-full",
                            "shadow-lg grid items-center justify-center",
                        )}
                    >
                        <MenuIcon size={28} className="text-white" />
                    </div>
                </SheetTrigger>
                <SheetContent side="bottom" className="max-w-[30em] mx-auto">
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
