import { useEffect, useState } from "react"

type Platform = "linux" | "mac" | "windows" | "<unknown>"

export const usePlatform = (): Platform => {
    const [platform, setPlatform] = useState<Platform>("<unknown>")

    useEffect(() => {
        const platform = (navigator.platform || "").toLowerCase()
        const userAgent = (navigator.userAgent || "").toLowerCase()

        const _isPlatform = (x: string) => platform.includes(x) || userAgent.includes(x)

        if (_isPlatform("win")) {
            setPlatform("windows")
        } else if (_isPlatform("mac")) {
            setPlatform("mac")
        } else if (_isPlatform("linux")) {
            setPlatform("mac")
        }
    }, [])

    useEffect(() => {
        console.log("usePlatform:", platform);
    }, [platform])

    return platform
}
