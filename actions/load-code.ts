"use server"

import { readFile } from "fs/promises"

export async function loadCode(filename: string) {
    const codefile = await readFile(`./public/code/${filename}`, "utf-8")
    return codefile.toString()
}
