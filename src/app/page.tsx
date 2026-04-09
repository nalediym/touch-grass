import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LEVELS } from "@/lib/game";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center min-h-[85vh] px-6 text-center relative overflow-hidden">
        {/* Floating decorative emojis */}
        <div className="absolute inset-0 -z-10 select-none" aria-hidden>
          <span
            className="absolute top-[15%] left-[8%] text-6xl opacity-15 animate-bounce"
            style={{ animationDuration: "3s" }}
          >
            🌿
          </span>
          <span
            className="absolute top-[25%] right-[12%] text-5xl opacity-10 animate-bounce"
            style={{ animationDuration: "4s", animationDelay: "1s" }}
          >
            🌳
          </span>
          <span
            className="absolute bottom-[30%] left-[15%] text-4xl opacity-15 animate-bounce"
            style={{ animationDuration: "3.5s", animationDelay: "2s" }}
          >
            🌻
          </span>
          <span
            className="absolute bottom-[20%] right-[8%] text-5xl opacity-10 animate-bounce"
            style={{ animationDuration: "4.5s", animationDelay: "0.5s" }}
          >
            🦋
          </span>
        </div>

        <div className="text-8xl mb-6">🌿</div>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-4">
          Touch Grass
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-lg mb-2">
          The app that rewards you for going outside.
        </p>
        <p className="text-lg text-muted-foreground max-w-md mb-10">
          Build streaks. Earn points. Level up. Join the movement.
        </p>
        <Link href="/play">
          <Button
            size="lg"
            className="text-lg px-10 h-14 rounded-2xl shadow-lg animate-pulse-glow cursor-pointer"
          >
            Start Touching Grass
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 pb-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-3">🔥</div>
              <h3 className="font-semibold text-lg mb-2">Build Streaks</h3>
              <p className="text-sm text-muted-foreground">
                Go outside daily and watch your streak grow. Don&apos;t break
                the chain!
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-3">💎</div>
              <h3 className="font-semibold text-lg mb-2">Earn Points</h3>
              <p className="text-sm text-muted-foreground">
                Every outdoor activity earns points. Walk, hike, garden — it
                all counts.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-semibold text-lg mb-2">Level Up</h3>
              <p className="text-sm text-muted-foreground">
                From {LEVELS[0].emoji} {LEVELS[0].name} to{" "}
                {LEVELS[LEVELS.length - 1].emoji}{" "}
                {LEVELS[LEVELS.length - 1].name}. How far can you go?
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Level Preview */}
      <section className="max-w-4xl mx-auto px-6 pb-16 w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          The Journey Awaits
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {LEVELS.map((lvl) => (
            <div
              key={lvl.level}
              className="flex items-center gap-1.5 bg-card border rounded-full px-3 py-1.5 text-sm"
            >
              <span>{lvl.emoji}</span>
              <span className="font-medium">{lvl.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-muted-foreground border-t">
        Touch Grass — because your screen will be here when you get back 🌱
      </footer>
    </div>
  );
}
