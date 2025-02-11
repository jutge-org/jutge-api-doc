"use client"

import { useEffect, useState } from "react"
import type { BundledLanguage } from "shiki"
import { codeToHtml } from "shiki"
import { useTheme } from "./theme/hook"

interface Props {
    children: string
    lang: BundledLanguage
}

export function CodeBlock(props: Props) {
    const { mode } = useTheme()

    const [html, setHtml] = useState<string | null>(null)

    const highlightCode = async () =>
        codeToHtml(props.children, {
            lang: props.lang,
            theme: mode === "dark" ? "slack-dark" : "one-light",
        })

    useEffect(() => {
        highlightCode().then(setHtml)
    })

    return (
        <div
            className="code-block max-h-[25em] overflow-y-scroll"
            dangerouslySetInnerHTML={{ __html: html ?? "" }}
        />
    )
}
