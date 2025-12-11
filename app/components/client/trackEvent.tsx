"use client";

import { useEffect } from "react";

export default function TrackEvent({ event }: { event: any }) {
  useEffect(() => {
    const payload = JSON.stringify(event);
    if (!navigator.sendBeacon) {
      fetch("/api/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      });
    } else {
      navigator.sendBeacon("/api/track", payload);
    }
  }, [event]);
  return null;
}
