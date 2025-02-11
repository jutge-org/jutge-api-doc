"use client"

import { useEffect, useState } from "react"
import type { BundledLanguage } from "shiki"
import { codeToHtml } from "shiki"
import { useTheme } from "./theme/hook"

interface Props {
    children: string
    lang: BundledLanguage
}

export function CodeBlock({ children, lang }: Props) {
    const { mode } = useTheme()

    const [html, setHtml] = useState<string | null>(null)

    useEffect(() => {
        codeToHtml(children, {
            lang: lang,
            theme: mode === "dark" ? "slack-dark" : "one-light",
        }).then(setHtml)
    }, [lang, children, mode])

    return (
        <div
            className="code-block max-h-[25em] overflow-y-scroll"
            dangerouslySetInnerHTML={{ __html: html ?? "" }}
        />
    )
}
