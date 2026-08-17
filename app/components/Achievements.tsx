"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Award, CheckCircle, Lock, Trophy, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

const DEFAULT_BADGES: Badge[] = [
  {
    id: "explore",
    name: "Curious Explorer",
    description: "Visited all folder sections",
    icon: "🧭",
    unlocked: false
  },
  {
    id: "tape",
    name: "Prank Master",
    description: "Detached the scotched cover photo",
    icon: "🤡",
    unlocked: false
  },
  {
    id: "terminal",
    name: "CLI Hackerman",
    description: "Ran a command in the CLI terminal",
    icon: "💻",
    unlocked: false
  },
  {
    id: "ai",
    name: "Synergy Finder",
    description: "Initiated a chat with the AI Agent",
    icon: "🤖",
    unlocked: false
  },
  {
    id: "contact",
    name: "Networking Pro",
    description: "Submitted the email contact form",
    icon: "✉️",
    unlocked: false
  }
];

// Helper to trigger confetti
export const triggerConfetti = () => {
  confetti({
    particleCount: 80,
    spread: 60,
    origin: { y: 0.8 },
    colors: ["#3b82f6", "#10b981", "#f59e0b", "#6366f1"]
  });
};

const Achievements: React.FC = () => {
  const [badges, setBadges] = useState<Badge[]>(DEFAULT_BADGES);
  const [notification, setNotification] = useState<Badge | null>(null);

  useEffect(() => {
    // Load badges status
    const loadBadges = () => {
      const stored = localStorage.getItem("portfolio_badges");
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Record<string, boolean>;
          setBadges((prev) =>
            prev.map((b) => ({ ...b, unlocked: !!parsed[b.id] }))
          );
        } catch (e) {
          console.error(e);
        }
      }
    };

    loadBadges();

    // Custom event listener for badge unlocks
    const handleUnlockEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ badgeId: string }>;
      const badgeId = customEvent.detail.badgeId;
      
      setBadges((prev) => {
        const item = prev.find((b) => b.id === badgeId);
        if (item && !item.unlocked) {
          // Play confetti
          triggerConfetti();

          // Trigger notification
          const unlockedItem = { ...item, unlocked: true };
          setNotification(unlockedItem);
          setTimeout(() => setNotification(null), 4000);

          // Save state
          const stored = localStorage.getItem("portfolio_badges");
          const parsed = stored ? JSON.parse(stored) : {};
          parsed[badgeId] = true;
          localStorage.setItem("portfolio_badges", JSON.stringify(parsed));

          return prev.map((b) => (b.id === badgeId ? unlockedItem : b));
        }
        return prev;
      });
    };

    window.addEventListener("unlock_badge", handleUnlockEvent);
    return () => window.removeEventListener("unlock_badge", handleUnlockEvent);
  }, []);

  return (
    <div className="w-full">
      {/* Toast Notification Container */}
      <div className="fixed bottom-24 left-6 z-[99999] pointer-events-none">
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, x: -100, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              className="pointer-events-auto bg-stone-900/95 dark:bg-stone-950/95 border border-amber-500/30 text-white rounded-2xl p-4 shadow-2xl flex items-center gap-3.5 max-w-sm"
            >
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-2xl flex-shrink-0 border border-amber-500/25">
                {notification.icon}
              </div>
              <div>
                <h5 className="text-amber-400 text-xs font-black uppercase tracking-wider flex items-center gap-1">
                  <Trophy size={12} /> Achievement Unlocked!
                </h5>
                <h4 className="text-sm font-bold mt-0.5">{notification.name}</h4>
                <p className="text-[10px] text-stone-400 mt-0.5">{notification.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Badges Grid View for about/skills sections */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-300 ${
              badge.unlocked
                ? "bg-amber-500/5 border-amber-500/30 dark:border-amber-400/20 shadow-md"
                : "bg-stone-50 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 opacity-60"
            }`}
          >
            {badge.unlocked && (
              <span className="absolute top-1.5 right-1.5 text-amber-500 dark:text-amber-400">
                <Sparkles size={11} className="animate-pulse" />
              </span>
            )}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xl mb-1.5 ${
                badge.unlocked
                  ? "bg-amber-500/10 border border-amber-500/20"
                  : "bg-stone-200/50 dark:bg-stone-800/50"
              }`}
            >
              {badge.unlocked ? badge.icon : <Lock size={15} className="text-stone-400" />}
            </div>
            <h5 className="text-[11px] font-bold text-stone-800 dark:text-stone-200 text-center line-clamp-1">
              {badge.name}
            </h5>
            <p className="text-[9px] text-stone-500 dark:text-stone-400 text-center leading-tight mt-0.5 line-clamp-2">
              {badge.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
