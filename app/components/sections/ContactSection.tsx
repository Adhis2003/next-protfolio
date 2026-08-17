"use client";

import React, { useEffect } from "react";
import ContactForm from "../ContactForm";
import TerminalSection from "../TerminalSection";
import TestimonialsSlider from "../TestimonialsSlider";
import { Github, Linkedin, Mail, MessageSquare } from "lucide-react";

const ContactSection: React.FC = () => {
  useEffect(() => {
    // Unlock Curious Explorer badge if all tabs are visited
    const visited = JSON.parse(localStorage.getItem("visited_tabs") || "{}");
    visited["Contact"] = true;
    localStorage.setItem("visited_tabs", JSON.stringify(visited));
    
    if (Object.keys(visited).length === 4) {
      window.dispatchEvent(new CustomEvent("unlock_badge", { detail: { badgeId: "explore" } }));
    }
  }, []);

  return (
    <div className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="text-center py-4 bg-white/40 dark:bg-stone-900/30 backdrop-blur-md rounded-2xl border border-stone-200 dark:border-stone-800">
        <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white flex items-center justify-center gap-2">
          <MessageSquare className="text-blue-500" size={22} />
          Get In Touch
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 font-semibold max-w-md mx-auto">
          Contact me via email form, standard socials, or run retro terminal shell actions.
        </p>
      </div>

      {/* Social Cards */}
      <div className="p-4 bg-white/40 dark:bg-stone-900/30 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-2xl">
        <h3 className="text-sm font-bold text-center text-stone-800 dark:text-stone-300 mb-4 uppercase tracking-wider">
          Quick Social Channels
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <a
            href="https://www.linkedin.com/in/adhithya-frontend-developer/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer group"
          >
            <Linkedin size={24} className="text-[#0A66C2] group-hover:scale-105 transition-transform" />
            <span className="text-[10px] font-bold text-stone-700 dark:text-stone-400 mt-1.5">LinkedIn</span>
          </a>

          <a
            href="https://github.com/Adhis2003/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-4 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer group"
          >
            <Github size={24} className="text-stone-800 dark:text-white group-hover:scale-105 transition-transform" />
            <span className="text-[10px] font-bold text-stone-700 dark:text-stone-400 mt-1.5">GitHub</span>
          </a>

          <a
            href="mailto:adhithyashokkumar4@gmail.com"
            className="flex flex-col items-center justify-center p-4 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-red-500/30 hover:-translate-y-1 transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer group"
          >
            <Mail size={24} className="text-[#c71610] group-hover:scale-105 transition-transform" />
            <span className="text-[10px] font-bold text-stone-700 dark:text-stone-400 mt-1.5">Email</span>
          </a>
        </div>
      </div>

      {/* Testimonials Colleague Slider */}
      <div className="p-5 bg-white/40 dark:bg-stone-900/30 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-2xl">
        <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-4 flex items-center gap-2">
          Colleague Testimonials
        </h3>
        <TestimonialsSlider />
      </div>

      {/* Retro CLI Terminal Panel */}
      {/* <div className="p-5 bg-white/40 dark:bg-stone-900/30 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-2xl">
        <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2 flex items-center gap-2">
          Retro CLI Shell
        </h3>
        <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold mb-3">
          Type help or experience to interact with my credentials in console shell.
        </p>
        <div onClick={() => window.dispatchEvent(new CustomEvent("unlock_badge", { detail: { badgeId: "terminal" } }))}>
          <TerminalSection />
        </div>
      </div> */}

      {/* Email Submission Form */}
      <div className="p-5 bg-white/40 dark:bg-stone-900/30 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-2xl">
        <h3 className="text-lg font-bold text-stone-900 dark:text-white text-center mb-4">
          Send a Direct Message
        </h3>
        <div className="max-w-md mx-auto">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
