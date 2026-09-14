"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLayerGroup,
  faCube,
  faTerminal,
  faTableCellsLarge,
  faClockRotateLeft,
  faChevronUp,
  faChevronDown,
  faXmark,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { faApple } from "@fortawesome/free-brands-svg-icons";

export const PORTFOLIO_VERSIONS = [
  {
    id: "v6-apple",
    path: "/apple",
    name: "Apple Keynote",
    tag: "Titanium Pro Aesthetic",
    icon: faApple,
    color: "from-slate-200 via-slate-400 to-blue-500",
    badgeColor: "bg-slate-200/20 text-white border-slate-200/30",
  },
  {
    id: "v5-galaxy",
    path: "/galaxy",
    name: "Cosmic Galaxy",
    tag: "3D Universe & Warp Drive",
    icon: faRocket,
    color: "from-purple-500 via-indigo-500 to-cyan-400",
    badgeColor: "bg-purple-500/20 text-cyan-300 border-purple-500/30",
  },
  {
    id: "v2-3d",
    path: "/",
    name: "3D Cyberpunk",
    tag: "Three.js Flagship",
    icon: faCube,
    color: "from-cyan-400 to-blue-500",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  },
  {
    id: "v3-terminal",
    path: "/terminal",
    name: "Hacker Terminal",
    tag: "Interactive CLI",
    icon: faTerminal,
    color: "from-emerald-400 to-teal-500",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  {
    id: "v4-minimal",
    path: "/minimal",
    name: "Minimal Bento",
    tag: "Linear / Clean UI",
    icon: faTableCellsLarge,
    color: "from-purple-400 to-pink-500",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  },
  {
    id: "v1-classic",
    path: "/classic",
    name: "Classic 2023",
    tag: "Retro Tabs & Planet",
    icon: faClockRotateLeft,
    color: "from-amber-400 to-orange-500",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
];

export default function VersionSwitcher() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentVersion =
    PORTFOLIO_VERSIONS.find((v) => v.path === pathname) || PORTFOLIO_VERSIONS[0];

  return (
    <div className="fixed bottom-5 right-5 z-50 select-none">
      {/* Expanded Menu Modal / Dropdown */}
      {isOpen && (
        <div className="mb-3 w-80 p-4 rounded-2xl bg-[#0b0f19]/95 backdrop-blur-2xl border border-white/15 shadow-[0_12px_50px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                Portfolio Versions
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 rounded-md text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <FontAwesomeIcon icon={faXmark} className="text-xs" />
            </button>
          </div>

          <p className="text-[11px] text-slate-400 mb-3 font-mono leading-relaxed">
            Select a design system to explore this portfolio in different perspectives:
          </p>

          <div className="space-y-2">
            {PORTFOLIO_VERSIONS.map((ver) => {
              const isActive = pathname === ver.path;
              return (
                <Link
                  key={ver.id}
                  href={ver.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                    isActive
                      ? "bg-white/10 border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                      : "bg-slate-900/60 border-white/5 hover:border-white/20 hover:bg-slate-800/70"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${ver.color} flex items-center justify-center text-slate-950 text-xs shadow-sm`}
                    >
                      <FontAwesomeIcon icon={ver.icon} />
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`text-xs font-bold font-mono ${
                          isActive ? "text-cyan-300" : "text-white"
                        }`}
                      >
                        {ver.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {ver.tag}
                      </span>
                    </div>
                  </div>

                  {isActive ? (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/40">
                      CURRENT
                    </span>
                  ) : (
                    <span className="text-slate-500 text-xs font-mono">→</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Toggle Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0d1322]/90 backdrop-blur-xl border border-cyan-500/40 text-white shadow-[0_4px_25px_rgba(0,240,255,0.3)] hover:shadow-[0_4px_30px_rgba(0,240,255,0.5)] hover:border-cyan-400 hover:scale-105 active:scale-95 transition-all group"
      >
        <div
          className={`w-6 h-6 rounded-md bg-gradient-to-br ${currentVersion.color} flex items-center justify-center text-slate-950 text-[11px]`}
        >
          <FontAwesomeIcon icon={currentVersion.icon} />
        </div>
        <div className="flex flex-col items-start text-left">
          <span className="text-[9px] font-mono text-slate-400 tracking-wider uppercase leading-none">
            Style Switcher
          </span>
          <span className="text-xs font-mono font-bold text-white group-hover:text-cyan-300 transition-colors leading-tight">
            {currentVersion.name}
          </span>
        </div>
        <FontAwesomeIcon
          icon={isOpen ? faChevronDown : faChevronUp}
          className="text-xs text-slate-400 group-hover:text-white transition-transform"
        />
      </button>
    </div>
  );
}
