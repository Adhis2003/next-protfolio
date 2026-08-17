"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, User, Sparkles, MessageSquare } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

const KNOWLEDGE_BASE = {
  skills: "Adhithya has expertise in: React, Next.js, TypeScript, JavaScript, Java, Spring Boot, Node.js, Express.js, MongoDB, PostgreSQL, Tailwind CSS, Redux, Git, Docker, and REST APIs. He's also currently learning AWS and System Design!",
  experience: "Adhithya has 1+ Years of Software Development experience, specializing in building responsive and premium user interfaces using React/Next.js alongside robust backend microservices with Node.js and Java/Spring Boot.",
  location: "Adhithya is based in India.",
  contact: "You can reach Adhithya via the Contact section of this portfolio, or directly email him at: adhithyashokkumar4@gmail.com. You can also connect on LinkedIn: linkedin.com/in/adhithya-frontend-developer/",
  projects: "Adhithya has built several projects: 'Murmure' (a mental wellness app built with React Native and Redux), 'Coins-App' (a clean crypto tracker using TanStack Query), and 'Retrolove' (a space shooter game written in Python/Pygame). Check them out in the Projects tab!",
  whoami: "I am Adhithya, a Frontend and Software Developer with 1+ years of experience. I build web applications with high-fidelity animations, clean layouts, and performant backend codebases.",
  default: "I'm not sure about that. Try asking about my 'skills', 'experience', 'projects', 'location', or 'how to contact' me!"
};

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi! I am Adhithya's AI Agent. Ask me anything about his skills, experience, projects, or background!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      sender: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // AI logic response simulation
    setTimeout(() => {
      const cleanInput = textToSend.toLowerCase();
      let responseText = KNOWLEDGE_BASE.default;

      if (cleanInput.includes("skill") || cleanInput.includes("stack") || cleanInput.includes("tech")) {
        responseText = KNOWLEDGE_BASE.skills;
      } else if (cleanInput.includes("experience") || cleanInput.includes("work") || cleanInput.includes("job")) {
        responseText = KNOWLEDGE_BASE.experience;
      } else if (cleanInput.includes("location") || cleanInput.includes("live") || cleanInput.includes("where")) {
        responseText = KNOWLEDGE_BASE.location;
      } else if (cleanInput.includes("contact") || cleanInput.includes("email") || cleanInput.includes("linkedin")) {
        responseText = KNOWLEDGE_BASE.contact;
      } else if (cleanInput.includes("project") || cleanInput.includes("apps") || cleanInput.includes("build")) {
        responseText = KNOWLEDGE_BASE.projects;
      } else if (cleanInput.includes("who") || cleanInput.includes("name") || cleanInput.includes("adhithya")) {
        responseText = KNOWLEDGE_BASE.whoami;
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: responseText,
          timestamp: new Date()
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend(input);
    }
  };

  const QuickQuestionButton = ({ text, onClickText }: { text: string; onClickText: string }) => (
    <button
      onClick={() => handleSend(onClickText)}
      className="text-xs bg-stone-100 hover:bg-blue-500 hover:text-white dark:bg-stone-800 dark:hover:bg-blue-600 text-stone-700 dark:text-stone-300 py-1 px-2.5 rounded-lg border border-stone-200 dark:border-stone-700 transition-colors duration-200 font-medium active:scale-95"
    >
      {text}
    </button>
  );

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-100">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full shadow-2xl shadow-blue-500/30 cursor-pointer focus:outline-none z-100 border border-white/20"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
            className="fixed bottom-24 right-6 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-100"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} className="text-white animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-sm flex items-center gap-1">
                    AI Assistant <Sparkles size={13} className="text-amber-300" />
                  </h4>
                  <p className="text-[10px] text-white/80">Offline Resume Agent • Active</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-stone-300 dark:scrollbar-thumb-stone-700">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 max-w-[85%] ${
                    msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white ${
                      msg.sender === "user" ? "bg-indigo-600" : "bg-blue-600"
                    }`}
                  >
                    {msg.sender === "user" ? <User size={13} /> : <Bot size={13} />}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-indigo-600 text-white rounded-tr-none shadow-md shadow-indigo-500/10"
                        : "bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-tl-none border border-stone-200/50 dark:border-stone-700/50"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 max-w-[80%] mr-auto">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-600 text-white">
                    <Bot size={13} />
                  </div>
                  <div className="bg-stone-100 dark:bg-stone-800 p-3 rounded-2xl rounded-tl-none border border-stone-200/50 dark:border-stone-700/50 flex gap-1 items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-stone-400 dark:bg-stone-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-stone-400 dark:bg-stone-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-stone-400 dark:bg-stone-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="p-3 border-t border-stone-200/50 dark:border-stone-800/50 bg-stone-50/50 dark:bg-stone-900/30 flex flex-wrap gap-1.5">
              <QuickQuestionButton text="💼 Experience" onClickText="What is your work experience?" />
              <QuickQuestionButton text="🛠️ Skills" onClickText="What tools and skills do you have?" />
              <QuickQuestionButton text="🚀 Projects" onClickText="Tell me about your projects" />
              <QuickQuestionButton text="📍 Location" onClickText="Where are you located?" />
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-stone-200 dark:border-stone-800 flex gap-2 items-center bg-white dark:bg-stone-900">
              <input
                type="text"
                placeholder="Ask about Adhithya..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-grow bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs px-3.5 py-2.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                onClick={() => handleSend(input)}
                className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl cursor-pointer hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 active:scale-95 flex items-center justify-center"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
