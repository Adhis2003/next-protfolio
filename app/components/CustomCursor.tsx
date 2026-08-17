"use client";

import React, { useEffect, useState, useRef } from "react";

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect mobile/touch devices
    const isTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      );
    };

    if (isTouchDevice()) {
      return; // Skip custom cursor for mobile
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);
    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Register hover listeners for links and buttons
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, input[type='submit'], [role='button'], .cursor-pointer"
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleLinkHoverStart);
        el.addEventListener("mouseleave", handleLinkHoverEnd);
      });
    };

    addHoverListeners();

    // Create a MutationObserver to listen for dynamically added items
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // CSS styling to hide original cursor
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      body, a, button, input, select, textarea, [role='button'], .cursor-pointer {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.head.removeChild(styleEl);
      observer.disconnect();
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <>
      {/* Outer Follower */}
      <div
        ref={cursorRef}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        className={`fixed w-8 h-8 -ml-4 -mt-4 rounded-full border border-blue-500/60 dark:border-blue-400/60 pointer-events-none z-[99999] transition-transform duration-150 ease-out transform ${
          clicked ? "scale-75 bg-blue-500/20" : linkHovered ? "scale-150 bg-blue-500/10 border-blue-400" : "scale-100"
        }`}
      />
      {/* Inner Dot */}
      <div
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        className={`fixed w-2 h-2 -ml-1 -mt-1 bg-indigo-600 dark:bg-blue-400 rounded-full pointer-events-none z-[99999] transition-transform duration-75 ${
          clicked ? "scale-90" : linkHovered ? "scale-50 opacity-50" : "scale-100"
        }`}
      />
      {/* Screen Mouse Spotlight Halo */}
      <div
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background: "radial-gradient(150px circle at center, rgba(59, 130, 246, 0.05), transparent 70%)",
        }}
        className="fixed w-[300px] h-[300px] -ml-[150px] -mt-[150px] rounded-full pointer-events-none z-[9999] mix-blend-screen"
      />
    </>
  );
};

export default CustomCursor;
