"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faClock, faHeart, faTerminal } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to GMT+7 (Bangkok / Asia/Bangkok)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Bangkok",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeString(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-[#04060a] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          {/* Brand & Status */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 text-white font-mono font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <FontAwesomeIcon icon={faTerminal} className="text-xs" />
              </div>
              <span>
                SURADACH<span className="text-cyan-400">.DEV</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Senior Software Developer • Enterprise Systems Architecture
            </p>
          </div>

          {/* Live Bangkok Time Indicator */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-full glass-panel border border-white/10 font-mono text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">Bangkok (GMT+7):</span>
            <span className="text-cyan-300 font-bold tracking-wider">
              {timeString || "00:00:00"}
            </span>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/suradachk"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-400 transition-all"
              title="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} className="text-lg" />
            </a>
            <a
              href="https://www.linkedin.com/in/suradachk"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
              title="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} className="text-lg" />
            </a>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all ml-2"
              title="Scroll to Top"
            >
              <FontAwesomeIcon icon={faArrowUp} className="text-sm" />
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Suradach Kanphaisit. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Engineered with <span className="text-cyan-400">Three.js</span> &amp;{" "}
            <span className="text-purple-400">Next.js</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
