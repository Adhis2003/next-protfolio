"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Card from "../Card";
import { Timeline, TimelineItem } from "../Timeline";
import { Award, Briefcase, MapPin, Sparkles, Terminal } from "lucide-react";
import VisitorCounter from "../VisitorCounter";
import Achievements from "../Achievements";
import CodingTimeline from "../CodingTimeline";
import Certifications from "../Certifications";

const AboutSection: React.FC = () => {
  useEffect(() => {
    // Unlock Curious Explorer badge if they visited all sections (we will set state in parent)
    const visited = JSON.parse(localStorage.getItem("visited_tabs") || "{}");
    visited["About"] = true;
    localStorage.setItem("visited_tabs", JSON.stringify(visited));
    
    if (Object.keys(visited).length === 4) {
      window.dispatchEvent(new CustomEvent("unlock_badge", { detail: { badgeId: "explore" } }));
    }
  }, []);

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Banner Grid */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white/40 dark:bg-stone-900/30 backdrop-blur-md rounded-2xl p-6 border border-stone-200 dark:border-stone-800 gap-6">
        <div className="flex-grow space-y-3">
          <span className="text-[10px] font-black tracking-widest uppercase bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1 rounded border border-blue-500/20 w-fit block">
            Available for Opportunities
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-stone-900 dark:text-white">
            Adhithya
          </h2>
          <p className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Frontend Developer • React & Next.js Developer
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-stone-500 dark:text-stone-400 pt-1 font-semibold">
            <span className="flex items-center gap-1.5">
              <Briefcase size={14} />
              1+ Years Software Development
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} />
              India
            </span>
          </div>
        </div>

        {/* Profile Image Frame with hover glow */}
        <div className="relative group">
          <div className="absolute inset-0.5 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white dark:border-stone-950 shadow-lg">
            <Image
              src="/profil.jpeg"
              alt="Adhithya profile portrait"
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Visitor Counter */}
      <div className="flex justify-start">
        <VisitorCounter />
      </div>

      {/* Presentation/Intro Statement */}
      <div className="p-5 bg-white/40 dark:bg-stone-900/30 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-2xl">
        <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-3 flex items-center gap-2">
          <Sparkles className="text-amber-500" size={18} />
          Profile Statement
        </h3>
        <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed text-justify">
          Hello! I'm a developer passionate about constructing high-performance web systems and fluid, responsive interfaces. With 1+ years of hands-on experience building layouts within the React and Next.js ecosystem, I focus on building production-ready architectures, optimizing server components, and designing microservices with Node.js and Java Spring Boot. I specialize in turning complex designs into beautiful, accessible interfaces.
        </p>
      </div>

      {/* Achievements / Badges Panel */}
      <div className="p-5 bg-white/40 dark:bg-stone-900/30 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-2xl">
        <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2.5 flex items-center gap-2">
          <Award className="text-amber-500" size={18} />
          Interactive Achievements
        </h3>
        <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold mb-3">
          Complete folder actions to unlock special developer badges!
        </p>
        <Achievements />
      </div>

      {/* Milestone Coding Timeline */}
      <div className="p-5 bg-white/40 dark:bg-stone-900/30 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-2xl">
        <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
          <Terminal className="text-blue-500" size={18} />
          Coding Journey
        </h3>
        <CodingTimeline />
      </div>

      {/* Work Experience Timeline */}
      {/* <div className="p-5 bg-white/40 dark:bg-stone-900/30 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-2xl">
        <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-5 flex items-center gap-2">
          <Briefcase className="text-blue-500" size={18} />
          Work Experience
        </h3>
        <Timeline>
          <TimelineItem date="2025 - Present">
            <Card
              title="Software & Frontend Developer"
              icon={<Image src="/projects/portfolio.png" width={40} height={40} alt="Software logo" className="rounded" />}
              iconTitle="Contracting & Solutions"
              iconColor="bg-white/80"
            >
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-semibold">
                Building responsive web interfaces and connecting relational databases.
              </p>
              <ul className="list-disc list-inside text-[11px] text-stone-500 dark:text-stone-400 pl-2.5 mt-2 space-y-1">
                <li>Developed pixel-perfect React components and Next.js applications.</li>
                <li>Designed clean RESTful controllers using Spring Boot and Node/Express.</li>
                <li>Created database queries and indexes in PostgreSQL and MongoDB.</li>
              </ul>
            </Card>
          </TimelineItem>

          <TimelineItem date="2024 - 2025">
            <Card
              title="Junior Frontend Engineer"
              icon={<Image src="/projects/portfolio.png" width={40} height={40} alt="Frontend logo" className="rounded" />}
              iconTitle="CleverConnect Solutions"
              iconColor="bg-white/80"
            >
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-semibold">
                Constructed dashboard modules, optimized states, and integrated APIs.
              </p>
              <ul className="list-disc list-inside text-[11px] text-stone-500 dark:text-stone-400 pl-2.5 mt-2 space-y-1">
                <li>Refactored UI layouts using Tailwind CSS utilities, resolving overflow bugs.</li>
                <li>Leveraged Redux for state synchronization across dynamic dashboard tables.</li>
                <li>Participated in Git branch code reviews and Docker container configurations.</li>
              </ul>
            </Card>
          </TimelineItem>
        </Timeline>
      </div> */}

      {/* Certifications Section */}
      <div className="p-5 bg-white/40 dark:bg-stone-900/30 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-2xl">
        <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
          <Award className="text-emerald-500" size={18} />
          Certifications & Credentials
        </h3>
        <Certifications />
      </div>
    </div>
  );
};

export default AboutSection;
