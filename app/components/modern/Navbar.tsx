"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faDownload, faTerminal } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faApple } from "@fortawesome/free-brands-svg-icons";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine active section
      const sections = ["about", "experience", "skills", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#06090e]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:border-cyan-400 transition-all">
            <FontAwesomeIcon icon={faTerminal} className="text-base" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-base font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              SURADACH<span className="text-cyan-400">.DEV</span>
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono text-slate-400">
                Senior Dev
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full glass-panel border border-white/10">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.name.toLowerCase();
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-1.5 rounded-full text-sm font-mono transition-all ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 font-semibold shadow-[0_0_12px_rgba(0,240,255,0.3)] border border-cyan-500/30"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <Link
            href="/apple"
            className="ml-1 px-3 py-1 rounded-full text-xs font-mono text-slate-200 hover:text-white hover:bg-white/10 border border-white/20 transition-all flex items-center gap-1.5"
            title="Open Apple.com Keynote Edition"
          >
            <FontAwesomeIcon icon={faApple} className="text-xs" />
            <span>APPLE</span>
          </Link>
          <Link
            href="/galaxy"
            className="px-3 py-1 rounded-full text-xs font-mono text-purple-300 hover:text-white hover:bg-purple-500/20 border border-purple-500/30 transition-all flex items-center gap-1.5"
            title="Open 3D Galaxy Portfolio"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span>GALAXY</span>
          </Link>
          <Link
            href="/terminal"
            className="px-3 py-1 rounded-full text-xs font-mono text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/15 border border-emerald-500/30 transition-all flex items-center gap-1.5"
            title="Open Interactive Terminal Portfolio"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>CLI</span>
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/suradachk"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg glass-panel flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-400 transition-all"
            title="GitHub Profile"
          >
            <FontAwesomeIcon icon={faGithub} className="text-lg" />
          </a>
          <a
            href="https://www.linkedin.com/in/suradachk"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg glass-panel flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all"
            title="LinkedIn Profile"
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-lg" />
          </a>
          <a
            href="/api/resume"
            target="_blank"
            download="suradachk-resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-mono font-bold tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.35)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <FontAwesomeIcon icon={faDownload} />
            <span>RESUME</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="/api/resume"
            target="_blank"
            download="suradachk-resume.pdf"
            className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs"
            title="Download Resume"
          >
            <FontAwesomeIcon icon={faDownload} />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg glass-panel text-slate-300 hover:text-white border border-white/10"
            aria-label="Toggle Navigation Menu"
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} className="text-lg w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-[#080c14]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-mono text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300 border border-transparent hover:border-cyan-500/20 transition-all"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-white/10 flex items-center gap-3">
              <a
                href="https://github.com/suradachk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 rounded-lg glass-panel flex items-center justify-center gap-2 text-xs font-mono text-slate-300"
              >
                <FontAwesomeIcon icon={faGithub} />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/suradachk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 rounded-lg glass-panel flex items-center justify-center gap-2 text-xs font-mono text-slate-300"
              >
                <FontAwesomeIcon icon={faLinkedin} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
