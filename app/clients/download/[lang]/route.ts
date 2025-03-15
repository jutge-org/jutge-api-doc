import { NextRequest } from "next/server"
import * as child_process from "node:child_process"
import { readFile } from "node:fs/promises"
import { extname, join, resolve } from "node:path"
import { cwd } from "node:process"
import * as util from "node:util"

const exec = util.promisify(child_process.exec)

type Language = "cpp" | "java" | "javascript" | "php" | "python" | "typescript"

const generateClient = async (lang: Language): Promise<string | null> => {
    const { JUTGE_API_CLIENTS_DIR } = process.env
    if (!JUTGE_API_CLIENTS_DIR) {
        console.warn(`JUTGE_API_CLIENTS_DIR is not set. Generating clients will not work.`)
        return null
    }
    const currDir = cwd()
    const generatedClientsDir = resolve(join(currDir, "generated-clients"))
    const result = await exec(
        `/usr/bin/env bun ${JUTGE_API_CLIENTS_DIR}/src/cli.ts -d ${generatedClientsDir} ${lang}`,
        { cwd: JUTGE_API_CLIENTS_DIR }
    )
    if (result.stderr) {
        console.error(result.stderr)
        return null
    }
    const filename = result.stdout.trim()
    return filename
}

const extension2mime: Record<string, string> = {
    ".py": "text/x-python",
    ".js": "text/javascript",
    ".ts": "text/typescript",
    ".jar": "application/java-archive",
    ".php": "application/x-httpd-php",
    ".cpp": "text/x-c++src",
}

type GETParams = {
    params: Promise<{ lang: Language }>
}
export async function GET(_req: NextRequest, { params }: GETParams) {
    const { lang } = await params

    const filename = await generateClient(lang)
    if (filename === null) {
        return new Response("Error generating client", { status: 500 })
    }

    const extension = extname(filename)
    const blob = await readFile(filename)
    return new Response(blob, {
        headers: {
            "Content-Type": extension2mime[extension] || "application/octet-stream",
            "Content-Disposition": `attachment; filename=${filename}`,
        },
    })
}
