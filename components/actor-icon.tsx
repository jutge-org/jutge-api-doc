import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { GraduationCap, Shield, Swords, User } from "lucide-react"

const ICON_SIZE = 18

export default function ActorIcon({
    className,
    actor,
    domains,
}: {
    className?: string
    actor?: string
    domains?: string[]
}) {
    let icon, icon_tooltip
    if (actor === "anyActor") {
        icon = undefined
        icon_tooltip = ""
    } else if (actor === "userActor") {
        icon = <User size={ICON_SIZE} className="text-gray-400" />
        icon_tooltip = "User credentials required"
    } else if (actor === "instructorActor") {
        icon = <GraduationCap size={ICON_SIZE} className="text-gray-400" />
        icon_tooltip = "Instructor credentials required"
    } else if (actor === "competitionsActor") {
        icon = <Swords size={ICON_SIZE} className="text-gray-400" />
        icon_tooltip = "Competition credentials required"
    } else if (actor === "adminActor") {
        icon = <Shield size={ICON_SIZE} className="text-gray-400" />
        icon_tooltip = "Admin credentials required"
    }

    let exam_contest, exam_contest_tooltip
    if (domains?.includes("exam") && domains?.includes("contest")) {
        exam_contest = (
            <div className="py-0 px-1.5 m-0 text-[10px] leading-normal bg-foreground/15 text-background rounded-full">
                exam
                <span className="w-px border-l border-background mx-1"></span>
                contest
            </div>
        )
        exam_contest_tooltip = "Available in exam or contest mode"
    }

    let jutge, jutge_tooltip
    if (domains?.includes("jutge")) {
        jutge = (
            <div className="py-0 px-1.5 m-0 text-[10px] leading-normal bg-foreground/15 text-background rounded-full">
                jutge
            </div>
        )
        jutge_tooltip = "Available in normal mode"
    }

    return (
        <div className={cn(className, "m-0 p-0 flex flex-row gap-1 flex-1")}>
            {icon && (
                <Tooltip>
                    <TooltipTrigger className="h-6">{icon}</TooltipTrigger>
                    {icon_tooltip && <TooltipContent>{icon_tooltip}</TooltipContent>}
                </Tooltip>
            )}
            <div className="flex-1"></div>
            {jutge && (
                <Tooltip>
                    <TooltipTrigger className="h-6">{jutge}</TooltipTrigger>
                    {jutge_tooltip && (
                        <TooltipContent>{jutge_tooltip}</TooltipContent>
                    )}
                </Tooltip>
            )}
            {exam_contest && (
                <Tooltip>
                    <TooltipTrigger className="h-6">{exam_contest}</TooltipTrigger>
                    {exam_contest_tooltip && (
                        <TooltipContent>{exam_contest_tooltip}</TooltipContent>
                    )}
                </Tooltip>
            )}
        </div>
    )
}
