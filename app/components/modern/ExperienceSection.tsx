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
  faAward,
  faLayerGroup,
  faShieldHalved,
  faNetworkWired,
  faCloud,
  faArrowRight,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { IUserData } from "../../types/user-type";
import dayjs from "dayjs";

interface ExperienceProps {
  user?: IUserData;
}

export default function ExperienceSection({ user }: ExperienceProps) {
  const exp = user?.experience?.[0];
  const yearsExp = dayjs().diff(dayjs("2020-04-01"), "year");

  const projects = [
    {
      title: "Enterprise CRM Web Application",
      badge: "Core Flagship System",
      impactMetric: "40% Error Reduction",
      scale: "Enterprise Business Users",
      icon: faServer,
      color: "from-cyan-500 to-blue-600",
      textColor: "text-cyan-400",
      borderColor: "hover:border-cyan-500/40",
      description:
        "Architected and maintained a high-throughput multi-tenant Customer Relationship Management (CRM) system handling complex client pipelines, business workflows, and real-time dashboard analytics.",
      stack: ["NestJS", "ReactJS (Antd)", "TypeScript", "PostgreSQL", "MongoDB", "Prisma"],
      highlights: [
        "Constructed maintainable modular microservices using NestJS dependency injection",
        "Pioneered Dual-DB Architecture: Relational financial records in PostgreSQL + dynamic pipeline documents in MongoDB",
        "Designed strictly typed Prisma ORM data models, cutting runtime type and query bugs by 40%",
        "Implemented granular Role-Based Access Control (RBAC) across organizational tiers",
      ],
    },
    {
      title: "Enterprise DBMS Web Application",
      badge: "Data Infrastructure",
      impactMetric: "Sub-Second Query Latency",
      scale: "Millions of Records",
      icon: faDatabase,
      color: "from-purple-500 to-indigo-600",
      textColor: "text-purple-400",
      borderColor: "hover:border-purple-500/40",
      description:
        "Maintained an internal Database Management System (DBMS) web platform providing intuitive querying, automated schema migrations, and reliable multi-cluster data synchronization.",
      stack: ["Node.js", "React", "PostgreSQL", "MongoDB", "TypeORM"],
      highlights: [
        "Implemented high-efficiency parameterized query builders and migrations via TypeORM",
        "Optimized frontend query inspection and execution dashboards with React",
        "Guaranteed continuous 99.9% uptime and data integrity across PostgreSQL and MongoDB clusters",
      ],
    },
    {
      title: "LINE & Messenger Omni-Channel Gateway",
      badge: "Real-Time Ingestion",
      impactMetric: "Zero Message Drop Rate",
      scale: "Thousands of Daily Events",
      icon: faComments,
      color: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-400",
      borderColor: "hover:border-emerald-500/40",
      description:
        "Engineered real-time chat webhooks and automated bot integration connecting Facebook Messenger and LINE Messaging APIs directly into centralized customer support channels.",
      stack: ["Node.js", "React", "MongoDB", "LINE Messaging API", "Facebook Graph API"],
      highlights: [
        "High-throughput webhook validation and event queue processing handling thousands of daily customer inquiries",
        "Seamless webhook signature verification, session storage, and automated intent routing in MongoDB",
        "Built responsive agent chat cockpit in React for customer service operators",
      ],
    },
    {
      title: "Scalable RESTful API Infrastructure",
      badge: "Backend Microservices",
      impactMetric: "~99.9% SLA Uptime",
      scale: "High-Concurrency Requests",
      icon: faCode,
      color: "from-amber-500 to-orange-600",
      textColor: "text-amber-400",
      borderColor: "hover:border-amber-500/40",
      description:
        "Engineered resilient, high-speed RESTful microservices with parameterized in-memory caching and secure JWT authentication pipelines.",
      stack: ["Node.js", "Express", "Sequelize", "MySQL", "JWT"],
      highlights: [
        "Engineered RESTful endpoints adhering strictly to OpenAPI & contract-first design standards",
        "Designed normalized relational schemas and B-tree indexing strategies in MySQL via Sequelize",
        "Minimized API response latency via Redis caching, payload compression, and request rate-limiting",
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <FontAwesomeIcon icon={faBriefcase} />
            <span>Production Proven &bull; Senior Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Work{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Experience &amp; Systems
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base max-w-2xl font-light">
            {yearsExp}+ years of proven track record delivering enterprise-grade platforms,
            pioneering Dual-DB architectures, and mentoring engineers.
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
                  <span className="px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs font-semibold border border-purple-500/30">
                    Senior Level
                  </span>
                </div>
                <p className="text-lg text-cyan-400 font-mono font-medium mt-1">
                  Senior Software Developer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs md:text-sm text-slate-300 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-700/60 self-start lg:self-auto">
              <FontAwesomeIcon icon={faCalendarCheck} className="text-cyan-400" />
              <span>{exp?.date || "Apr 2020 – Present"}</span>
              <span className="text-slate-500">•</span>
              <span className="text-cyan-300 font-bold">
                {yearsExp}+ Years Continuous Delivery
              </span>
            </div>
          </div>

          {/* Core Responsibilities Grid */}
          <div className="pt-6">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faAward} className="text-purple-400" />
              <span>Senior Engineering Responsibilities &amp; Leadership:</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {(
                exp?.responsibilities || [
                  "End-to-End Ownership: Architecting, developing, and maintaining high-concurrency production systems with strict SLA targets",
                  "Mentorship & Leadership: Training junior software engineers in TypeScript, clean architecture patterns, and rigorous code reviews",
                  "Technical Problem Solving: Compiling, analysing, and resolving complex database performance bottlenecks and service incidents",
                  "Architecture Strategy: Formulating Technical Decision Records (ADRs) and collaborating closely with cross-functional product teams",
                  "Industry Best Practices: Continuously modernizing codebase with latest frameworks, microservices patterns, and DevOps tooling",
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
                  <span className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                    {resp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual System Architecture Topology (Technical Lead Highlight) */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-cyan-500/20 mb-12 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <FontAwesomeIcon icon={faNetworkWired} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  System Architecture Topology
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Full-stack flow standard across production systems
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-cyan-300 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 self-start sm:self-auto">
              Dual-DB + Microservices
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-cyan-400 uppercase font-bold block">
                01. Client Layer
              </span>
              <p className="text-white font-bold text-xs">React &bull; Next.js</p>
              <p className="text-slate-400 text-[11px]">Ant Design &bull; Tailwind &bull; Realtime Webhooks</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-purple-400 uppercase font-bold block">
                02. API Gateway
              </span>
              <p className="text-white font-bold text-xs">NestJS &bull; Node.js</p>
              <p className="text-slate-400 text-[11px]">Dependency Injection &bull; RBAC Guards</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-emerald-400 uppercase font-bold block">
                03. Cache &amp; Queue
              </span>
              <p className="text-white font-bold text-xs">Redis &bull; Event Ingestion</p>
              <p className="text-slate-400 text-[11px]">Rate Limiting &bull; Payload Caching</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-amber-400 uppercase font-bold block">
                04. Dual-DB Engine
              </span>
              <p className="text-white font-bold text-xs">Postgres + Mongo</p>
              <p className="text-slate-400 text-[11px]">Prisma &bull; TypeORM &bull; ACID Transactions</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] text-blue-400 uppercase font-bold block">
                05. Infrastructure
              </span>
              <p className="text-white font-bold text-xs">Docker &bull; K8s</p>
              <p className="text-slate-400 text-[11px]">AWS EC2 &bull; Nginx &bull; CI/CD Pipelines</p>
            </div>
          </div>
        </div>

        {/* Project Architecture Showcase */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Featured Production Systems &amp; Impact
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-mono">
                Key software platforms built, scaled, and maintained during tenure
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.title}
                className={`glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 ${proj.borderColor} transition-all duration-300 flex flex-col justify-between group`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-3 mb-4">
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
                          {proj.badge} &bull; {proj.scale}
                        </span>
                      </div>
                    </div>

                    {/* Impact Metric Pill */}
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shrink-0">
                      {proj.impactMetric}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-light">
                    {proj.description}
                  </p>

                  {/* Highlights (STAR Format) */}
                  <div className="space-y-2 mb-5">
                    {proj.highlights.map((item, hi) => (
                      <div
                        key={hi}
                        className="flex items-start gap-2 text-xs text-slate-300 font-mono"
                      >
                        <span className="text-cyan-400 font-bold mt-0.5">&bull;</span>
                        <span className="leading-relaxed">{item}</span>
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
