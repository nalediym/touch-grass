"use client";

import { motion } from "framer-motion";
import type { LogResult } from "@/lib/types";

const PARTICLE_COLORS = [
  "#4ade80",
  "#22c55e",
  "#facc15",
  "#fb923c",
  "#86efac",
  "#a3e635",
];

export function Celebration({ data }: { data: LogResult }) {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    angle: (i / 24) * 360,
    distance: 80 + Math.random() * 120,
    size: 6 + Math.random() * 10,
    color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
    delay: Math.random() * 0.2,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
    >
      {/* Screen flash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0] }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-primary"
      />

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [0, 1.2, 0],
            x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 1.2, delay: p.delay, ease: "easeOut" }}
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            position: "absolute",
          }}
        />
      ))}

      {/* Points text */}
      <motion.div
        initial={{ scale: 0, y: 0 }}
        animate={{ scale: [0, 1.6, 1], y: -50 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-5xl font-black text-primary drop-shadow-lg"
      >
        +{data.pointsEarned}
      </motion.div>

      {/* Level up announcement */}
      {data.leveledUp && (
        <motion.div
          initial={{ scale: 0, y: 30, opacity: 0 }}
          animate={{ scale: [0, 1.3, 1], y: 30, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="absolute text-center"
        >
          <p className="text-3xl font-black">LEVEL UP!</p>
          <p className="text-xl mt-1">
            {data.newLevel.emoji} {data.newLevel.name}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
