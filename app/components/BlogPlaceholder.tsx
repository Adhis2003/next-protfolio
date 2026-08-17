"use client";

import React from "react";
import { BookOpen, ArrowUpRight, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const POSTS: BlogPost[] = [
  {
    title: "Optimizing Next.js 15 App Router Performance",
    excerpt: "Exploring route prefetching, selective caching, and layout optimizations to achieve maximum PageSpeed scores on Vercel.",
    date: "Jun 12, 2026",
    readTime: "5 min read",
    category: "Next.js",
  },
  {
    title: "The Practical Guide to TypeScript Generic Types",
    excerpt: "Demystifying advanced generics, conditional types, and mapped properties for robust type-safe API responses.",
    date: "May 28, 2026",
    readTime: "8 min read",
    category: "TypeScript",
  },
  {
    title: "Why We Switched from Express to Spring Boot Microservices",
    excerpt: "A deep dive comparing thread concurrency patterns, dependency configurations, and raw throughput differences in production.",
    date: "Apr 04, 2026",
    readTime: "12 min read",
    category: "Architecture",
  }
];

const BlogPlaceholder: React.FC = () => {
  return (
    <div className="w-full space-y-3.5 mt-2 select-none">
      {POSTS.map((post, index) => (
        <motion.div
          key={post.title}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          className="p-4 bg-white/60 dark:bg-stone-900/40 backdrop-blur-md rounded-xl border border-stone-200 dark:border-stone-800 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[9px] font-black tracking-widest uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
                {post.category}
              </span>
              <h4 className="text-xs font-bold text-stone-800 dark:text-stone-150 leading-snug mt-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h4>
              <p className="text-[10px] leading-relaxed text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                {post.excerpt}
              </p>
            </div>
            <div className="text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-200 transition-colors flex-shrink-0">
              <ArrowUpRight size={16} />
            </div>
          </div>

          <div className="mt-4 pt-3 flex items-center gap-3 text-[9px] text-stone-400 dark:text-stone-500 border-t border-stone-100 dark:border-stone-850">
            <span>{post.date}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700" />
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {post.readTime}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default BlogPlaceholder;
