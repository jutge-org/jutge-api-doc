import { cn } from "@/lib/utils"

type Props = Readonly<{
    children: React.ReactNode
    className?: string
}>
export default function TextWidth({ className, children }: Props) {
    return (
        <div
            className={cn(
                "w-full max-w-[30em] md:max-w-[30em] lg:max-w-[35em] xl:max-w-[40em] 2xl:max-w-[45em]",
                "px-4 md:px-0 pt-4",
                className,
            )}
        >
            {children}
        </div>
    )
}
