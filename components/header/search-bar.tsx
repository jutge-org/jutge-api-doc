import { Input } from "../ui/input";

export default function SearchBar() {
    return (
        <div className="flex flex-col justify-center">
            <Input className="w-[20em]" placeholder="Search..." />
        </div>
    )
}
