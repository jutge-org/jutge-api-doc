import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { GraduationCap, Shield, Swords, User } from "lucide-react"
import { Badge } from "./ui/badge"

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
        icon = <></>
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
            <Badge
                variant="default"
                className="-pt-4 py-0 px-1 leading-3.5 opacity-40 flex flex-row items-stretch"
            >
                exams
                <span className="h-3.5 mx-1 w-[1px] border-l border-background/50"></span>
                contests
            </Badge>
        )
        exam_contest_tooltip = "Available in exam or contest mode"
    }

    let jutge, jutge_tooltip
    if (!domains?.includes("jutge")) {
        jutge = (
            <Badge variant="default" className="py-0 px-1 leading-3.5 line-through">
                jutge
            </Badge>
        )
        jutge_tooltip = "Not available in normal mode"
    }

    return (
        <div
            className={cn(
                className,
                "absolute pl-3 -top-0.5 m-0 flex flex-row gap-1.5 items-start",
            )}
        >
            <Tooltip>
                <TooltipTrigger className="h-6 relative leading-0">{icon}</TooltipTrigger>
                {icon_tooltip && <TooltipContent>{icon_tooltip}</TooltipContent>}
            </Tooltip>
            <Tooltip>
                <TooltipTrigger className="h-6 relative leading-0">{jutge}</TooltipTrigger>
                {jutge_tooltip && <TooltipContent>{jutge_tooltip}</TooltipContent>}
            </Tooltip>
            <Tooltip>
                <TooltipTrigger className="h-6 relative leading-0">{exam_contest}</TooltipTrigger>
                {exam_contest_tooltip && <TooltipContent>{exam_contest_tooltip}</TooltipContent>}
            </Tooltip>
        </div>
    )
}
