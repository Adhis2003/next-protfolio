"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, Sparkles, AlertCircle } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  challenges: string;
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  thumbnail,
  tags,
  challenges,
  features,
  liveUrl,
  githubUrl,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse positions for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for tilt transition
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), springConfig);

  // Parallax shifts for child layers
  const imgTranslateX = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);
  const imgTranslateY = useSpring(useTransform(y, [-0.5, 0.5], [-10, 10]), springConfig);

  // CSS variables for spotlight effect
  const [spotlightStyle, setSpotlightStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized coordinates (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);

    // Spotlight gradient position
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    setSpotlightStyle({
      background: `radial-gradient(600px circle at ${px}px ${py}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
    });
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
    setSpotlightStyle({});
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative flex flex-col h-full bg-white/70 dark:bg-stone-900/60 backdrop-blur-md rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-xl transition-all duration-300 hover:shadow-2xl overflow-hidden group cursor-pointer"
    >
      {/* Background Spotlight and Radial Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        style={spotlightStyle}
      />
      
      {/* Top Animated Gradient Border effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Project Image Frame with Parallax */}
      <div 
        className="relative w-full h-48 md:h-56 rounded-xl overflow-hidden mb-5 bg-stone-100 dark:bg-stone-950"
        style={{ transform: "translateZ(30px)" }}
      >
        <motion.div
          style={{
            x: imgTranslateX,
            y: imgTranslateY,
            scale: 1.05,
          }}
          className="relative w-full h-full"
        >
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent opacity-60 dark:opacity-85 pointer-events-none" />
        
        {/* Title overlay for modern visual balance */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-xs font-bold tracking-wider text-blue-400 uppercase bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded">
            Project Preview
          </span>
        </div>
      </div>

      {/* Card Body content */}
      <div className="flex flex-col flex-grow z-20" style={{ transform: "translateZ(20px)" }}>
        {/* Title */}
        <h3 className="text-2xl font-bold text-stone-900 dark:text-white mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">
          {title}
        </h3>

        {/* Technology Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 bg-blue-500/10 dark:bg-blue-400/5 text-blue-600 dark:text-blue-400 border border-blue-500/20 dark:border-blue-400/10 rounded-full text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Project Description */}
        <p className="text-stone-600 dark:text-stone-300 text-sm mb-4 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Modern Interactive Details Tabs/Toggles */}
        <div className="space-y-3.5 mb-5 flex-grow">
          {/* Challenges Solved */}
          <div className="p-3 bg-amber-500/5 dark:bg-amber-400/5 border border-amber-500/10 dark:border-amber-400/10 rounded-lg">
            <h4 className="text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1.5 mb-1">
              <AlertCircle size={13} />
              Challenge Solved
            </h4>
            <p className="text-stone-600 dark:text-stone-400 text-xs leading-relaxed italic">
              {challenges}
            </p>
          </div>

          {/* Key Features */}
          <div className="p-3 bg-emerald-500/5 dark:bg-emerald-400/5 border border-emerald-500/10 dark:border-emerald-400/10 rounded-lg">
            <h4 className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 mb-1.5">
              <Sparkles size={13} />
              Key Features
            </h4>
            <ul className="text-stone-600 dark:text-stone-400 text-xs space-y-1.5 list-disc list-inside">
              {features.slice(0, 3).map((feat, idx) => (
                <li key={idx} className="line-clamp-1">{feat}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Project Links / Action Bar */}
        {/* <div className="flex gap-3 mt-auto pt-4 border-t border-stone-200 dark:border-stone-800" style={{ transform: "translateZ(10px)" }}>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-grow flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all duration-300 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95"
            >
              <ExternalLink size={15} />
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 rounded-xl text-sm font-semibold transition-all duration-300 active:scale-95 border border-stone-200 dark:border-stone-700"
            >
              <Github size={15} />
              Code
            </a>
          )}
        </div> */}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
