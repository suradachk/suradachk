"use client";

import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faDownload,
  faEnvelope,
  faCodeBranch,
  faServer,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import HeroScene from "../three/HeroScene";
import { IUserData } from "../../types/user-type";
import dayjs from "dayjs";

interface HeroProps {
  user?: IUserData;
}

export default function Hero({ user }: HeroProps) {
  const yearsExp = dayjs().diff(dayjs("2020-04-01"), "year");

  return (
    <section className="relative min-h-[90vh] pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Hero Text & Information */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono font-medium text-cyan-300">
                Full Stack Developer • {yearsExp}+ Years Experience
              </span>
            </div>

            {/* Name & Title */}
            <div className="space-y-2">
              <p className="text-sm md:text-base font-mono uppercase tracking-widest text-slate-400">
                Hello, I&apos;m
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
                Suradach{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
                  Kanphaisit
                </span>
              </h1>
            </div>

            {/* Dynamic Typewriter Ticker */}
            <div className="h-12 flex items-center">
              <span className="text-slate-400 font-mono text-lg md:text-xl mr-2">
                &gt;
              </span>
              <TypeAnimation
                sequence={[
                  "Senior Software Developer",
                  2200,
                  "NestJS & TypeScript Specialist",
                  2200,
                  "React & Next.js Architect",
                  2200,
                  "Enterprise CRM & DBMS Engineer",
                  2200,
                  "Cloud, Docker & Microservices",
                  2200,
                ]}
                wrapper="span"
                speed={40}
                repeat={Infinity}
                className="font-mono text-xl sm:text-2xl text-cyan-300 font-bold tracking-tight"
              />
            </div>

            {/* Description */}
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl font-light">
              Senior Software Developer with {yearsExp}+ years of hands-on experience
              architecting, developing, and maintaining high-concurrency enterprise
              systems, CRM solutions, and robust APIs. Passionate about clean
              code, performance optimization, and modern 3D web interfaces.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 text-slate-950 font-mono font-bold text-sm shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] hover:scale-105 active:scale-95 transition-all"
              >
                <span>View Experience</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </a>

              <a
                href="/api/resume"
                target="_blank"
                download="suradachk-resume.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass-panel text-white font-mono text-sm border border-slate-700 hover:border-cyan-400/60 hover:bg-cyan-500/10 transition-all"
              >
                <FontAwesomeIcon icon={faDownload} className="text-cyan-400" />
                <span>Resume (PDF)</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass-panel text-slate-300 hover:text-white font-mono text-sm hover:border-purple-400/60 hover:bg-purple-500/10 transition-all"
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-purple-400" />
                <span>Contact</span>
              </a>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 w-full max-w-xl">
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-mono font-extrabold text-white">
                  {yearsExp}+
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Years Experience
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-mono font-extrabold text-cyan-400">
                  15+
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Tech Stacks
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl md:text-3xl font-mono font-extrabold text-purple-400">
                  100%
                </span>
                <span className="text-xs font-mono text-slate-400">
                  System Ownership
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Three.js Scene + Holographic Avatar */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* 3D Canvas Container */}
            <div className="w-full relative">
              <HeroScene />

              {/* Floating Holographic Avatar Badge */}
              <div className="absolute -top-4 -left-4 md:left-2 p-1.5 rounded-2xl glass-panel border border-cyan-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cyber-card animate-float-slow hidden sm:block">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-white/20">
                  <Image
                    src="/images/suradachk.jpg"
                    alt="Suradach Kanphaisit"
                    fill
                    className="object-cover"
                    sizes="80px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  <span className="absolute bottom-1 left-1.5 text-[9px] font-mono font-bold text-cyan-300">
                    DACH
                  </span>
                </div>
              </div>

              {/* Floating Tech Badges */}
              <div className="absolute top-12 right-0 md:-right-4 px-3 py-1.5 rounded-xl glass-panel border border-purple-500/30 text-xs font-mono text-purple-300 flex items-center gap-2 shadow-lg hidden sm:flex">
                <FontAwesomeIcon icon={faServer} />
                <span>NestJS & Microservices</span>
              </div>

              <div className="absolute bottom-16 -left-2 md:-left-6 px-3 py-1.5 rounded-xl glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-2 shadow-lg hidden sm:flex">
                <FontAwesomeIcon icon={faLayerGroup} />
                <span>Next.js & TypeScript</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
