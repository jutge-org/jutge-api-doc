import { cn } from "@/lib/utils"

type Props = Readonly<{
    children: React.ReactNode
    className?: string
}>
export default function PageWidth({ className, children }: Props) {
    return (
        <div
            className={cn(
                "w-full md:max-w-[50em] lg:min-w-[60em] xl:min-w-[70em] 2xl:min-w-[80em] mx-auto",
                className,
            )}
        >
            {children}
        </div>
    )
}
