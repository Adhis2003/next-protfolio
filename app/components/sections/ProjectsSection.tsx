"use client";

import React, { useState, useEffect } from "react";
import ProjectCard from "../ProjectCard";
import BlogPlaceholder from "../BlogPlaceholder";
import { FolderHeart, Search, Filter, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  category: "mobile" | "web" | "games";
  challenges: string;
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "murmure",
    title: "Wellness Portal",
    description: "A mobile psychology application aimed at self-discovery, breathing exercises, and meditation tracking, supporting user data state sync and customized dashboard chapters.",
    thumbnail: "/projects/murmure-patchwork.jpeg",
    tags: ["React Native", "Expo", "Redux", "Node.js", "Express.js"],
    category: "mobile",
    challenges: "Synchronizing offline audio playback status and local caching during weak cell connectivity.",
    features: ["Interactive breathing mode guides", "Custom chapters and lessons catalog", "Stateful progress tracking across chapters", "Real-time user chat capabilities"],
    liveUrl: "https://murmure.expo.app",
    githubUrl: "https://github.com/Adhis2003/Murmure-Front",
  },
  {
    id: "coins-app",
    title: "Coins Tracker App",
    description: "A high-fidelity cryptocurrency tracker that fetches live price statistics from Delta APIs. Emphasizes repository patterns, structured error state boundaries, and robust caching.",
    thumbnail: "/projects/coin-app-patchwork.jpeg",
    tags: ["React Native", "Expo", "TanStack Query", "TypeScript"],
    category: "mobile",
    challenges: "Optimizing API rate limiting and handling offline state smoothly without screen freeze.",
    features: ["Live price polling intervals", "Detailed interactive asset graphs", "Search and bookmark favorite currencies", "Auto-fallback to cached offline snapshot"],
    githubUrl: "https://github.com/Adhis2003/coins-app",
  },
  {
    id: "retrolove",
    title: "Space Shooter",
    description: "A highly customizable vertical space shooter game engineered with custom logic. Supports game settings edits for corporate events, weddings, or team sessions.",
    thumbnail: "/projects/shipit-patchwork1.png",
    tags: ["Python", "Pygame", "State Machine"],
    category: "games",
    challenges: "Maintaining consistent 60FPS physics frames on low-tier hardware configurations.",
    features: ["Custom assets configuration JSON", "Dynamic scaling waves difficulty", "Retro soundtrack & sound effects sync", "High-score leaderboard storage file"],
    githubUrl: "https://github.com/Adhis2003/retrolove",
  },
  // {
  //   id: "portfolio",
  //   title: "World-Class Dev Portfolio",
  //   description: "The very portfolio site you are reading now. Engineered with high-fidelity micro-interactions, responsive folders, retro terminal emulator, and custom dark mode.",
  //   thumbnail: "/projects/portfolio.png",
  //   tags: ["React", "Next.js 16", "Tailwind CSS v4", "Framer Motion", "GSAP"],
  //   category: "web",
  //   challenges: "Achieving seamless folder height responsiveness across all breakpoints down to 320px.",
  //   features: ["Responsive folder-flap page design", "Interactive CLI Command Shell", "Ctrl+K Command Palette actions", "Stateful achievements & confetti trigger"],
  //   liveUrl: "/",
  //   githubUrl: "https://github.com/Adhis2003/next-protfolio",
  // },
  {
    id: "puzzlebricks",
    title: "Puzzle-Bricks Showcase",
    description: "A catalog and custom blog documenting original modular Lego© building guides and brick solutions, featuring clean content delivery.",
    thumbnail: "/projects/puzzlebricks.png",
    tags: ["WordPress", "SEO", "Responsive Design"],
    category: "web",
    challenges: "Optimizing high-resolution building instruction PDFs for mobile performance loading.",
    features: ["Custom category instructions filter", "Mobile-optimized image grids", "Email newsletter subscription hook", "Search engine indexing optimizations"],
    liveUrl: "https://www.puzzle-bricks.fr",
  }
];

const ProjectsSection: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "mobile" | "web" | "games">("all");

  useEffect(() => {
    // Unlock Curious Explorer badge if they visited all sections
    const visited = JSON.parse(localStorage.getItem("visited_tabs") || "{}");
    visited["Projects"] = true;
    localStorage.setItem("visited_tabs", JSON.stringify(visited));
    
    if (Object.keys(visited).length === 4) {
      window.dispatchEvent(new CustomEvent("unlock_badge", { detail: { badgeId: "explore" } }));
    }
  }, []);

  // Filter projects by search query and category
  const filteredProjects = PROJECTS_DATA.filter((proj) => {
    const matchesSearch =
      proj.title.toLowerCase().includes(search.toLowerCase()) ||
      proj.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    
    const matchesCategory =
      activeCategory === "all" || proj.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="text-center py-4 bg-white/40 dark:bg-stone-900/30 backdrop-blur-md rounded-2xl border border-stone-200 dark:border-stone-800">
        <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white flex items-center justify-center gap-2">
          <FolderHeart className="text-blue-500" size={22} />
          Projects Showcase
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-semibold max-w-md mx-auto">
          Search code repositories or filter by categories to explore core applications built.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-4 bg-white/40 dark:bg-stone-900/30 backdrop-blur-md rounded-2xl border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
          <input
            type="text"
            placeholder="Search projects or skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-stone-800 dark:text-stone-200 placeholder-stone-400"
          />
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 flex-wrap justify-center w-full md:w-auto">
          {(["all", "mobile", "web", "games"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer active:scale-95 ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                  : "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-850"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj) => (
            <motion.div
              key={proj.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                title={proj.title}
                description={proj.description}
                thumbnail={proj.thumbnail}
                tags={proj.tags}
                challenges={proj.challenges}
                features={proj.features}
                liveUrl={proj.liveUrl}
                githubUrl={proj.githubUrl}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredProjects.length === 0 && (
        <p className="text-center text-xs text-stone-400 dark:text-stone-500 py-10 font-bold">
          No projects matching your search parameters.
        </p>
      )}

      {/* Technical Blog Feed */}
      <div className="p-5 bg-white/40 dark:bg-stone-900/30 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-2xl">
        <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="text-blue-500" size={18} />
          Technical Blog Feed
        </h3>
        <BlogPlaceholder />
      </div>
    </div>
  );
};

export default ProjectsSection;
