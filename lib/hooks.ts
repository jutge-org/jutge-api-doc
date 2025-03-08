import { useEffect, useState } from "react"

type Platform = "linux" | "mac" | "windows" | "<unknown>"

export const usePlatform = (): [Platform, boolean] => {
    const [platform, setPlatform] = useState<Platform>("<unknown>")
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const platform = (navigator.platform || "").toLowerCase()
        const userAgent = (navigator.userAgent || "").toLowerCase()

        const _isPlatform = (x: string) => platform.includes(x) || userAgent.includes(x)

        if (_isPlatform("win")) {
            setPlatform("windows")
        } else if (_isPlatform("mac")) {
            setPlatform("mac")
        } else if (_isPlatform("linux")) {
            setPlatform("linux")
        }

        const isMobile = /android.+mobile|ip(hone|[oa]d)/i.test(userAgent);
        setIsMobile(isMobile);
    }, [])

    return [platform, isMobile];
}
