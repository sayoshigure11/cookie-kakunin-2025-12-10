import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(req:Request) {
    try {
        const prefs = await req.json();
        // 少量の設定は Cookie に保存してクライアント側で直接参照できるようにする
        (await cookies()).set({
            name: "prefs",
            value: JSON.stringify(prefs),
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 365
        })

        return NextResponse.json({ok:true})
    } catch (error) {
        console.error("ERROR[api/preferences]", error)
        return NextResponse.json({ok:false})
    }
}