import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { signCookie, verifyCookie } from "./lib/cookie";
export default function proxy(req:NextRequest) {
    const raw = req.cookies.get("uid")?.value
    if (!raw) {
        const id = uuid()
        const signed = signCookie({ uid: id })
        const res = NextResponse.next();
        res.cookies.set({
            name: "uid",
            value: signed,
            path: "/",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 365,
        })
        return res
    }
    // optional: verify signature, if invalid => rotate
    try {
        verifyCookie(raw)
    } catch (e) {
        const id = uuid()
        const signed = signCookie({ uid: id })
        const res = NextResponse.next()
        res.cookies.set({
            name: "uid",
            value: signed,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 365
        })
        return res
    }
    return NextResponse.next()
}

export const config = {matcher: "/"}