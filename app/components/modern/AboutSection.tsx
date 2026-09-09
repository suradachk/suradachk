"use client";

import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGraduationCap,
  faHeart,
  faGamepad,
  faMusic,
  faFutbol,
  faFilm,
  faShieldHalved,
  faCakeCandles,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { IUserData } from "../../types/user-type";

interface AboutProps {
  user?: IUserData;
}

export default function AboutSection({ user }: AboutProps) {
  const birthDate = user?.about.personal.birthday || "1998-04-03";
  const age = dayjs().diff(dayjs(birthDate), "year");

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <FontAwesomeIcon icon={faUser} />
            <span>Introduction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            About{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base max-w-2xl font-light">
            A glimpse into my background, formal computer engineering education,
            and the passions that drive me beyond the terminal.
          </p>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Card 1: Personal Dossier (5 cols) */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 md:p-8 border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/40 transition-all">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Personal Dossier
                    </h3>
                    <p className="text-xs font-mono text-slate-400">
                      ID: SURADACH-DEV
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Full-Time Senior
                </span>
              </div>

              {/* Portrait & Quick Stats */}
              <div className="flex items-center gap-4 mb-6 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-cyan-500/40 shrink-0">
                  <Image
                    src="/images/suradachk1.jpg"
                    alt="Suradach"
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">
                    {user?.about.personal.name || "Suradach Kanphaisit"}
                  </h4>
                  <p className="text-xs text-cyan-400 font-mono">
                    Nickname: {user?.about.personal.nickName || "Dach"}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Bangkok / Thailand (GMT+7)
                  </p>
                </div>
              </div>

              {/* Info Items List */}
              <div className="space-y-3.5 text-sm font-mono">
                <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-2 text-xs">
                    <FontAwesomeIcon icon={faCakeCandles} className="text-cyan-400" />
                    Birthday
                  </span>
                  <span className="text-slate-200 font-semibold text-xs">
                    {dayjs(birthDate).format("DD MMMM YYYY")} ({age} yrs)
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-2 text-xs">
                    <FontAwesomeIcon icon={faShieldHalved} className="text-purple-400" />
                    Military Status
                  </span>
                  <span className="text-slate-200 font-semibold text-xs">
                    {user?.about.personal.militaryStatus || "Conscripted"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
                  <span className="text-slate-400 flex items-center gap-2 text-xs">
                    <FontAwesomeIcon icon={faCalendarCheck} className="text-emerald-400" />
                    Career Start
                  </span>
                  <span className="text-slate-200 font-semibold text-xs">
                    April 2020 (4+ Years)
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Quote */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 italic">
              &ldquo;I enjoy challenging technical problems, taking ownership of
              systems, and building modern, reliable software.&rdquo;
            </div>
          </div>

          {/* Right Column: Education + Hobbies (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Card 2: Education Timeline */}
            <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden group hover:border-purple-500/40 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Education Journey
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    Academic Background & Qualifications
                  </p>
                </div>
              </div>

              {/* Education List */}
              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-slate-700">
                {/* University */}
                <div className="relative pl-8">
                  <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-cyan-400 border-4 border-slate-900 shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-bold text-white text-base">
                      {user?.about.education.university.name ||
                        "Pibulsongkram Rajabhat University"}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold border border-cyan-500/30">
                      GPA 3.14
                    </span>
                  </div>
                  <p className="text-xs font-mono text-cyan-400 mt-1">
                    Bachelor&apos;s Degree • Computer Engineering
                  </p>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    July 2015 – December 2019
                  </p>
                </div>

                {/* High School */}
                <div className="relative pl-8">
                  <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-purple-400 border-4 border-slate-900 shadow-[0_0_10px_rgba(192,132,252,0.8)]" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-bold text-white text-base">
                      {user?.about.education.school.name ||
                        "Nabot Pittayakhom School"}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-xs font-bold border border-purple-500/30">
                      GPA 3.64
                    </span>
                  </div>
                  <p className="text-xs font-mono text-purple-300 mt-1">
                    High School Diploma • Science & Mathematics Program
                  </p>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    May 2009 – May 2015
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Activities & Culture */}
            <div className="glass-panel rounded-2xl p-6 md:p-8 border border-white/10 group hover:border-emerald-500/40 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Hobbies & Interests
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    What powers my creativity outside work
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sport */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm">
                    <FontAwesomeIcon icon={faFutbol} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">
                      Sport
                    </span>
                    <span className="text-sm font-semibold text-slate-200">
                      {user?.about.personal.hobby.sport || "Football"}
                    </span>
                  </div>
                </div>

                {/* Gaming */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm">
                    <FontAwesomeIcon icon={faGamepad} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">
                      Gaming
                    </span>
                    <span className="text-sm font-semibold text-slate-200">
                      {user?.about.personal.hobby.games || "Dota2 / Valorant"}
                    </span>
                  </div>
                </div>

                {/* Music */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 text-sm">
                    <FontAwesomeIcon icon={faMusic} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">
                      Music
                    </span>
                    <span className="text-sm font-semibold text-slate-200 line-clamp-2">
                      {user?.about.personal.hobby.music ||
                        "ACϟDC, Guns N' Roses, BTS, NewJeans"}
                    </span>
                  </div>
                </div>

                {/* Movies */}
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 text-sm">
                    <FontAwesomeIcon icon={faFilm} />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">
                      Movies & Shows
                    </span>
                    <span className="text-sm font-semibold text-slate-200">
                      {user?.about.personal.hobby.movie ||
                        "Anime, Marvel Universe, K-Dramas"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
