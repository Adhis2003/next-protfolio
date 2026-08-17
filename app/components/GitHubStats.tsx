"use client";

import React, { useState } from "react";
import { GitBranch, GitCommit, GitPullRequest, FolderGit, Star, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

const STATS_CARDS = [
  { label: "Total Commits", value: "1,248+", icon: <GitCommit size={16} />, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
  { label: "Pull Requests", value: "84+", icon: <GitPullRequest size={16} />, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
  { label: "Repositories", value: "28+", icon: <FolderGit size={16} />, color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20" },
  { label: "GitHub Stars", value: "12+", icon: <Star size={16} />, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
];

const GitHubStats: React.FC = () => {
  // Generate mock contribution grid data (53 weeks * 7 days = 371 squares)
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const gridData = Array.from({ length: 120 }, (_, idx) => {
    // Generate distribution: more weight towards lighter greens, occasional dark greens
    const rand = Math.random();
    let level = 0;
    if (rand > 0.85) level = 4;
    else if (rand > 0.65) level = 3;
    else if (rand > 0.45) level = 2;
    else if (rand > 0.2) level = 1;
    
    // Commits count
    const commits = level === 0 ? 0 : Math.floor(Math.random() * level * 3) + 1;
    return { id: idx, level, commits };
  });

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return "bg-emerald-500/20 dark:bg-emerald-500/10";
      case 2: return "bg-emerald-500/40 dark:bg-emerald-500/30";
      case 3: return "bg-emerald-500/70 dark:bg-emerald-500/50";
      case 4: return "bg-emerald-500 dark:bg-emerald-400";
      default: return "bg-stone-100 dark:bg-stone-850";
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, item: { commits: number }) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.offsetParent?.getBoundingClientRect();
    const x = rect.left - (parentRect?.left || 0) + rect.width / 2;
    const y = rect.top - (parentRect?.top || 0) - 28;
    setTooltip({
      text: `${item.commits} commit${item.commits !== 1 ? "s" : ""} on this day`,
      x,
      y
    });
  };

  return (
    <div className="w-full space-y-4">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS_CARDS.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="p-3 bg-white/60 dark:bg-stone-900/40 backdrop-blur-md rounded-xl border border-stone-200 dark:border-stone-800 flex items-center gap-3 shadow-xs"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${card.color}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-[10px] text-stone-400 dark:text-stone-500 font-medium">
                {card.label}
              </p>
              <h4 className="text-sm font-bold text-stone-800 dark:text-stone-100 mt-0.5">
                {card.value}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contribution Grid Container */}
      <div className="relative p-4 bg-white/60 dark:bg-stone-900/40 backdrop-blur-md rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs">
        <div className="flex items-center justify-between mb-3.5">
          <h4 className="text-xs font-bold text-stone-850 dark:text-stone-100 flex items-center gap-1.5">
            <GitBranch size={14} className="text-emerald-500" />
            Contributions in the Last 4 Months
          </h4>
          <span className="text-[9px] text-stone-400 dark:text-stone-500 font-medium">
            github.com/Adhis2003
          </span>
        </div>

        {/* The Grid */}
        <div className="relative grid grid-flow-col grid-rows-7 gap-1.5 justify-center overflow-x-auto py-1">
          {tooltip && (
            <div
              style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
              className="absolute -translate-x-1/2 pointer-events-none bg-stone-950 dark:bg-stone-800 text-white text-[9px] px-2 py-1 rounded shadow-lg border border-stone-800 dark:border-stone-700 z-50 font-bold whitespace-nowrap"
            >
              {tooltip.text}
            </div>
          )}

          {gridData.map((item) => (
            <div
              key={item.id}
              onMouseEnter={(e) => handleMouseEnter(e, item)}
              onMouseLeave={() => setTooltip(null)}
              className={`w-3.5 h-3.5 rounded-xs transition-colors duration-150 cursor-pointer border border-transparent hover:border-blue-500/45 ${getLevelColor(
                item.level
              )}`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-end items-center gap-1.5 text-[9px] text-stone-400 dark:text-stone-500 mt-3 select-none">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-xs bg-stone-100 dark:bg-stone-850" />
          <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500/20 dark:bg-emerald-500/10" />
          <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500/40 dark:bg-emerald-500/30" />
          <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500/70 dark:bg-emerald-500/50" />
          <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500 dark:bg-emerald-400" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
