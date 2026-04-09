import { isDbConfigured } from "@/lib/db";
import { getCurrentUser, getDashboard, getFeed } from "@/lib/actions";
import { PlayView } from "@/components/play-view";
import { Onboarding } from "@/components/onboarding";
import { Card } from "@/components/ui/card";

export const metadata = {
  title: "Play | Touch Grass",
};

export default async function PlayPage() {
  if (!isDbConfigured()) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <Card className="max-w-md p-8 text-center">
          <p className="text-5xl mb-4">🔧</p>
          <h1 className="text-2xl font-bold mb-2">Almost there!</h1>
          <p className="text-muted-foreground">
            Connect a Neon Postgres database to get started. Add it via the
            Vercel Marketplace and redeploy.
          </p>
        </Card>
      </div>
    );
  }

  const user = await getCurrentUser();

  if (!user) {
    return <Onboarding />;
  }

  const [dashboard, feed] = await Promise.all([getDashboard(), getFeed()]);

  if (!dashboard) {
    return <Onboarding />;
  }

  return <PlayView dashboard={dashboard} feed={feed} />;
}
