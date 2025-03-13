"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { searchDirectory } from "@/lib/api/search"
import type { ApiDir, Item } from "@/lib/api/types"
import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"
import { ChangeEventHandler, useEffect, useRef, useState } from "react"
import PlatformCtrlKbd from "../platform-ctrl-kbd"
import { usePlatform } from "@/lib/hooks"

type Props = {
    directory: ApiDir
    className?: string
}
export default function SearchBar({ directory, className }: Props) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [search, setSearch] = useState("")
    const [selected, setSelected] = useState(-1)
    const [results, setResults] = useState<Item[]>([])
    const resultsRef = useRef<HTMLDivElement>(null)
    const [platform] = usePlatform()

    const go = (index: number) => {
        const result = results[index]
        window.location.href = result.url
        setDialogOpen(false)
    }

    const ctrlKPressed = (e: KeyboardEvent) => {
        if (platform === "mac") {
            return e.metaKey && e.key === "k"
        } else if (platform === "windows" || platform === "linux") {
            return e.ctrlKey && e.key === "k"
        }
        return false
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (ctrlKPressed(e)) {
            e.preventDefault()
            e.stopPropagation()
            setDialogOpen(true)
        }
        if (dialogOpen) {
            // Only process these keys if the dialog is open
            if (e.key === "Escape") {
                setDialogOpen(false)
            } else if (e.key === "ArrowDown") {
                setSelected((prev) => (prev + 1 + results.length) % results.length)
            } else if (e.key === "ArrowUp") {
                setSelected((prev) => (prev - 1 + results.length) % results.length)
            } else if (e.key === "PageDown") {
                setSelected((prev) => Math.min(prev + 10, results.length - 1))
            } else if (e.key === "PageUp") {
                setSelected((prev) => Math.max(prev - 10, 0))
            } else if (e.key === "Enter") {
                if (selected >= 0 && selected < results.length) {
                    go(selected)
                }
            }
        }
    }

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSearch(e.target.value)
    }

    const clickOption = (index: number) => () => go(index)

    useEffect(() => {
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    })

    useEffect(() => {
        const results = searchDirectory(directory, search)
        setResults(results)
        setSelected(0)
    }, [search, directory])

    useEffect(() => {
        const resultsDiv = resultsRef.current
        if (resultsDiv && selected >= 0) {
            const selectedDiv = resultsDiv.children[selected] as HTMLElement
            selectedDiv.scrollIntoView({ block: "nearest" })
        }
    }, [selected])

    return (
        <div className={cn("flex flex-row items-center", className)}>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="secondary"
                        className="font-normal cursor-text hidden md:flex flex-row"
                        onClick={() => setDialogOpen(true)}
                    >
                        <SearchIcon className="text-primary mr-1" />
                        <span className="opacity-50">Search docs...</span>
                        <Badge className="ml-1 px-1 py-0.5 bg-accent text-white hover:bg-accent">
                            <PlatformCtrlKbd keyName="K" />
                        </Badge>
                    </Button>
                </DialogTrigger>
                <DialogContent className="w-5/6 mx-auto lg:min-w-[40em] h-[30em] p-0 flex flex-col justify-start gap-0">
                    <DialogTitle className="hidden">Search Documentation</DialogTitle>
                    <Input
                        className="h-12 debug border-none rounded-t-md rounded-b-none shrink-0 pr-12 m-0 mb-[1px]"
                        value={search}
                        onChange={onChange}
                    />
                    <div
                        ref={resultsRef}
                        className="flex-1 flex flex-col overflow-y-scroll gap-1 p-1"
                    >
                        {results.map((result, index) => (
                            <div
                                key={`${result.type}:${result.url}`}
                                className={cn(
                                    "font-mono flex flex-row items-center px-2 py-1.5 pb-1 rounded-sm",
                                    "hover:outline outline-accent outline-offset-1 cursor-pointer",
                                    index === selected &&
                                        "bg-accent text-foreground hover:bg-accent text-white",
                                )}
                                onClick={clickOption(index)}
                            >
                                <span
                                    className={cn(
                                        "text-muted-foreground text-[0.92rem]",
                                        index === selected && "text-muted",
                                    )}
                                >
                                    {result.spath}
                                </span>
                                <span className="font-semibold">{result.name}</span>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
            <Button variant="ghost" onClick={() => setDialogOpen(true)} className="w-10 md:hidden">
                <SearchIcon className="text-primary" />
            </Button>
        </div>
    )
}
