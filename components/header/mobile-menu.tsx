"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { MenuIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Button } from "../ui/button"
import { menuOptions } from "./header"

export default function MobileMenu({ className }: { className?: string }) {
    const [open, setOpen] = useState(false)
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
                    <SheetHeader>
                        <SheetTitle className="text-center">Jutge.org API</SheetTitle>
                        <SheetDescription className="pb-24">
                            <Button
                                variant="link"
                                onClick={() => setOpen(false)}
                                className="w-full"
                            >
                                <Link href="/">Home</Link>
                            </Button>
                            {menuOptions.map((option) => (
                                <Button
                                    variant="link"
                                    key={option.path}
                                    className="w-full"
                                    onClick={() => setOpen(false)}
                                >
                                    <Link href={option.path}>{option.name}</Link>
                                </Button>
                            ))}
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}
