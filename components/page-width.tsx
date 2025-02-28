import { cn } from "@/lib/utils"

type Props = Readonly<{
    children: React.ReactNode
    className?: string
}>
export default function PageWidth({ className, children }: Props) {
    return (
        <div
            className={cn(
                "w-full md:max-w-[50em] lg:max-w-[60em] xl:max-w-[70em] 2xl:max-w-[80em] lg:mx-auto",
                className,
            )}
        >
            {children}
        </div>
    )
}
