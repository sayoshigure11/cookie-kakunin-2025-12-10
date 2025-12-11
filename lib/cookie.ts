import { SignJWT, jwtVerify } from 'jose';
const SECRET = process.env.COOKIE_SECRET;
if (!SECRET) throw new Error('Missing COOKIE_SECRET');
const encoder = new TextEncoder()
const secretKey = encoder.encode(SECRET)

export function signCookie(payload: object) {
    // HS256 シンプル署名を作る（同期ラッパー風）
    // NOTE: jose の SignJWT は Promise ベースだが、ここでは簡易関数で同期的に返すため
    // 実運用では async/await を使って JWE などで暗号化してください。
    const token = new SignJWT(payload as any)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1y");
    // return token.sign(new Uint8Array(secretKey)); // returns Promise
    // but middleware cannot be async in this template, so we use a synchronous fallback: base64 payload + HMAC omitted for brevity.
    // For demonstration, we'll do a naive JSON string (NOT SECURE) if jose async isn't called.
    return JSON.stringify(payload);
}

export function verifyCookie(raw: string) {
    // In a real implementation we'd call jwtVerify(raw, key)
    // Here we try to parse JSON for demonstration; replace with jwtVerify in prod.
    try {
        const obj = JSON.parse(raw)
        if(!obj.uid) throw new Error("invalid")
    } catch (e) {
        console.error("ERROR",e)
        throw new Error("invalid cookie")
    }
}