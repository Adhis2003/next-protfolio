"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Terminal, Moon, Sun, Award, RefreshCw, Command, User, Hammer, Mail } from "lucide-react";

interface ActionItem {
  id: string;
  title: string;
  subtitle: string;
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  onTabSelect: (tab: string) => void;
  onResetPhoto: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ onTabSelect, onResetPhoto }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Define command palette actions
  const actions: ActionItem[] = [
    {
      id: "about",
      title: "Go to About Section",
      subtitle: "Learn more about Adhithya's history and background",
      shortcut: "A",
      icon: <User size={16} />,
      action: () => onTabSelect("About"),
    },
    {
      id: "skills",
      title: "Go to Skills Section",
      subtitle: "Explore interactive skills and developer stats",
      shortcut: "S",
      icon: <Hammer size={16} />,
      action: () => onTabSelect("Skills"),
    },
    {
      id: "projects",
      title: "Go to Projects Section",
      subtitle: "Browse premium projects, code links and demos",
      shortcut: "P",
      icon: <Sparkles size={16} />,
      action: () => onTabSelect("Projects"),
    },
    {
      id: "contact",
      title: "Go to Contact Section",
      subtitle: "Get in touch or run commands in the CLI terminal",
      shortcut: "C",
      icon: <Mail size={16} />,
      action: () => onTabSelect("Contact"),
    },
    {
      id: "theme",
      title: "Toggle Light/Dark Theme",
      subtitle: "Switch between light and dark palette modes",
      shortcut: "T",
      icon: <Moon size={16} className="dark:hidden" />,
      action: () => {
        const isDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        window.dispatchEvent(new Event("storage"));
      },
    },
    {
      id: "reset-photo",
      title: "Reset Cover Photo",
      subtitle: "Stick the cover profile photo back with scotch tape",
      shortcut: "R",
      icon: <RefreshCw size={16} />,
      action: onResetPhoto,
    },
  ];

  // Filter actions based on search
  const filteredActions = actions.filter(
    (action) =>
      action.title.toLowerCase().includes(search.toLowerCase()) ||
      action.subtitle.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (isOpen) {
        if (e.key === "Escape") {
          setIsOpen(false);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % filteredActions.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filteredActions[activeIndex]) {
            filteredActions[activeIndex].action();
            setIsOpen(false);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, filteredActions]);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Help Command Palette Button at Top-Left */}
      <div className="fixed top-4 left-4 z-90 flex gap-2">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold shadow-md backdrop-blur-md cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/95 transition-all"
        >
          <Command size={14} className="animate-pulse" />
          <span>Cmd Palette</span>
          <kbd className="bg-stone-100 dark:bg-stone-800 text-[10px] px-1.5 py-0.5 rounded border border-stone-200 dark:border-stone-700">
            Ctrl+K
          </kbd>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 bg-stone-950/40 dark:bg-black/60 backdrop-blur-sm z-[9999] flex items-start justify-center pt-24 px-4">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Search Bar */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-stone-200 dark:border-stone-800">
                <Search className="text-stone-400 dark:text-stone-500" size={18} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search sections..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-grow bg-transparent border-none text-stone-800 dark:text-stone-100 text-sm focus:outline-none placeholder-stone-400 dark:placeholder-stone-500"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 text-xs px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 cursor-pointer"
                >
                  ESC
                </button>
              </div>

              {/* Actions List */}
              <div className="max-h-[300px] overflow-y-auto p-2 space-y-0.5">
                {filteredActions.length > 0 ? (
                  filteredActions.map((action, index) => (
                    <div
                      key={action.id}
                      onClick={() => {
                        action.action();
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors duration-150 ${
                        index === activeIndex
                          ? "bg-blue-600 text-white"
                          : "text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg flex items-center justify-center ${
                            index === activeIndex
                              ? "bg-white/20 text-white"
                              : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400"
                          }`}
                        >
                          {action.icon}
                        </div>
                        <div>
                          <h5 className="text-xs font-bold">{action.title}</h5>
                          <p
                            className={`text-[10px] ${
                              index === activeIndex ? "text-white/80" : "text-stone-400 dark:text-stone-500"
                            }`}
                          >
                            {action.subtitle}
                          </p>
                        </div>
                      </div>
                      {action.shortcut && (
                        <kbd
                          className={`text-[9px] px-2 py-1 rounded font-bold border transition-colors ${
                            index === activeIndex
                              ? "bg-white/25 border-white/20 text-white"
                              : "bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-500"
                          }`}
                        >
                          {action.shortcut}
                        </kbd>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-xs text-stone-400 dark:text-stone-500 py-6">
                    No results found for "{search}"
                  </p>
                )}
              </div>

              {/* Command Palette Footer */}
              <div className="p-3 bg-stone-50 dark:bg-stone-900/60 border-t border-stone-200 dark:border-stone-800 text-[10px] text-stone-400 dark:text-stone-500 flex justify-between select-none">
                <span className="flex items-center gap-1">
                  Use <kbd className="bg-stone-100 dark:bg-stone-800 px-1 py-0.5 rounded border border-stone-200 dark:border-stone-700">↑↓</kbd> keys to navigate
                </span>
                <span>Press Enter to select</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
