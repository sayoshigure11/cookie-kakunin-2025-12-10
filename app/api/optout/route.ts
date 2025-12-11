import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const body = await req.json()
    if (body.output) {
        (await cookies()).set({
            name: "consent",
            value: "false",
            maxAge: 60 * 60 * 24 * 365
        })
    }
    return NextResponse.json({ok: true})
}