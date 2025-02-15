"use server"

import { readdir, readFile } from "fs/promises"

export async function loadCode(filename: string) {
    const codefile = await readFile(`./public/code/${filename}`, "utf-8")
    return codefile.toString()
}

export async function loadAllSamples() {
    const samples: Record<string, string> = {}
    for (const ent of await readdir("./public/code", { withFileTypes: true })) {
        if ((ent.isFile() && ent.name.endsWith(".py")) || ent.name.endsWith(".ts")) {
            samples[ent.name] = await loadCode(ent.name)
        }
    }
    return samples
}
