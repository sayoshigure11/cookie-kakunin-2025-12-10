"use client";

import { useState } from "react";

export default function PreferenceForm() {
  const [category, setCategory] = useState("general");

  async function save() {
    await fetch("/api/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category }),
    });
    alert("Saved");
  }

  return (
    <div>
      <label>
        好きなカテゴリ：
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="general">general</option>
          <option value="tech">tech</option>
          <option value="ai">ai</option>
        </select>
      </label>
      <button onClick={save}>保存</button>
    </div>
  );
}
