"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTerminal,
  faCircle,
  faPlay,
  faArrowLeft,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import VersionSwitcher from "../components/VersionSwitcher";

interface OutputItem {
  id: string;
  command: string;
  content: React.ReactNode;
}

export default function TerminalPage() {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [theme, setTheme] = useState<"matrix" | "cyan" | "amber">("cyan");
  const [scanlines, setScanlines] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const themeColors = {
    cyan: {
      text: "text-cyan-400",
      border: "border-cyan-500/30",
      glow: "shadow-[0_0_20px_rgba(0,240,255,0.15)]",
      prompt: "text-cyan-300",
    },
    matrix: {
      text: "text-emerald-400",
      border: "border-emerald-500/30",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
      prompt: "text-emerald-300",
    },
    amber: {
      text: "text-amber-400",
      border: "border-amber-500/30",
      glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
      prompt: "text-amber-300",
    },
  };

  const initialOutputs: OutputItem[] = [
    {
      id: "init-welcome",
      command: "welcome",
      content: (
        <div className="space-y-3">
          <pre className="text-xs sm:text-sm font-mono leading-tight select-none opacity-90 overflow-x-auto text-cyan-300">
{`
   _____ _    _ _____            _____          _____ _    _ _  __
  / ____| |  | |  __ \\   /\\     |  __ \\   /\\   / ____| |  | | |/ /
 | (___ | |  | | |__) | /  \\    | |  | | /  \\ | |    | |__| | ' / 
  \\___ \\| |  | |  _  / / /\\ \\   | |  | |/ /\\ \\| |    |  __  |  <  
  ____) | |__| | | \\ \\/ ____ \\  | |__| / ____ \\ |____| |  | | . \\ 
 |_____/ \\____/|_|  \\_/_/    \\_\\ |_____/_/    \\_\\_____|_|  |_|_|\\_\\
                                                                    
`}
          </pre>
          <div className="text-sm font-mono text-slate-300 leading-relaxed">
            Welcome to <span className="text-white font-bold">Suradach Kanphaisit&apos;s</span> Interactive Terminal v3.0.0
            <br />
            Senior Software Developer • 4+ Years Experience • NestJS, React &amp; Cloud.
          </div>
          <div className="text-xs font-mono text-slate-400">
            Type <span className="text-cyan-300 font-bold">&apos;help&apos;</span> to see available commands or click the quick action chips below.
          </div>
        </div>
      ),
    },
  ];

  const [outputs, setOutputs] = useState<OutputItem[]>(initialOutputs);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [outputs]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    setHistory((prev) => [...prev, cmdStr]);
    setHistoryIdx(-1);

    const id = Date.now().toString();
    let response: React.ReactNode = null;

    switch (trimmed) {
      case "help":
        response = (
          <div className="space-y-2 text-xs sm:text-sm font-mono">
            <p className="text-slate-300 font-bold">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
              <div>
                <span className="text-cyan-300 font-bold">about</span> - Personal dossier &amp; education
              </div>
              <div>
                <span className="text-cyan-300 font-bold">exp</span> - Work experience &amp; systems
              </div>
              <div>
                <span className="text-cyan-300 font-bold">skills</span> - Tech stack matrix
              </div>
              <div>
                <span className="text-cyan-300 font-bold">contact</span> - Email &amp; social channels
              </div>
              <div>
                <span className="text-cyan-300 font-bold">resume</span> - Download PDF resume
              </div>
              <div>
                <span className="text-cyan-300 font-bold">gui</span> - Switch to 3D flagship version
              </div>
              <div>
                <span className="text-cyan-300 font-bold">theme</span> - Toggle cyan/matrix/amber
              </div>
              <div>
                <span className="text-cyan-300 font-bold">clear</span> - Clear terminal buffer
              </div>
            </div>
          </div>
        );
        break;

      case "about":
        response = (
          <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-300">
            <p className="text-cyan-300 font-bold">== PERSONAL PROFILE ==</p>
            <p>• Name: Suradach Kanphaisit (Dach)</p>
            <p>• Role: Senior Software Developer</p>
            <p>• Birthday: April 3, 1998 (Bangkok, Thailand)</p>
            <p>• Military Status: Conscripted</p>
            <p className="text-cyan-300 font-bold mt-2">== ACADEMIC BACKGROUND ==</p>
            <p>• University: Pibulsongkram Rajabhat University (2015-2019)</p>
            <p className="text-slate-400 pl-4">Degree: B.Eng in Computer Engineering | GPA: 3.14</p>
            <p>• High School: Nabot Pittayakhom School (2009-2015)</p>
            <p className="text-slate-400 pl-4">Major: Science &amp; Mathematics | GPA: 3.64</p>
            <p className="text-cyan-300 font-bold mt-2">== HOBBIES &amp; INTERESTS ==</p>
            <p>• Sports: Football</p>
            <p>• Gaming: Dota2, Valorant</p>
            <p>• Music: ACϟDC, Guns N&apos; Roses, BTS, BlackPink, NewJeans</p>
          </div>
        );
        break;

      case "exp":
      case "experience":
        response = (
          <div className="space-y-3 text-xs sm:text-sm font-mono text-slate-300">
            <p className="text-cyan-300 font-bold">== CAREER HISTORY ==</p>
            <div>
              <p className="font-bold text-white">Company: O S D Co., Ltd. (Apr 2020 – Present)</p>
              <p className="text-cyan-400">Position: Full Time: Senior Software Developer (4+ Years)</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-slate-200">Core Systems Delivered:</p>
              <p>1. <span className="text-white font-bold">CRM Platform:</span> NestJS, ReactJS, Antd, TypeScript, PostgreSQL, MongoDB, Prisma</p>
              <p>2. <span className="text-white font-bold">DBMS Web App:</span> Node.js, React, PostgreSQL, MongoDB, TypeORM</p>
              <p>3. <span className="text-white font-bold">LINE &amp; Messenger Gateway:</span> Real-time chat webhooks, Node.js, React, MongoDB</p>
              <p>4. <span className="text-white font-bold">RESTful API Infrastructure:</span> Node.js, Express, Sequelize, MySQL</p>
            </div>
          </div>
        );
        break;

      case "skills":
        response = (
          <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-300">
            <p className="text-cyan-300 font-bold">== TECHNICAL STACK ==</p>
            <p><span className="text-white font-semibold">Languages:</span> JavaScript, TypeScript, Java, PHP, HTML, CSS, SQL</p>
            <p><span className="text-white font-semibold">Frameworks:</span> NestJS, Next.js, ReactJS, Ant Design, Tailwind CSS</p>
            <p><span className="text-white font-semibold">Databases &amp; ORM:</span> PostgreSQL, MongoDB, MySQL, Redis, Prisma, TypeORM, Sequelize</p>
            <p><span className="text-white font-semibold">DevOps &amp; Cloud:</span> Docker, Kubernetes (K8s), AWS EC2, Nginx, Apache, Linux CLI</p>
            <p><span className="text-white font-semibold">Tools:</span> VS Code, Git, GitHub, Postman, DBeaver, Studio3T, Figma</p>
          </div>
        );
        break;

      case "contact":
        response = (
          <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-300">
            <p className="text-cyan-300 font-bold">== TRANSMISSION CHANNELS ==</p>
            <p>• Email: <a href="mailto:suradach.kan@gmail.com" className="text-cyan-400 underline">suradach.kan@gmail.com</a></p>
            <p>• LinkedIn: <a href="https://www.linkedin.com/in/suradachk" target="_blank" rel="noreferrer" className="text-cyan-400 underline">linkedin.com/in/suradachk</a></p>
            <p>• GitHub: <a href="https://github.com/suradachk" target="_blank" rel="noreferrer" className="text-cyan-400 underline">github.com/suradachk</a></p>
            <p>• Website: <a href="https://suradachk.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline">suradachk.com</a></p>
          </div>
        );
        break;

      case "resume":
        response = (
          <div className="text-xs sm:text-sm font-mono text-emerald-300 flex items-center gap-2">
            <span>Initiating download for suradachk-resume.pdf...</span>
            <a
              href="/api/resume"
              target="_blank"
              download="suradachk.pdf"
              className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400 underline"
            >
              Click here if download doesn&apos;t start automatically
            </a>
          </div>
        );
        if (typeof window !== "undefined") {
          window.open("/api/resume", "_blank");
        }
        break;

      case "gui":
      case "3d":
        response = (
          <div className="text-xs sm:text-sm font-mono text-cyan-300">
            Switching interface mode to 3D Cyberpunk...
          </div>
        );
        setTimeout(() => {
          window.location.href = "/";
        }, 600);
        break;

      case "theme":
        const nextTheme = theme === "cyan" ? "matrix" : theme === "matrix" ? "amber" : "cyan";
        setTheme(nextTheme);
        response = (
          <div className="text-xs sm:text-sm font-mono text-slate-300">
            Terminal theme set to: <span className="font-bold uppercase text-white">{nextTheme}</span>
          </div>
        );
        break;

      case "clear":
        setOutputs([]);
        setInputVal("");
        return;

      case "sudo":
      case "sudo rm -rf /":
        response = (
          <div className="text-xs sm:text-sm font-mono text-red-400">
            Permission denied: Dach is watching you. Nice try!
          </div>
        );
        break;

      default:
        response = (
          <div className="text-xs sm:text-sm font-mono text-red-400">
            Command not recognized: &apos;{cmdStr}&apos;. Type &apos;help&apos; to inspect available routines.
          </div>
        );
        break;
    }

    setOutputs((prev) => [...prev, { id, command: cmdStr, content: response }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(history[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= history.length) {
        setHistoryIdx(-1);
        setInputVal("");
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx]);
      }
    }
  };

  const quickChips = ["help", "about", "skills", "exp", "contact", "resume", "gui"];

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-200 p-4 sm:p-8 flex flex-col justify-between font-mono relative overflow-hidden">
      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full mb-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass-panel text-xs text-slate-300 hover:text-white border border-white/10 hover:border-cyan-400 transition-all"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Exit to 3D Portfolio</span>
        </Link>

        {/* Theme Toggles */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 hidden sm:inline">Theme:</span>
          <button
            onClick={() => setTheme("cyan")}
            className={`px-2 py-0.5 rounded text-[11px] ${
              theme === "cyan" ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400" : "text-slate-400"
            }`}
          >
            Cyan
          </button>
          <button
            onClick={() => setTheme("matrix")}
            className={`px-2 py-0.5 rounded text-[11px] ${
              theme === "matrix" ? "bg-emerald-500/30 text-emerald-300 border border-emerald-400" : "text-slate-400"
            }`}
          >
            Matrix
          </button>
          <button
            onClick={() => setTheme("amber")}
            className={`px-2 py-0.5 rounded text-[11px] ${
              theme === "amber" ? "bg-amber-500/30 text-amber-300 border border-amber-400" : "text-slate-400"
            }`}
          >
            Amber
          </button>
        </div>
      </div>

      {/* Terminal Window Box */}
      <div
        className={`max-w-5xl mx-auto w-full flex-1 rounded-2xl bg-[#090d16]/95 border ${themeColors[theme].border} ${themeColors[theme].glow} flex flex-col overflow-hidden shadow-2xl relative`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Window Chrome Header */}
        <div className="px-4 py-3 bg-[#0c121e] border-b border-white/10 flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            <span className="ml-2 text-xs text-slate-400 font-mono">
              dach@suradachk-macbook-pro:~ (zsh)
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="hidden sm:inline">UTF-8</span>
            <span className="text-emerald-400">● LIVE</span>
          </div>
        </div>

        {/* Quick Action Chips Bar */}
        <div className="px-4 py-2 bg-slate-900/60 border-b border-white/5 flex flex-wrap items-center gap-1.5 overflow-x-auto">
          <span className="text-[11px] text-slate-500 mr-1">Routines:</span>
          {quickChips.map((chip) => (
            <button
              key={chip}
              onClick={() => executeCommand(chip)}
              className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-[11px] font-mono text-cyan-300 border border-slate-700/60 hover:border-cyan-400 transition-all"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Output Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[62vh]">
          {outputs.map((out) => (
            <div key={out.id} className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <span className={themeColors[theme].prompt}>dach@portfolio:~$</span>
                <span className="text-white font-bold">{out.command}</span>
              </div>
              <div className="pl-3 sm:pl-4 border-l border-white/10">{out.content}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 text-xs sm:text-sm pt-2">
            <span className={themeColors[theme].prompt}>dach@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck={false}
              className="flex-1 bg-transparent text-white font-mono outline-none border-none caret-cyan-400 text-xs sm:text-sm"
              placeholder="Type command ('help')..."
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Footer Info */}
      <div className="max-w-5xl mx-auto w-full mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>Interactive Shell v3.0</span>
        <span>Press Enter to dispatch command</span>
      </div>

      {/* Universal Version Switcher HUD */}
      <VersionSwitcher />
    </div>
  );
}
