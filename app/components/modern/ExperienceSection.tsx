"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faBuilding,
  faCalendarCheck,
  faCheckCircle,
  faCode,
  faDatabase,
  faComments,
  faServer,
  faChevronRight,
  faAward,
} from "@fortawesome/free-solid-svg-icons";
import { IUserData } from "../../types/user-type";
import dayjs from "dayjs";

interface ExperienceProps {
  user?: IUserData;
}

export default function ExperienceSection({ user }: ExperienceProps) {
  const exp = user?.experience?.[0];
  const [selectedHighlight, setSelectedHighlight] = useState<number>(0);

  const projects = [
    {
      title: "Enterprise CRM Web Application",
      badge: "Core Enterprise Project",
      icon: faServer,
      color: "from-cyan-500 to-blue-600",
      textColor: "text-cyan-400",
      borderColor: "hover:border-cyan-500/40",
      description:
        "Architected and maintained a full-featured Customer Relationship Management (CRM) system handling complex client pipelines, business workflows, and real-time dashboard analytics.",
      stack: ["NestJS", "ReactJS (Antd)", "TypeScript", "PostgreSQL", "MongoDB", "Prisma"],
      highlights: [
        "Constructed maintainable modular services using NestJS architecture with dependency injection",
        "Dual-database strategy: Relational transactional records in PostgreSQL + dynamic documents in MongoDB",
        "Designed type-safe data access models with Prisma ORM",
      ],
    },
    {
      title: "Enterprise DBMS Web Application",
      badge: "Data Infrastructure",
      icon: faDatabase,
      color: "from-purple-500 to-indigo-600",
      textColor: "text-purple-400",
      borderColor: "hover:border-purple-500/40",
      description:
        "Maintained an internal Database Management System (DBMS) web platform providing intuitive querying, schema migrations, and reliable data synchronization.",
      stack: ["Node.js", "React", "PostgreSQL", "MongoDB", "TypeORM"],
      highlights: [
        "Implemented robust database queries and migrations using TypeORM",
        "Optimized frontend query inspection dashboards with React",
        "Guaranteed uptime and integrity across PostgreSQL and MongoDB clusters",
      ],
    },
    {
      title: "LINE & Messenger Omni-Channel Integration",
      badge: "Messaging & Bot Services",
      icon: faComments,
      color: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-400",
      borderColor: "hover:border-emerald-500/40",
      description:
        "Engineered real-time chat webhooks and bot integration connecting Facebook Messenger and LINE Messaging APIs directly into customer support channels.",
      stack: ["Node.js", "React", "MongoDB", "LINE Messaging API", "Facebook Graph API"],
      highlights: [
        "Real-time event processing for thousands of incoming customer inquiries",
        "Seamless webhook validation, session storage, and automated routing in MongoDB",
        "Built responsive agent chat cockpit in React",
      ],
    },
    {
      title: "Scalable RESTful API Infrastructure",
      badge: "Backend Microservices",
      icon: faCode,
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-400",
      borderColor: "hover:border-amber-500/40",
      description:
        "Engineered resilient, high-speed RESTful microservices with parameterized caching and secure authentication pipelines.",
      stack: ["Node.js", "Express", "Sequelize", "MySQL", "JWT"],
      highlights: [
        "Engineered RESTful endpoints adhering strictly to OpenAPI specifications",
        "Designed normalized schema and indexing strategies in MySQL via Sequelize",
        "Achieved rapid response times with middleware caching and request throttling",
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <FontAwesomeIcon icon={faBriefcase} />
            <span>Career & Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Work{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base max-w-2xl font-light">
            4+ years of proven track record delivering and maintaining
            production-grade applications, driving technical standards, and
            mentoring engineers.
          </p>
        </div>

        {/* Company & Role Header Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 md:p-10 border border-white/10 mb-12 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                <FontAwesomeIcon icon={faBuilding} className="text-2xl" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {exp?.company || "O S D Co., Ltd."}
                  </h3>
                  <span className="px-3 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-semibold border border-cyan-500/30">
                    Full-Time
                  </span>
                </div>
                <p className="text-lg text-cyan-400 font-mono font-medium mt-1">
                  {exp?.position || "Senior Software Developer"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs md:text-sm text-slate-300 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700/60 self-start lg:self-auto">
              <FontAwesomeIcon icon={faCalendarCheck} className="text-cyan-400" />
              <span>{exp?.date || "Apr 2020 – Present"}</span>
              <span className="text-slate-500">•</span>
              <span className="text-cyan-300 font-bold">
                {dayjs().diff(dayjs("2020-04-01"), "year")}+ Years
              </span>
            </div>
          </div>

          {/* Core Responsibilities Grid */}
          <div className="pt-6">
            <h4 className="text-sm font-mono text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faAward} className="text-purple-400" />
              <span>Leadership & Core Responsibilities:</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {(
                exp?.responsibilities || [
                  "Staying up to date with the software development industry and studying latest programming techniques",
                  "Training and mentoring junior software engineers on coding standards and architecture",
                  "Compiling, analysing and summarising information regarding development and service issues",
                  "Taking end-to-end ownership of developed applications and production systems",
                  "Active brainstorming and architectural roadmapping with cross-functional teams",
                ]
              ).map((resp, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/80"
                >
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-emerald-400 text-sm mt-1 shrink-0"
                  />
                  <span className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {resp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Architecture Showcase */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Featured Production Systems
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                Key software platforms built and maintained during tenure
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((proj, idx) => (
              <div
                key={proj.title}
                className={`glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 ${proj.borderColor} transition-all duration-300 flex flex-col justify-between group`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${proj.color} p-0.5`}
                      >
                        <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white">
                          <FontAwesomeIcon icon={proj.icon} className="text-sm" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">
                          {proj.title}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-400">
                          {proj.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {proj.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-5">
                    {proj.highlights.map((item, hi) => (
                      <div
                        key={hi}
                        className="flex items-start gap-2 text-xs text-slate-400 font-mono"
                      >
                        <span className="text-cyan-400 font-bold">&bull;</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="pt-4 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-slate-900/90 text-cyan-300 font-mono text-[11px] border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
