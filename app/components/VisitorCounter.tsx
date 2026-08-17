"use client";

import React, { useEffect, useState } from "react";
import { Eye, Users } from "lucide-react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const VisitorCounter: React.FC = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const countMotion = useMotionValue(0);
  const rounded = useTransform(countMotion, (latest) => Math.round(latest));

  useEffect(() => {
    // Generate a reasonable base count or increment
    const storedCount = localStorage.getItem("portfolio_visits");
    let currentVisits = 1420;

    if (storedCount) {
      currentVisits = parseInt(storedCount, 10) + 1;
    } else {
      currentVisits = Math.floor(Math.random() * 200) + 1200;
    }

    localStorage.setItem("portfolio_visits", currentVisits.toString());
    setVisitorCount(currentVisits);

    // Animate counter from 0 to current visits
    const controls = animate(countMotion, currentVisits, {
      duration: 2,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [countMotion]);

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-white/60 dark:bg-stone-900/40 backdrop-blur-md rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs max-w-[200px]">
      <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
        <Users size={16} />
      </div>
      <div>
        <p className="text-[10px] text-stone-400 dark:text-stone-500 font-medium uppercase tracking-wider">
          Profile Visits
        </p>
        <div className="flex items-baseline gap-1 mt-0.5">
          <motion.span className="text-sm font-black text-stone-850 dark:text-white">
            {rounded}
          </motion.span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;
