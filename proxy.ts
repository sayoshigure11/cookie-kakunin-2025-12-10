import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
export default function proxy(req:NextRequest) {
    const uid = req.cookies.get("uid")?.value
    if (!uid) {
        const res = NextResponse.next();
        res.cookies.set({
            name: "uid",
            value: uuid(),
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 365,
        })
        return res
    }
    return NextResponse.next()
}

export const config = {matcher: "/"}