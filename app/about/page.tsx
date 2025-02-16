import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { GithubIcon, GripIcon } from "lucide-react"

interface ProfileCardProps {
    name: string
    university: string
    githubUrl: string
    imageUrl: string
    fallback: string
}

function ProfileCard({ name, university, githubUrl, imageUrl, fallback }: ProfileCardProps) {
    return (
        <Card className="w-full">
            <CardContent className="px-4 pt-4 flex flex-row space-x-4">
                <Avatar className="AvatarRoot">
                    <AvatarImage src={imageUrl} className="AvatarImage rounded-md" width={96} />
                    <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <p className="font-bold pb-2 hover:text-chart-1">{name}</p>
                    <p>
                        <a href="https://upc.edu" className="flex flex-row items-center gap-2">
                            <GripIcon size={16} /> {university}
                        </a>
                    </p>
                    <p>
                        <a href={githubUrl} className="flex flex-row items-center gap-2">
                            <GithubIcon size={16} /> GitHub
                        </a>
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

export default function AboutPage() {
    return (
        <div className="mt-8 mx-32">
            <h1 className="">Credits</h1>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfileCard
                    name="Pau Fernández"
                    university="Universitat Politècnica de Catalunya"
                    githubUrl="https://github.com/pauek/"
                    imageUrl="/pauek.png"
                    fallback="PF"
                />
                <ProfileCard
                    name="Jordi Petit"
                    university="Universitat Politècnica de Catalunya"
                    githubUrl="https://github.com/jordi-petit/"
                    imageUrl="/jpetit.png"
                    fallback="JP"
                />
            </div>
        </div>
    )
}
