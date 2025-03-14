import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function Logo({ className }: { className?: string }) {
    return (
        <Link
            href="/"
            className={cn(
                "flex flex-row gap-2 items-center mr-8",
                "h-[var(--topbar-height)]",
                className,
            )}
        >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                <Image src="/jutge-logo.svg" width={64} height={64} alt="" priority />
            </div>
            <h1 className="text-4xl">API</h1>
        </Link>
    )
}
