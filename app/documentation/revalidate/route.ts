import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
    revalidatePath("/documentation")
    return NextResponse.json({ success: true })
}