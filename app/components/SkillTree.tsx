"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Database, Layout, Server, Settings, ShieldCheck, Sparkles } from "lucide-react";

interface SkillNode {
  name: string;
  level: number; // 1 to 5 stars
  desc: string;
}

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  skills: SkillNode[];
}

const SKILL_TREE_DATA: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend Development",
    icon: <Layout size={18} />,
    color: "from-blue-500 to-cyan-500",
    skills: [
      {
        name: "React.js",
        level: 5,
        desc: "Components, hooks, props, state management, reusable UI"
      },
      {
        name: "JavaScript",
        level: 5,
        desc: "ES6+, asynchronous JavaScript, promises, DOM, event handling"
      },
      {
        name: "TypeScript",
        level: 4,
        desc: "Types, interfaces, generics, type-safe application development"
      },
      {
        name: "Next.js",
        level: 4,
        desc: "App Router, routing, server-side rendering, API integration"
      },
      {
        name: "Tailwind CSS",
        level: 4,
        desc: "Responsive layouts, utility classes, reusable UI styling"
      },
      {
        name: "Redux",
        level: 4,
        desc: "Global state management, slices, actions, async state"
      }
    ]
  },

  {
    id: "backend",
    name: "Backend Development",
    icon: <Server size={18} />,
    color: "from-emerald-500 to-teal-500",
    skills: [
      {
        name: "Java",
        level: 4,
        desc: "OOP, collections, exception handling, streams, core Java"
      },
      {
        name: "Spring Boot",
        level: 4,
        desc: "Spring MVC, dependency injection, REST APIs, JPA"
      },
      {
        name: "REST APIs",
        level: 4,
        desc: "API development, HTTP methods, status codes, validation"
      },
      {
        name: "Spring MVC",
        level: 4,
        desc: "Controllers, services, repositories, request handling"
      },
      {
        name: "Hibernate / JPA",
        level: 3,
        desc: "Entity mapping, relationships, repositories, database operations"
      },
      {
        name: "Node.js",
        level: 3,
        desc: "Backend fundamentals, asynchronous programming, API development"
      },
      {
        name: "Express.js",
        level: 3,
        desc: "Routing, middleware, REST API development and integrations"
      }
    ]
  },

  {
    id: "database",
    name: "Databases & Tools",
    icon: <Database size={18} />,
    color: "from-amber-500 to-orange-500",
    skills: [
      {
        name: "MySQL",
        level: 4,
        desc: "SQL queries, joins, relationships, CRUD operations"
      },
      {
        name: "PostgreSQL",
        level: 3,
        desc: "Relational database queries, joins, constraints and indexing"
      },
      {
        name: "MongoDB",
        level: 3,
        desc: "Document-based data modeling, CRUD and aggregation basics"
      },
      {
        name: "Git",
        level: 4,
        desc: "Branching, commits, merging, pull requests and conflict resolution"
      },
      {
        name: "Docker",
        level: 3,
        desc: "Containers, Dockerfiles and basic application deployment"
      },
      {
        name: "AWS",
        level: 2,
        desc: "Cloud fundamentals, EC2, S3 and basic deployment concepts"
      }
    ]
  }
];  

const SkillTree: React.FC = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("frontend");

  const toggleCategory = (id: string) => {
    setExpandedCategory((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full space-y-4">
      {SKILL_TREE_DATA.map((cat) => {
        const isExpanded = expandedCategory === cat.id;

        return (
          <div
            key={cat.id}
            className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden bg-white/50 dark:bg-stone-900/40 backdrop-blur-sm shadow-sm"
          >
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(cat.id)}
              className="w-full p-4 flex items-center justify-between cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-850 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg bg-gradient-to-tr ${cat.color} text-white shadow-sm`}>
                  {cat.icon}
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-stone-850 dark:text-stone-100">
                    {cat.name}
                  </h4>
                  <p className="text-[10px] text-stone-400 dark:text-stone-500">
                    {cat.skills.length} skills acquired
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-stone-400 dark:text-stone-500"
              >
                <ChevronRight size={18} />
              </motion.div>
            </button>

            {/* Expandable Skills */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="p-4 border-t border-stone-100 dark:border-stone-850 bg-stone-50/30 dark:bg-stone-900/20 space-y-3">
                    {cat.skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg bg-white dark:bg-stone-900 border border-stone-200/50 dark:border-stone-800/60 shadow-xs"
                      >
                        <div className="mb-2 sm:mb-0">
                          <h5 className="text-xs font-black text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                            {skill.name}
                            {skill.level >= 5 && (
                              <span className="text-[10px] text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 font-normal">
                                Master
                              </span>
                            )}
                          </h5>
                          <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                            {skill.desc}
                          </p>
                        </div>

                        {/* Skill Rating Bar */}
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-24 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden border border-stone-200/40 dark:border-stone-700/40">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(skill.level / 5) * 100}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className={`h-full bg-gradient-to-r ${cat.color}`}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-stone-600 dark:text-stone-400 w-6 text-right">
                            {((skill.level / 5) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default SkillTree;
