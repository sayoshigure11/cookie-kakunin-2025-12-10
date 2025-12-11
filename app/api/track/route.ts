import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const body = await req.json() // {type: "view", payload: {...}}
        const raw = (await cookies()).get("uid")?.value
        let uid = "anonymous"
        try {
            uid = raw ? JSON.parse(raw).uid : "anonymous"
        } catch (e) {
            console.error(e)
        }
        //保存
        await prisma.track.create({
            data: {
                uid,
                eventType: body.type ?? "event",
                payload: body.payload ?? body,
                createdAt: new Date()
            }
        })

        return NextResponse.json({ok: true})
    } catch (error) {
        console.error("保存に失敗しました[api/track]", error)
        return NextResponse.json({
            ok: false,
            error: (error as Error).message
        })
    }
}