// app/page.tsx

import PreferenceForm from "./components/client/preferenceForm";
import TrackEvent from "./components/client/trackEvent";
import ContentRecommendations from "./components/server/contentRecommendations";

export default function Page() {
  return (
    <>
      <h1>匿名パーソナライズ サンプル</h1>
      <PreferenceForm />
      <ContentRecommendations />
      {/* 表示のトラック例 */}
      <TrackEvent
        event={{ type: "view", payload: { category: "general", page: "home" } }}
      />
    </>
  );
}
