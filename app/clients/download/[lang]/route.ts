import env from "@/lib/env"
import { NextRequest } from "next/server"
import * as child_process from "node:child_process"
import { readFile } from "node:fs/promises"
import { basename, extname, join, resolve } from "node:path"
import { cwd } from "node:process"
import * as util from "node:util"

const exec = util.promisify(child_process.exec)

type Language = "cpp" | "java" | "javascript" | "php" | "python" | "typescript"
const allLanguages = ["cpp", "java", "javascript", "php", "python", "typescript"]

const lang2extension: Record<Language, string> = {
    cpp: ".cpp",
    javascript: ".js",
    typescript: ".ts",
    php: ".php",
    python: ".py",
    java: ".jar", // FIXME(pauek): The .jar file has another name!
}

const extension2mime: Record<string, string> = {
    ".py": "text/x-python",
    ".js": "text/javascript",
    ".ts": "text/typescript",
    ".jar": "application/java-archive",
    ".php": "application/x-httpd-php",
    ".cpp": "text/x-c++src",
}

const checkLanguage = (slang: string): Language => {
    if (allLanguages.includes(slang)) {
        return slang as Language
    }
    throw new Error(`Language '${slang}' not known!`)
}

const generateClient = async (lang: Language): Promise<string | null> => {
    try {
        const currDir = cwd()
        const generatedClientsDir = resolve(join(currDir, "generated-clients"))
        const result = await exec(
            `bun run ${env.JUTGE_API_CLIENTS_DIR}/src/index.ts -o ${generatedClientsDir} ${lang}`,
        )
        if (result.stderr) {
            console.error(result.stderr)
        }
        return join(generatedClientsDir, `jutge_api_client${lang2extension[lang]}`)
        //
    } catch (e) {
        console.error(e)
        return null
    }
}

type GETParams = {
    params: Promise<{ lang: string }>
}
export async function GET(_req: NextRequest, { params }: GETParams) {
    const { lang } = await params

    const language = checkLanguage(lang)
    const absolutePath = await generateClient(language)
    if (absolutePath === null) {
        return new Response("Error generating client", { status: 500 })
    }

    const extension = extname(absolutePath)
    const filename = basename(absolutePath)
    const blob = await readFile(absolutePath)

    return new Response(blob, {
        headers: {
            "Content-Type": extension2mime[extension] || "application/octet-stream",
            "Content-Disposition": `attachment; filename=${filename}`,
        },
    })
}
