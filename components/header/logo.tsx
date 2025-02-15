import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function Logo({ className }: { className?: string }) {
    return (
        <Link href="/" className={cn("flex flex-row gap-2 items-center mr-8", className)}>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Image src="/jutge.png" width={64} height={64} alt="" />
            </div>
            <h1 className="text-2xl">API</h1>
        </Link>
    )
}
