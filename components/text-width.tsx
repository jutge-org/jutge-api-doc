import { cn } from "@/lib/utils"

type Props = Readonly<{
    children: React.ReactNode
    className?: string
}>
export default function TextWidth({ className, children }: Props) {
    return (
        <div
            className={cn(
                "w-full max-w-[20em] md:max-w-[30em] lg:min-w-[35em] xl:min-w-[40em] 2xl:min-w-[45em]",
                className,
            )}
        >
            {children}
        </div>
    )
}
