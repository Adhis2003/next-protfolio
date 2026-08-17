"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal } from "lucide-react";

interface CommandHistoryItem {
  command: string;
  output: string | React.ReactNode;
}

const TerminalSection: React.FC = () => {
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div>
          <p className="text-emerald-400 font-semibold mb-1">
            🚀 Adhithya OS v1.0.0 Interactive Shell
          </p>
          <p className="text-stone-400 text-xs">
            Type <span className="text-blue-400">help</span> to view all available commands.
          </p>
        </div>
      )
    }
  ]);
  const [input, setInput] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdText: string) => {
    const cleanCmd = cmdText.trim().toLowerCase();
    let response: React.ReactNode = "";

    switch (cleanCmd) {
      case "help":
        response = (
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-stone-300">
            <div><span className="text-blue-400 font-bold">about</span> - Who is Adhithya?</div>
            <div><span className="text-blue-400 font-bold">skills</span> - Tech stack details</div>
            <div><span className="text-blue-400 font-bold">experience</span> - Roles & duration</div>
            <div><span className="text-blue-400 font-bold">contact</span> - Contact addresses</div>
            <div><span className="text-blue-400 font-bold">clear</span> - Clear the terminal</div>
            <div><span className="text-blue-400 font-bold">secret</span> - Reveal easter egg</div>
          </div>
        );
        break;
      case "about":
        response = (
          <p className="text-xs text-stone-300 leading-relaxed">
            Adhithya is a passionate Software & Frontend Developer from India with 1+ Years of Software Development experience. He specializes in designing stunning UI/UX layouts in Next.js/React and building clean server architectures using Spring Boot and Node.js.
          </p>
        );
        break;
      case "skills":
        response = (
          <div className="text-xs space-y-1">
            <p><span className="text-emerald-400">Frontend:</span> React, Next.js, TypeScript, JavaScript, Tailwind CSS, Redux</p>
            <p><span className="text-emerald-400">Backend:</span> Java, Spring Boot, Node.js, Express.js, REST APIs, System Design</p>
            <p><span className="text-emerald-400">Database & DevOps:</span> MongoDB, PostgreSQL, Git, Docker, AWS (Learning)</p>
          </div>
        );
        break;
      case "experience":
        response = (
          <div className="text-xs space-y-1">
            <p className="font-semibold text-blue-400">Software Developer (1+ Years Experience)</p>
            <p className="text-stone-400">Location: India</p>
            <p className="text-stone-300">Specializes in responsive web applications, modern UI widgets, API integration, and database management.</p>
          </div>
        );
        break;
      case "contact":
        response = (
          <div className="text-xs space-y-1 text-stone-300">
            <p>📧 Email: <a href="mailto:adhithyashokkumar4@gmail.com" className="text-blue-400 hover:underline">adhithyashokkumar4@gmail.com</a></p>
            <p>💼 LinkedIn: <a href="https://www.linkedin.com/in/adhithya-frontend-developer/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LinkedIn Profile</a></p>
            <p>🐙 GitHub: <a href="https://github.com/Adhis2003/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">github.com/Adhis2003</a></p>
          </div>
        );
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "secret":
        response = (
          <div className="text-xs text-yellow-400 animate-pulse font-mono">
            🎉 EASTER EGG UNLOCKED! "First, solve the problem. Then, write the code." - John Johnson. You did it! 🚀
          </div>
        );
        break;
      case "":
        response = "";
        break;
      default:
        response = (
          <span className="text-red-400 text-xs">
            Unknown command: "{cmdText}". Type "help" for a list of command guidelines.
          </span>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmdText, output: response }]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <div
      onClick={focusInput}
      className="w-full bg-stone-950 rounded-xl overflow-hidden shadow-2xl border border-stone-800 font-mono text-stone-200 mt-6 cursor-text"
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-stone-900 border-b border-stone-800 select-none">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="w-3 h-3 bg-yellow-500 rounded-full" />
          <span className="w-3 h-3 bg-green-500 rounded-full" />
        </div>
        <div className="flex items-center gap-1.5 text-stone-400 text-xs font-semibold">
          <Terminal size={13} />
          terminal@adhithya: ~
        </div>
        <div className="w-12" /> {/* spacer */}
      </div>

      {/* Output Console area */}
      <div className="p-4 h-64 overflow-y-auto space-y-3.5 scrollbar-thin scrollbar-thumb-stone-800 scrollbar-track-transparent">
        {history.map((item, index) => (
          <div key={index} className="space-y-1 text-xs">
            {item.command !== "welcome" && (
              <div className="flex items-center gap-1.5 text-blue-400">
                <span>$</span>
                <span>{item.command}</span>
              </div>
            )}
            {item.output && <div className="pl-4 border-l border-stone-800/40 py-0.5">{item.output}</div>}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Prompt line */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-stone-950/80 border-t border-stone-900">
        <span className="text-emerald-400 text-xs font-bold">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type a command..."
          className="flex-grow bg-transparent border-none text-xs text-stone-200 focus:outline-none placeholder-stone-700"
          autoComplete="off"
          autoCapitalize="off"
        />
      </div>
    </div>
  );
};

export default TerminalSection;
