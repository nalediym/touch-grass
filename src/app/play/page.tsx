"use client";

import { useState, useEffect, useCallback } from "react";
import { getStoredUser, getStoredDashboard } from "@/lib/storage";
import { PlayView } from "@/components/play-view";
import { Onboarding } from "@/components/onboarding";

export default function PlayPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">🌿</div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const user = getStoredUser();

  if (!user) {
    return <Onboarding onComplete={refresh} />;
  }

  const dashboard = getStoredDashboard()!;

  return <PlayView key={refreshKey} dashboard={dashboard} onRefresh={refresh} />;
}
