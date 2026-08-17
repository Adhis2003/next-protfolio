"use client";

import React, { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Adhithya is an exceptional engineer. He took our legacy interface, rewrote it using Next.js Server Components, and optimized query strategies to slash load times by 40%. His eye for pixel-perfect animations is top-notch.",
    author: "Elena Rostov",
    role: "Lead Frontend Architect",
    company: "CleverTech"
  },
  {
    quote: "Working with Adhithya on our backend service integration was seamless. He designed clean REST endpoints in Spring Boot and structured the PostgreSQL schemas with high efficiency. A dedicated developer who values solid code quality.",
    author: "Rajesh Nair",
    role: "Engineering Manager",
    company: "DevSolutions"
  },
  {
    quote: "His technical capacity and responsiveness are outstanding. Adhithya delivered our mobile dashboard mockups and frontend application right on schedule, showing deep command over React and modern styling libraries.",
    author: "Marc Dubois",
    role: "Product Owner",
    company: "SwissLife Projects"
  }
];

const TestimonialsSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full bg-white/60 dark:bg-stone-900/40 backdrop-blur-md border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs select-none">
      <span className="absolute top-4 right-4 text-blue-500/10 dark:text-blue-400/15 pointer-events-none">
        <Quote size={56} />
      </span>

      <div className="h-32 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <p className="text-xs text-stone-600 dark:text-stone-300 italic leading-relaxed max-w-lg mx-auto">
              "{TESTIMONIALS[current].quote}"
            </p>
            <h4 className="text-xs font-bold text-stone-850 dark:text-white mt-3.5">
              {TESTIMONIALS[current].author}
            </h4>
            <p className="text-[10px] text-stone-400 dark:text-stone-500 font-semibold mt-0.5">
              {TESTIMONIALS[current].role} @ {TESTIMONIALS[current].company}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-3 pt-3.5 border-t border-stone-100 dark:border-stone-850">
        <div className="flex gap-1">
          {TESTIMONIALS.map((_, idx) => (
            <span
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                idx === current ? "bg-blue-600 dark:bg-blue-400" : "bg-stone-200 dark:bg-stone-800"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white hover:bg-stone-50 dark:bg-stone-900 dark:hover:bg-stone-850 text-stone-600 dark:text-stone-400 cursor-pointer active:scale-95 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white hover:bg-stone-50 dark:bg-stone-900 dark:hover:bg-stone-850 text-stone-600 dark:text-stone-400 cursor-pointer active:scale-95 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSlider;
