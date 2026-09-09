"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faDownload,
  faEnvelope,
  faCheckCircle,
  faBriefcase,
  faGraduationCap,
  faCode,
  faServer,
  faShieldHalved,
  faFutbol,
  faGamepad,
  faMusic,
  faCopy,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { IUserData } from "../types/user-type";
import VersionSwitcher from "../components/VersionSwitcher";
import dayjs from "dayjs";

export default function MinimalPage() {
  const [user, setUser] = useState<IUserData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/user");
        if (data) setUser(data);
      } catch (e) {
        console.error("Failed to load user data", e);
      }
    };
    fetchUser();
  }, []);

  const email = user?.contact.email || "suradach.kan@gmail.com";
  const yearsExp = dayjs().diff(dayjs("2020-04-01"), "year");

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const projects = [
    {
      name: "Enterprise CRM Platform",
      stack: "NestJS • ReactJS • TypeScript • PostgreSQL • MongoDB • Prisma",
      desc: "Full-lifecycle CRM handling client pipelines, transactional data, and real-time dashboard analytics.",
    },
    {
      name: "Enterprise DBMS Web App",
      stack: "Node.js • React • PostgreSQL • MongoDB • TypeORM",
      desc: "High-concurrency database query dashboard and schema migration service.",
    },
    {
      name: "LINE & Messenger Omni-Channel Gateway",
      stack: "Node.js • React • MongoDB • Webhooks & Graph APIs",
      desc: "Real-time chat ingestion and automated customer service webhook pipelines.",
    },
    {
      name: "Scalable RESTful API Infrastructure",
      stack: "Node.js • Express • Sequelize • MySQL",
      desc: "Performant microservices with normalized relational schemas and parameterized caching.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-200 py-12 px-4 sm:px-6 lg:px-8 selection:bg-white/20 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Navigation & Version Jump */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Switch to 3D Cyberpunk Edition</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Minimalist Bento v4.0</span>
          </div>
        </div>

        {/* Header Profile Section */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Senior Software Developer • Available for Opportunities</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Suradach Kanphaisit
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl font-light leading-relaxed">
            Full-stack engineer with {yearsExp}+ years of production experience building
            scalable NestJS microservices, responsive React/Next.js architectures,
            and reliable database systems at O S D Co., Ltd.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="/api/resume"
              target="_blank"
              download="suradachk-resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-slate-950 font-mono text-xs font-bold hover:bg-slate-200 transition-all"
            >
              <FontAwesomeIcon icon={faDownload} />
              <span>Download Resume</span>
            </a>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-xs text-slate-200 transition-all"
            >
              <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
              <span>{copied ? "Copied to clipboard!" : email}</span>
            </button>

            <a
              href="https://github.com/suradachk"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all text-xs"
              title="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} className="text-base" />
            </a>

            <a
              href="https://www.linkedin.com/in/suradachk"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all text-xs"
              title="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} className="text-base" />
            </a>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Key Metrics */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              Experience
            </span>
            <div className="my-4">
              <span className="text-5xl font-extrabold text-white font-mono">
                {yearsExp}+
              </span>
              <span className="text-sm text-slate-400 block mt-1 font-mono">
                Years of Continuous Production Delivery
              </span>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Since April 2020 at O S D Co., Ltd.
            </span>
          </div>

          {/* Card 2: Core Stack */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 md:col-span-2 flex flex-col justify-between">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              Core Technical Competencies
            </span>
            <div className="flex flex-wrap gap-2 my-4">
              {[
                "TypeScript",
                "JavaScript",
                "NestJS",
                "Node.js",
                "ReactJS",
                "Next.js",
                "PostgreSQL",
                "MongoDB",
                "Prisma",
                "TypeORM",
                "Docker",
                "Kubernetes",
                "AWS EC2",
                "Redis",
                "Tailwind CSS",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Type-safe architectures, microservices, containerization
            </span>
          </div>

          {/* Card 3: Work Experience & Leadership (Full width) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 md:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <FontAwesomeIcon icon={faBriefcase} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    O S D Co., Ltd.
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    Senior Software Developer • Full-Time (Apr 2020 – Present)
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/5 text-slate-300 text-xs font-mono border border-white/10 self-start sm:self-auto">
                {yearsExp}+ Years Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.name}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 hover:border-white/20 transition-all"
                >
                  <h4 className="font-bold text-white text-sm">{proj.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {proj.desc}
                  </p>
                  <p className="text-[11px] font-mono text-slate-500 pt-1">
                    {proj.stack}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <h5 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Core Responsibilities:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-400 text-xs" />
                  <span>Mentoring junior software engineers</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-400 text-xs" />
                  <span>Ownership of production platforms</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-400 text-xs" />
                  <span>Architectural design &amp; code reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-400 text-xs" />
                  <span>Troubleshooting service incidents</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Academic Background */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faGraduationCap} className="text-slate-400" />
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300">
                Education
              </h3>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Pibulsongkram Rajabhat University
                  </h4>
                  <p className="text-slate-400 mt-0.5">
                    Bachelor&apos;s Degree • Computer Engineering
                  </p>
                  <p className="text-slate-500 text-[11px] mt-1">
                    July 2015 – December 2019
                  </p>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-white/10 text-white font-bold">
                  GPA 3.14
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-white text-sm">
                    Nabot Pittayakhom School
                  </h4>
                  <p className="text-slate-400 mt-0.5">
                    High School Science &amp; Mathematics
                  </p>
                  <p className="text-slate-500 text-[11px] mt-1">
                    May 2009 – May 2015
                  </p>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-white/10 text-white font-bold">
                  GPA 3.64
                </span>
              </div>
            </div>
          </div>

          {/* Card 5: Personal & Status */}
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faShieldHalved} className="text-slate-400" />
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-300">
                Personal
              </h3>
            </div>
            <div className="space-y-2 text-xs font-mono text-slate-400">
              <p>• Nickname: Dach</p>
              <p>• Birthday: 03 April 1998</p>
              <p>• Military: Conscripted</p>
              <p>• Sports: Football</p>
              <p>• Games: Dota2, Valorant</p>
              <p>• Music: ACϟDC, Guns N&apos; Roses, BTS, NewJeans</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <span>&copy; {new Date().getFullYear()} Suradach Kanphaisit • Minimal Edition</span>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-white transition-colors">3D Cyberpunk</Link>
            <Link href="/terminal" className="hover:text-white transition-colors">Terminal</Link>
            <Link href="/classic" className="hover:text-white transition-colors">Classic</Link>
          </div>
        </div>
      </div>

      {/* Universal Version Switcher HUD */}
      <VersionSwitcher />
    </div>
  );
}
