import Github from "@/components/icons/Github"
import PageWidth from "@/components/page-width"
import TextWidth from "@/components/text-width"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import Link from "next/link"

export default function AboutPage() {
    return (
        <PageWidth className="pt-6">
            <TextWidth>
                <h1 className="mb-4">About</h1>
                <p>
                    This project is part of the Jutge.org platform, a 20+ years old online judge
                    system with more than 6 million submissions.
                </p>
                <p>
                    This API was developed in the context of the &quot;Galàxia d&apos;Aprenentatge&quot;, a UPC
                    project.
                </p>
                <section>
                    <h2>Credits</h2>
                    <div className="flex flex-col space-y-4 mt-4">
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
                </section>
            </TextWidth>
        </PageWidth>
    )
}

interface ProfileCardProps {
    name: string
    university: string
    githubUrl: string
    imageUrl: string
    fallback: string
}

function ProfileCard({ name, university, githubUrl, imageUrl, fallback }: ProfileCardProps) {
    return (
        <div className="flex flex-row space-x-2 items-center">
            <Avatar className="AvatarRoot">
                <AvatarImage src={imageUrl} className="AvatarImage rounded-full" width={56} />
                <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <h5 className="font-bold p-0 m-0 leading-6">{name}</h5>
                <Link
                    href="https://www.upc.edu"
                    className="flex flex-row items-center gap-2 text-xs no-underline"
                >
                    {university}
                </Link>
                <Link
                    href={githubUrl}
                    className="flex flex-row items-center gap-1.5 text-sm no-underline mt-1"
                >
                    <Github className="w-4 h-4" /> GitHub
                </Link>
            </div>
        </div>
    )
}
