import { cookies } from "next/headers"

export async function POST(req: Request) {
    const body = await req.json() // {type: "view", payload: {...}}
    const uid = (await cookies()).get("uid")?.value || "anonymous"

    //保存
    
}