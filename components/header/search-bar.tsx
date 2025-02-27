import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

export default function SearchBar({ className }: { className?: string }) {
    return (
        <div className={cn("flex flex-col justify-center", className)}>
            <Input className="w-[20em]" placeholder="Search..." />
        </div>
    )
}
