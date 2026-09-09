"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faCubes,
  faDatabase,
  faCloud,
  faScrewdriverWrench,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import TechSphere from "../three/TechSphere";
import { IUserData } from "../../types/user-type";

interface SkillsProps {
  user?: IUserData;
}

export default function SkillsSection({ user }: SkillsProps) {
  const [logos, setLogos] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const { data } = await axios.get("/api/logos");
        if (data) setLogos(data);
      } catch (e) {
        console.error("Failed to load logos", e);
      }
    };
    fetchLogos();
  }, []);

  const categories = [
    { id: "all", label: "All Skills", icon: faLayerGroup },
    { id: "languages", label: "Languages", icon: faCode },
    { id: "frameworks", label: "Frameworks & UI", icon: faCubes },
    { id: "database", label: "Databases & ORM", icon: faDatabase },
    { id: "devops", label: "DevOps & Cloud", icon: faCloud },
    { id: "tools", label: "Tools & Ecosystem", icon: faScrewdriverWrench },
  ];

  const skillCards = [
    {
      category: "languages",
      title: "Core Languages",
      icon: faCode,
      color: "text-cyan-400",
      skills: user?.skills.languages || [
        "JavaScript",
        "TypeScript",
        "Java",
        "PHP",
        "HTML && CSS",
        "SQL",
      ],
      description: "Modern ES6+, strictly typed TypeScript, and robust multi-paradigm programming.",
    },
    {
      category: "frameworks",
      title: "Frameworks & UI",
      icon: faCubes,
      color: "text-purple-400",
      skills: user?.skills.frameworks || [
        "NestJS (Node.js)",
        "ReactJS",
        "Next.js",
        "Ant Design",
        "Tailwind CSS",
      ],
      description: "Enterprise backend microservices and reactive, performant frontend architectures.",
    },
    {
      category: "database",
      title: "Databases & ORM",
      icon: faDatabase,
      color: "text-emerald-400",
      skills: [
        ...(user?.skills.database || ["PostgreSQL", "MongoDB", "MySQL", "Redis"]),
        ...(user?.skills.orm || ["Prisma", "TypeORM", "Sequelize", "Mongoose"]),
      ],
      description: "Relational, document, and key-value memory stores paired with type-safe ORMs.",
    },
    {
      category: "devops",
      title: "DevOps, Cloud & Infrastructure",
      icon: faCloud,
      color: "text-blue-400",
      skills: user?.skills.other || [
        "Kubernetes (K8s)",
        "Docker",
        "AWS EC2",
        "Nginx & Apache",
        "Linux CLI",
        "LINE & Messenger APIs",
      ],
      description: "Containerization, cluster orchestration, web server reverse proxying, and cloud deployments.",
    },
    {
      category: "tools",
      title: "Engineering Tools",
      icon: faScrewdriverWrench,
      color: "text-amber-400",
      skills: user?.skills.tools || [
        "Visual Studio Code",
        "Git & GitHub",
        "Postman",
        "DBeaver & Studio3T",
        "Figma",
        "Slack & Trello",
      ],
      description: "Collaborative developer tooling, API debugging, schema modeling, and team workflows.",
    },
  ];

  const filteredCards =
    activeCategory === "all"
      ? skillCards
      : skillCards.filter((card) => card.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <FontAwesomeIcon icon={faCubes} />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Skills &amp;{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base max-w-2xl font-light">
            An interactive overview of the languages, frameworks, databases,
            and infrastructure tools I utilize daily to build production software.
          </p>
        </div>

        {/* 3D Tech Sphere Interactive Showcase */}
        <div className="mb-16">
          <TechSphere />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.25)]"
                    : "glass-panel text-slate-400 hover:text-slate-200 border border-white/5 hover:border-white/20"
                }`}
              >
                <FontAwesomeIcon icon={cat.icon} className="text-xs" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Categorized Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredCards.map((card, idx) => (
            <div
              key={card.title}
              className="glass-panel rounded-2xl p-6 border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center">
                    <FontAwesomeIcon icon={card.icon} className={card.color} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {card.title}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400">
                      {card.skills.length} Technologies
                    </p>
                  </div>
                </div>

                <p className="text-slate-300 text-xs leading-relaxed mb-5">
                  {card.description}
                </p>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {card.skills.map((skill, si) => (
                    <span
                      key={si}
                      className="px-2.5 py-1 rounded-lg bg-slate-900/80 text-slate-200 font-mono text-xs border border-slate-700/60 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Infinite Logo Marquee */}
        {logos.length > 0 && (
          <div className="mt-12 glass-panel rounded-2xl p-6 border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between mb-4 px-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Technology Ecosystem
              </span>
              <span className="text-xs font-mono text-cyan-400">
                35+ Production Logos
              </span>
            </div>

            <div className="marquee-mask py-2">
              <Marquee gradient={false} speed={35} pauseOnHover>
                {logos.map((logo, index) => (
                  <div
                    key={index}
                    className="mx-4 sm:mx-6 flex flex-col items-center justify-center group"
                    title={logo}
                  >
                    <div className="w-14 h-14 rounded-xl bg-slate-900/80 border border-slate-800 p-2.5 flex items-center justify-center group-hover:border-cyan-400/60 group-hover:scale-110 transition-all shadow-md">
                      <Image
                        src={`/images/logo/${logo}.png`}
                        alt={logo}
                        width={40}
                        height={40}
                        className="object-contain max-h-8 w-auto filter drop-shadow group-hover:brightness-110"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 mt-2 uppercase tracking-wide group-hover:text-cyan-300 transition-colors">
                      {logo}
                    </span>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
