import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { GraduationCap, Shield, User } from 'lucide-react'


export default function ActorIcon({ actor, className }: { actor?: string, className?: string }) {
    let icon, text
    if (actor === 'anyActor') {
        icon = <User size={15} className="text-gray-400" />
        text = 'With and without credentials'
    } else if (actor === 'userActor') {
        icon = <User size={15} className="text-gray-400" />
        text = 'user credentials required'
    } else if (actor === 'instructorActor') {
        icon = <GraduationCap size={15} className="text-gray-400" />
        text = 'instructor credentials required'
    } else if (actor === 'adminActor') {
        icon = <Shield size={15} className="text-gray-400" />
        text = 'admin credentials required'
    } else {
        return <></>
    }

    return (
        <Tooltip>
            <TooltipTrigger className={className}>{icon}</TooltipTrigger>
            <TooltipContent>{text}</TooltipContent>
        </Tooltip>
    )
}
