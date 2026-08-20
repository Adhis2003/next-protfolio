"use client";

import Image from "next/image";
import Tab from "./components/Tab";
import ScotchedPhoto from "./components/ScotchedPhoto";
import StickerLabel from "./components/StickerLabel";

import AboutSection from "./components/sections/AboutSection";
import SkillsSection from "./components/sections/SkillsSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ContactSection from "./components/sections/ContactSection";

import ThemeSwitcher from "./components/ThemeSwitcher";
import CustomCursor from "./components/CustomCursor";
import ParticleBackground from "./components/ParticleBackground";
import CommandPalette from "./components/CommandPalette";
import AIAssistant from "./components/AIAssistant";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [animationClass, setAnimationClass] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [photoKey, setPhotoKey] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const folderContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTabClick = (tabName: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    
    // Trigger badge unlock for Explorer if they open a tab
    const visited = JSON.parse(localStorage.getItem("visited_tabs") || "{}");
    visited[tabName] = true;
    localStorage.setItem("visited_tabs", JSON.stringify(visited));
    if (Object.keys(visited).length === 4) {
      window.dispatchEvent(new CustomEvent("unlock_badge", { detail: { badgeId: "explore" } }));
    }

    if (activeTab === tabName) {
      setAnimationClass("animate-put-back");
      setTimeout(() => {
        setActiveTab(null);
      }, 800);
    } else {
      if (activeTab) {
        setAnimationClass("animate-put-back");
        setTimeout(() => {
          setActiveTab(tabName);
          setAnimationClass("animate-pull-over");
        }, 800);
      } else {
        setActiveTab(tabName);
        setAnimationClass("animate-pull-over");
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isAnimating) {
        return;
      }
      if (
        folderContainerRef.current &&
        !folderContainerRef.current.contains(event.target as Node)
      ) {
        const target = event.target as HTMLElement;
        // Don't close if clicking command palette or floating widgets
        if (
  target.closest(".z-100") ||
  target.closest('[class~="z-[9999]"]') ||
  target.closest('[class~="z-[99999]"]')
) {
  return;
}

        if (activeTab) {
          setIsAnimating(true);
          setAnimationClass("animate-put-back");
          setTimeout(() => {
            setActiveTab(null);
          }, 800);
        }
      }
    };

    if (activeTab) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeTab, isAnimating]);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="relative h-screen bg-sky-50 dark:bg-stone-900 transition-colors duration-300 overflow-hidden">
      <ParticleBackground />
      {/* <CustomCursor /> */}
      <AIAssistant />
      {/* <CommandPalette onTabSelect={handleTabClick} onResetPhoto={() => setPhotoKey(prev => prev + 1)} /> */}

      {/* Floating System Bar */}
      {/* <div className="absolute top-4 right-4 z-[99] flex items-center gap-2">
        <ThemeSwitcher />
      </div> */}

      <div
        ref={folderContainerRef}
        className="absolute top-0 bottom-0 left-0 right-0 m-auto w-[92vw] h-[80vh] md:w-[85vw] md:h-[65vw] lg:w-[80vw] lg:h-[60vw] max-w-[106.67vh] max-h-[80vh] z-30 transition-all duration-300"
      >
        {/* Tabs over the folder */}
        <nav className="absolute w-full md:w-2/3 h-1/6 right-0 z-20 -translate-y-[85%] md:-translate-y-2/3 lg:-translate-y-1/2">
          <ul className="flex w-full h-full gap-x-1 px-1">
            <Tab bgColor="bg-emerald-500" text="About" onClick={() => handleTabClick("About")} />
            <Tab bgColor="bg-blue-400" text="Skills" onClick={() => handleTabClick("Skills")} />
            <Tab bgColor="bg-red-400" text="Projects" onClick={() => handleTabClick("Projects")} />
            <Tab bgColor="bg-amber-400" text="Contact" onClick={() => handleTabClick("Contact")} />
          </ul>
        </nav>

        {/* Back of the folder */}
        <div className="absolute inset-0 z-10 origin-bottom skew-x-1 md:skew-x-3 w-full rounded-lg bg-amber-250/90 dark:bg-stone-850 p-4 mt-1 shadow-lg border border-stone-200/20" />

        {/* Document Inside of the folder */}
        <div
          ref={scrollContainerRef}
          style={{
            "--doc-width": isMobile ? "100%" : "120%",
            "--doc-left": isMobile ? "0px" : "-10%",
          } as React.CSSProperties}
          className={`absolute inset-x-0 bottom-0 top-6 z-20 w-full rounded-b-lg bg-lined-paper p-4 md:p-6 shadow-xl text-black dark:text-stone-100 overflow-y-auto ${animationClass}`}
        >
          {activeTab === "About" && <AboutSection />}
          {activeTab === "Skills" && <SkillsSection />}
          {activeTab === "Projects" && <ProjectsSection />}
          {activeTab === "Contact" && <ContactSection />}
        </div>

        {/* Front of the folder */}
        <div className="absolute inset-0 z-40 origin-bottom -skew-x-1 md:-skew-x-3 w-full rounded-lg bg-orange-200/90 dark:bg-stone-800 p-4 shadow-xl border border-stone-200/20 flex flex-col justify-between">
          <StickerLabel text="Adhi's Stuff" containerClassName=" -rotate-9 translate-y-1/2" />

          <ScotchedPhoto
            key={photoKey}
            image={{ src: "/profil.jpeg", width: 300, height: 300, alt: "Picture of Adhithya" }}
            containerClassName="w-[45%] md:w-1/2 translate-y-[16.67%] translate-x-full skew-x-3 rotate-12 z-20"
          />

          <Image
            src="/label(!).png"
            width="300"
            height="150"
            alt="Label of quality"
            className="absolute w-[45%] md:w-1/2 -left-3 bottom-6 skew-x-3 -rotate-12 dark:brightness-90"
          />
        </div>

        <p className="absolute -bottom-12 left-0 right-0 text-center text-xs text-stone-500 dark:text-stone-400 font-semibold select-none">
          Adhithya {new Date().getFullYear()} -&nbsp;
          <a
            href="https://www.linkedin.com/in/adhithya-frontend-developer/"
            className="text-blue-500 dark:text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          &nbsp;-&nbsp;
          <a
            href="https://github.com/Adhis2003/"
            className="text-blue-500 dark:text-blue-400 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </div>
  );
}
