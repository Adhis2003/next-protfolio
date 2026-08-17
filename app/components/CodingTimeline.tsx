"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Flame, Rocket, Star, Laptop } from "lucide-react";

interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const MILESTONES: TimelineMilestone[] = [
  {
    year: "2026",
    title: "Software Engineer — 1+ Years Work Experience",
    description:
      "Building full-stack web applications with React.js, Java, and Spring Boot. Developing RESTful APIs, implementing JWT authentication, and working with modern frontend and backend technologies.",
    icon: <Rocket size={15} />,
    color: "bg-blue-500 ring-blue-500/20 text-blue-500",
  },
  {
    year: "2025",
    title: "Full-Stack Development",
    description:
      "Expanded into backend development with Java and Spring Boot while strengthening React.js skills. Built REST APIs, integrated databases, and worked with Redux for scalable state management.",
    icon: <Flame size={15} />,
    color: "bg-indigo-500 ring-indigo-500/20 text-indigo-500",
  },
  {
    year: "2024",
    title: "Frontend Development",
    description:
      "Started building production-focused web interfaces with React.js, JavaScript, TypeScript, Tailwind CSS, and Next.js. Focused on responsive UI development and reusable components.",
    icon: <Star size={15} />,
    color: "bg-amber-500 ring-amber-500/20 text-amber-500",
  },
  {
    year: "2023",
    title: "React & TypeScript Journey",
    description:
      "Discovered React and TypeScript and began building interactive web applications. Learned component-based architecture, API integration, state management, and modern frontend development practices.",
    icon: <Code size={15} />,
    color: "bg-emerald-500 ring-emerald-500/20 text-emerald-500",
  },
  {
    year: "2022",
    title: "Started Programming",
    description:
      "Started my programming journey with Java and JavaScript. Built a foundation in object-oriented programming, problem solving, data structures, and core programming concepts.",
    icon: <Laptop size={15} />,
    color: "bg-rose-500 ring-rose-500/20 text-rose-500",
  },
];

const CodingTimeline: React.FC = () => {
  return (
    <div className="relative border-l border-stone-200 dark:border-stone-800 ml-4 pl-6 space-y-6 py-2 select-none">
      {MILESTONES.map((mile, index) => (
        <motion.div
          key={mile.title}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative group"
        >
          {/* Milestone Circle dot */}
          <div
            className={`absolute -left-[35px] top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-stone-900 ring-4 ${mile.color} flex items-center justify-center`}
          />

          {/* Card Box */}
          <div className="bg-white/60 dark:bg-stone-900/40 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-xl p-4 shadow-xs group-hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black tracking-widest uppercase bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-2 py-0.5 rounded border border-stone-200/50 dark:border-stone-700/50">
                {mile.year}
              </span>
              <div className="text-stone-400 group-hover:text-stone-500 transition-colors">
                {mile.icon}
              </div>
            </div>
            <h4 className="text-xs font-bold text-stone-850 dark:text-stone-150">
              {mile.title}
            </h4>
            <p className="text-[10px] leading-relaxed text-stone-500 dark:text-stone-400 mt-1">
              {mile.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CodingTimeline;
