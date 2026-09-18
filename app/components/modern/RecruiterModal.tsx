"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faXmark,
  faDownload,
  faCopy,
  faCheck,
  faEnvelope,
  faBriefcase,
  faGraduationCap,
  faCheckCircle,
  faServer,
  faDatabase,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import dayjs from "dayjs";

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecruiterModal({ isOpen, onClose }: RecruiterModalProps) {
  const [copied, setCopied] = useState(false);
  const yearsExp = dayjs().diff(dayjs("2020-04-01"), "year");
  const email = "suradach.kan@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#0d1322] border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden">
        {/* Modal Header Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-cyan-950/60 via-slate-900/80 to-purple-950/60 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 text-sm">
              <FontAwesomeIcon icon={faBolt} />
            </div>
            <div>
              <h3 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                <span>RECRUITER 30-SECOND DOSSIER</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  AVAILABLE
                </span>
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                Executive summary for Hiring Managers &amp; Tech Leads
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} className="text-sm" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto font-mono text-xs">
          {/* Candidate Quick Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-white/10">
            <div>
              <h4 className="text-xl font-bold text-white font-sans">
                Suradach Kanphaisit (Dach)
              </h4>
              <p className="text-cyan-400 font-medium text-xs mt-0.5">
                Senior Software Developer • Full-Stack Engineer
              </p>
              <p className="text-slate-400 text-[11px] mt-1">
                Bangkok, Thailand (GMT+7) • B.Eng Computer Engineering (GPA 3.14)
              </p>
            </div>

            <div className="text-right sm:border-l sm:border-slate-800 sm:pl-4 self-start sm:self-auto">
              <span className="text-2xl font-extrabold text-white block">
                {yearsExp}+ Years
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                Full-Time Experience
              </span>
            </div>
          </div>

          {/* 4 Pillars Why Hire Suradach */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
              Key Value &amp; Engineering Strengths:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <FontAwesomeIcon icon={faServer} />
                  <span>Full-Stack Mastery</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  Deep experience with <strong>NestJS, React, Next.js, and TypeScript</strong> powering enterprise-scale platforms.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-purple-300 font-bold">
                  <FontAwesomeIcon icon={faDatabase} />
                  <span>Dual-DB Architecture</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  ACID transactional integrity in <strong>PostgreSQL</strong> paired with dynamic pipeline documents in <strong>MongoDB</strong>.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-emerald-300 font-bold">
                  <FontAwesomeIcon icon={faUsers} />
                  <span>Senior Mentorship</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  Trained and coached junior software engineers in clean code, design patterns, and code review standards.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <FontAwesomeIcon icon={faBriefcase} />
                  <span>Production Ownership</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  End-to-end ownership of 4 major production systems at O S D Co., Ltd. with sub-second latency and 99.9% uptime.
                </p>
              </div>
            </div>
          </div>

          {/* Primary Tech Stack Match */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
              Core Technical Stack:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                "TypeScript",
                "NestJS",
                "ReactJS",
                "Next.js",
                "Node.js",
                "PostgreSQL",
                "MongoDB",
                "Prisma ORM",
                "TypeORM",
                "Docker",
                "Kubernetes",
                "Redis",
                "MySQL",
                "AWS EC2",
                "Tailwind CSS",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-slate-800 text-cyan-300 font-bold text-[11px] border border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Recruiter Quick Actions Bar */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="/api/resume"
                target="_blank"
                download="suradachk-resume.pdf"
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs tracking-wide shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faDownload} />
                <span>DOWNLOAD FULL RESUME (PDF)</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} className={copied ? "text-emerald-400" : ""} />
                <span>{copied ? "EMAIL COPIED!" : "COPY EMAIL ADDRESS"}</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 pt-2 text-slate-400">
              <a
                href="https://www.linkedin.com/in/suradachk"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              >
                <FontAwesomeIcon icon={faLinkedin} className="text-sm" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href="https://github.com/suradachk"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              >
                <FontAwesomeIcon icon={faGithub} className="text-sm" />
                <span>GitHub Repositories</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
                <span>suradach.kan@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
