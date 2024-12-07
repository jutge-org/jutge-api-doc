export async function TextSection({
    icon,
    title,
    content,
}: {
    icon: React.ReactNode
    title: string
    content: React.ReactNode
}) {
    return (
        <div className="bg-zinc-50 p-4 rounded-xl mb-1">
            <div className="flex items-center gap-2 border-b pb-3 text-[1.35em] mb-6">
                {icon}
                <div className="font-bold">{title}</div>
            </div>
            <div className="prose prose-sm max-w-none">{content}</div>
        </div>
    )
}
