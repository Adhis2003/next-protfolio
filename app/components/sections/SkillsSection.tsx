"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Card from "../Card";
import { Timeline, TimelineItem } from "../Timeline";
import { Award, Hammer, GraduationCap, Github } from "lucide-react";
import SkillTree from "../SkillTree";
import GitHubStats from "../GitHubStats";

const SkillsSection: React.FC = () => {
  useEffect(() => {
    // Register tab visit forCurious Explorer badge
    const visited = JSON.parse(localStorage.getItem("visited_tabs") || "{}");
    visited["Skills"] = true;
    localStorage.setItem("visited_tabs", JSON.stringify(visited));
    
    if (Object.keys(visited).length === 4) {
      window.dispatchEvent(new CustomEvent("unlock_badge", { detail: { badgeId: "explore" } }));
    }
  }, []);

  return (
    <div className="space-y-8 pb-10">
      {/* Intro Header */}
      <div className="text-center py-4 bg-white/40 dark:bg-stone-900/30 backdrop-blur-md rounded-2xl border border-stone-200 dark:border-stone-800">
        <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white flex items-center justify-center gap-2">
          <Hammer className="text-blue-500" size={22} />
          Skills & Technical Dashboard
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-semibold max-w-md mx-auto">
          Explore interactive skill categories, developer proficiencies, and live GitHub contributions.
        </p>
      </div>

      {/* Interactive Skill Tree */}
      <div className="p-5 bg-white/40 dark:bg-stone-900/30 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-2xl">
        <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
          <Award className="text-amber-500" size={18} />
          Interactive Tech Stack Tree
        </h3>
        <SkillTree />
      </div>

      {/* GitHub Commits & Activity */}
      <div className="p-5 bg-white/40 dark:bg-stone-900/30 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-2xl">
        <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
          <Github className="text-stone-800 dark:text-white" size={18} />
          Live Git Performance
        </h3>
        <GitHubStats />
      </div>

      {/* Education Timeline */}
      <div className="p-5 bg-white/40 dark:bg-stone-900/30 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-2xl">
        <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-5 flex items-center gap-2">
          <GraduationCap className="text-blue-500" size={18} />
          Education & Credentials
        </h3>
        <Timeline>
          <TimelineItem date="2020 - 2024">
            <Card
              title="Bachelor of Technology in Information Technology"
              icon={<GraduationCap size={24} className="text-blue-500" />}
              iconTitle="University Education"
              text="Undergraduate Degree"
              elements={["Software Engineering", "Algorithms & Structures", "Relational Databases", "Web Architectures"]}
              iconColor="bg-blue-500/10"
            >
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-3 leading-relaxed">
                Core coursework focused on object-oriented programming, network protocols, database query normalization, and distributed application structures.
              </p>
            </Card>
          </TimelineItem>

          <TimelineItem date="2018 - 2020">
            <Card
              title="Higher Secondary - Computer Science Focus"
              icon={<GraduationCap size={24} className="text-emerald-500" />}
              iconTitle="Secondary Education"
              text="Advanced Computing Track"
              elements={["Java Basics", "SQL databases", "Boolean logic"]}
              iconColor="bg-emerald-500/10"
            >
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-3 leading-relaxed">
                Introduced to standard computer science theories, foundational data algorithms, database schemas, and structured software development pipelines.
              </p>
            </Card>
          </TimelineItem>
        </Timeline>
      </div>
    </div>
  );
};

export default SkillsSection;
