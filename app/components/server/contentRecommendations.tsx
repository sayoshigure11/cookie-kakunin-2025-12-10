import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export default async function ContentRecommendations() {
  const raw = (await cookies()).get("prefs")?.value;
  let prefs = null;
  try {
    prefs = raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error(e);
  }

  const uidRaw = (await cookies()).get("uid")?.value;
  let uid = null;
  try {
    uid = uidRaw ? JSON.parse(uidRaw) : null;
  } catch (e) {
    console.error(e);
    uid = null;
  }

  // 簡易: 最近 50 件の view を取り出しカテゴリを集計
  const events = uid
    ? await prisma.track.findMany({
        where: { uid },
        orderBy: { createdAt: "desc" },
        take: 50,
      })
    : [];

  const scores = new Map<string, number>();
  events.forEach((e, index) => {
    const payload: any = e.payload ?? {};
    const cat = payload.category ?? "general";
    const w = Math.pow(0.9, index);
    scores.set(cat, (scores.get(cat) || 0) + w);
  });

  const top =
    prefs?.category ||
    Array.from(scores.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "general";
  const recs = await prisma.content.findMany({
    where: {
      category: top,
    },
    take: 10,
  });

  return (
    <section>
      <h2>おすすめ：{top}</h2>
      <ul>
        {recs.map((r) => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    </section>
  );
}
