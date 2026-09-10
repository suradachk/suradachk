"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { TypeAnimation } from "react-type-animation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faMeteor,
  faSatellite,
  faSatelliteDish,
  faGlobe,
  faArrowLeft,
  faDownload,
  faEnvelope,
  faPaperPlane,
  faCheckCircle,
  faVolumeHigh,
  faVolumeXmark,
  faCompass,
  faTerminal,
  faCopy,
  faCheck,
  faCircleCheck,
  faSpinner,
  faBriefcase,
  faGraduationCap,
  faCode,
  faDatabase,
  faCloud,
  faScrewdriverWrench,
  faLayerGroup,
  faUser,
  faCakeCandles,
  faShieldHalved,
  faFutbol,
  faGamepad,
  faMusic,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import GalaxyScene from "../components/three/GalaxyScene";
import VersionSwitcher from "../components/VersionSwitcher";
import { IUserData } from "../types/user-type";
import dayjs from "dayjs";

export default function GalaxyPage() {
  const [user, setUser] = useState<IUserData | null>(null);
  const [logos, setLogos] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [stardate, setStardate] = useState<string>("");
  const [isWarp, setIsWarp] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Audio Context Ref for ambient cosmic drone
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Contact Form State
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Fetch initial profile & logos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, logoRes] = await Promise.all([
          axios.get("/api/user"),
          axios.get("/api/logos"),
        ]);
        if (userRes.data) setUser(userRes.data);
        if (logoRes.data) setLogos(logoRes.data);
      } catch (err) {
        console.warn("Using default celestial data", err);
      }
    };
    fetchData();
  }, []);

  // Update Stardate / Bangkok Time
  useEffect(() => {
    const updateStardate = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Bangkok",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const time = new Intl.DateTimeFormat("en-US", options).format(now);
      const yearFraction = (now.getMonth() * 30 + now.getDate()) / 365;
      const stardateVal = (now.getFullYear() + yearFraction).toFixed(2);
      setStardate(`SD ${stardateVal} // ${time} BKK`);
    };

    updateStardate();
    const timer = setInterval(updateStardate, 1000);
    return () => clearInterval(timer);
  }, []);

  // Ambient Space Synth Drone (Web Audio API)
  const toggleSound = () => {
    if (!soundEnabled) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(55, ctx.currentTime); // Low A1 deep cosmic hum

        // Low pass filter for gentle deep space rumble
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(180, ctx.currentTime);

        gain.gain.setValueAtTime(0.06, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscRef.current = osc;
        gainRef.current = gain;
        setSoundEnabled(true);
      } catch (e) {
        console.warn("Audio not permitted", e);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setSoundEnabled(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("suradach.kan@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    try {
      const res = await axios.post("/api/sendmail", formData);
      if (res.status === 200) {
        setFormStatus("success");
        setFormData({ email: "", subject: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const yearsExp = dayjs().diff(dayjs("2020-04-01"), "year");

  const missionLogs = [
    {
      sector: "MISSION 01 // CRM",
      title: "Enterprise CRM Planetary Platform",
      role: "Lead Architecture & Maintenance",
      stack: ["NestJS", "ReactJS", "Antd", "TypeScript", "PostgreSQL", "MongoDB", "Prisma"],
      desc: "Constructed resilient multi-tenant CRM services handling client telemetry, real-time analytics, and dual-database sync.",
      beacon: "bg-cyan-400",
    },
    {
      sector: "MISSION 02 // DBMS",
      title: "Enterprise DBMS Core Array",
      role: "High-Concurrency Query Engine",
      stack: ["Node.js", "React", "PostgreSQL", "MongoDB", "TypeORM"],
      desc: "Maintained critical database querying platforms, high-throughput schema migrations, and mission-critical cluster uptime.",
      beacon: "bg-purple-400",
    },
    {
      sector: "MISSION 03 // COMMS",
      title: "LINE & Messenger Omni-Channel Gateway",
      role: "Real-Time Webhook Router",
      stack: ["Node.js", "React", "MongoDB", "LINE Messaging API", "Facebook Graph API"],
      desc: "Architected real-time chat ingestion pipelines processing thousands of customer dispatches with automated bot responses.",
      beacon: "bg-emerald-400",
    },
    {
      sector: "MISSION 04 // API",
      title: "High-Velocity RESTful API Relay",
      role: "Scalable Microservices",
      stack: ["Node.js", "Express", "Sequelize", "MySQL"],
      desc: "Engineered secure parameterized APIs with rapid response latency and optimized relational schemas.",
      beacon: "bg-amber-400",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#04060c] text-slate-100 selection:bg-purple-500/30 selection:text-cyan-200 overflow-x-hidden font-sans">
      {/* Background Cosmic Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-purple-700/10 rounded-full blur-[180px]" />
        <div className="absolute top-2/3 left-1/3 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[150px]" />
      </div>

      {/* 1. Stardate & Telemetry Top HUD */}
      <header className="sticky top-0 z-40 bg-[#04060c]/85 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand & Orbit ID */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 border border-cyan-400/40 flex items-center justify-center text-white text-sm shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:scale-105 transition-all">
              <FontAwesomeIcon icon={faRocket} />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                SURADACH<span className="text-cyan-400"> • GALAXY</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                Senior Dev • Orbit 2020-Present
              </span>
            </div>
          </Link>

          {/* Stardate Telemetry (Center) */}
          <div className="hidden md:flex items-center gap-4 px-4 py-1.5 rounded-full bg-slate-950/70 border border-white/10 font-mono text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>{stardate}</span>
            <span className="text-slate-600">|</span>
            <span className="text-purple-300">RA 19h 50m / DEC +08° 52&apos;</span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5">
            {/* Audio Synth Button */}
            <button
              onClick={toggleSound}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-2 ${
                soundEnabled
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                  : "bg-slate-900/60 text-slate-400 border-white/10 hover:text-white"
              }`}
              title="Toggle Ambient Space Drone"
            >
              <FontAwesomeIcon icon={soundEnabled ? faVolumeHigh : faVolumeXmark} />
              <span className="hidden sm:inline">
                {soundEnabled ? "AUDIO ON" : "AUDIO OFF"}
              </span>
            </button>

            {/* Flight Log (Resume) */}
            <a
              href="/api/resume"
              target="_blank"
              download="suradachk-resume.pdf"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(121,40,202,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] hover:scale-105 transition-all"
            >
              <FontAwesomeIcon icon={faDownload} />
              <span>FLIGHT LOG</span>
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pt-8 pb-24">
        {/* 2. Sector 01: The Singularity (Hero) */}
        <section className="relative pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Starfleet Command Dossier */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                <FontAwesomeIcon icon={faSatellite} className="animate-pulse" />
                <span>DEEP SPACE ORBIT • SECTOR 07</span>
              </div>

              <div className="space-y-2">
                <p className="font-mono text-xs tracking-widest text-slate-400 uppercase">
                  Astronaut &amp; Systems Engineer
                </p>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  Suradach{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Kanphaisit
                  </span>
                </h1>
              </div>

              {/* Dynamic Typewriter */}
              <div className="h-10 flex items-center font-mono text-lg sm:text-xl text-cyan-300 font-bold">
                <span className="text-purple-400 mr-2">&gt;&gt;</span>
                <TypeAnimation
                  sequence={[
                    "Senior Software Developer",
                    2200,
                    "O S D Starfleet Engineer (4+ Years)",
                    2200,
                    "NestJS & TypeScript Propulsion",
                    2200,
                    "Enterprise CRM & DBMS Orbit Architect",
                    2200,
                    "Cosmic Cloud & Microservices",
                    2200,
                  ]}
                  wrapper="span"
                  speed={40}
                  repeat={Infinity}
                />
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                Specializing in high-performance web systems, microservice galaxies,
                and mission-critical databases. {yearsExp}+ years navigating production
                architectures at O S D Co., Ltd.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#missions"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono text-xs font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] hover:scale-105 transition-all"
                >
                  <FontAwesomeIcon icon={faRocket} />
                  <span>Inspect Missions</span>
                </a>

                <a
                  href="#transmission"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-panel text-slate-200 hover:text-white font-mono text-xs border border-white/10 hover:border-cyan-400 transition-all"
                >
                  <FontAwesomeIcon icon={faSatelliteDish} className="text-purple-400" />
                  <span>Send Transmission</span>
                </a>
              </div>

              {/* Cosmic Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-md">
                <div>
                  <span className="text-2xl sm:text-3xl font-mono font-extrabold text-white">
                    {yearsExp}+
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 block">
                    Light-Years Exp
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-mono font-extrabold text-cyan-400">
                    15+
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 block">
                    Tech Constellations
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-mono font-extrabold text-purple-400">
                    100%
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 block">
                    Mission Uptime
                  </span>
                </div>
              </div>
            </div>

            {/* Right: 3D Galaxy Scene */}
            <div className="lg:col-span-6 relative">
              <GalaxyScene
                isWarpSpeed={isWarp}
                onToggleWarp={() => setIsWarp(!isWarp)}
              />

              {/* Floating Holographic Engineer Avatar */}
              <div className="absolute -top-4 -left-4 p-2 rounded-2xl glass-panel border border-cyan-400/40 shadow-2xl hidden sm:flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-cyan-400/50">
                  <Image
                    src="/images/suradachk.jpg"
                    alt="Suradach"
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-white block">
                    COMMANDER DACH
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">
                    ID: SD-980403
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Sector 02: Planetary Missions (Experience) */}
        <section id="missions" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-purple-500/30 text-xs font-mono text-purple-300 uppercase tracking-widest mb-3">
              <FontAwesomeIcon icon={faMeteor} />
              <span>Sector 02 • Flight Log</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Planetary{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Missions
              </span>
            </h2>
            <p className="mt-2 text-slate-400 text-xs sm:text-sm max-w-xl font-light">
              Production systems architected and maintained at O S D Co., Ltd. (Apr 2020 – Present)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missionLogs.map((m) => (
              <div
                key={m.title}
                className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-cyan-400/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider">
                      {m.sector}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${m.beacon} animate-pulse`} />
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {m.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                  {m.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-slate-900/80 text-[11px] font-mono text-slate-300 border border-white/10 group-hover:border-cyan-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Sector 03: Constellation Matrix (Skills) */}
        <section id="constellation" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-3">
              <FontAwesomeIcon icon={faCompass} />
              <span>Sector 03 • Tech Constellations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Orbital{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Tech Matrix
              </span>
            </h2>
          </div>

          {/* Marquee of 35+ technology logos with starlight frames */}
          {logos.length > 0 && (
            <div className="glass-panel p-6 rounded-2xl border border-white/10 overflow-hidden">
              <div className="marquee-mask py-3">
                <Marquee gradient={false} speed={38} pauseOnHover>
                  {logos.map((logo, index) => (
                    <div
                      key={index}
                      className="mx-4 sm:mx-6 flex flex-col items-center group cursor-pointer"
                      title={logo}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-white/10 p-2.5 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:scale-110 transition-all">
                        <Image
                          src={`/images/logo/${logo}.png`}
                          alt={logo}
                          width={40}
                          height={40}
                          className="object-contain max-h-8 w-auto filter drop-shadow group-hover:brightness-125"
                        />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 mt-2 uppercase tracking-wider group-hover:text-cyan-300 transition-colors">
                        {logo}
                      </span>
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>
          )}
        </section>

        {/* 5. Sector 04: Stellar Genesis (About & Education) */}
        <section id="genesis" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-emerald-500/30 text-xs font-mono text-emerald-300 uppercase tracking-widest mb-3">
              <FontAwesomeIcon icon={faGlobe} />
              <span>Sector 04 • Origin &amp; Education</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Stellar{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Genesis
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Academic Credentials */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faGraduationCap} className="text-purple-400 text-lg" />
                <h3 className="text-lg font-bold text-white">Academic Qualifications</h3>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-sm">
                      Pibulsongkram Rajabhat University
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                      GPA 3.14
                    </span>
                  </div>
                  <p className="text-cyan-400">B.Eng • Computer Engineering</p>
                  <p className="text-slate-500 text-[11px]">July 2015 – December 2019</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-sm">
                      Nabot Pittayakhom School
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40">
                      GPA 3.64
                    </span>
                  </div>
                  <p className="text-purple-300">High School Science &amp; Mathematics</p>
                  <p className="text-slate-500 text-[11px]">May 2009 – May 2015</p>
                </div>
              </div>
            </div>

            {/* Personal Dossier & Hobbies */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faUser} className="text-cyan-400 text-lg" />
                <h3 className="text-lg font-bold text-white">Astronaut Dossier</h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="text-slate-500 block text-[10px]">CALLSIGN</span>
                  <span className="text-white font-bold text-sm">Dach</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="text-slate-500 block text-[10px]">ORIGIN DATE</span>
                  <span className="text-white font-bold text-sm">03 April 1998</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="text-slate-500 block text-[10px]">MILITARY STATUS</span>
                  <span className="text-emerald-300 font-bold text-sm">Conscripted</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5">
                  <span className="text-slate-500 block text-[10px]">STATION</span>
                  <span className="text-white font-bold text-sm">Bangkok (GMT+7)</span>
                </div>
              </div>

              <div className="pt-2 text-xs font-mono text-slate-400 space-y-1.5 border-t border-white/10">
                <p>• <span className="text-slate-200">Recreation:</span> Football, Dota2, Valorant</p>
                <p>• <span className="text-slate-200">Cosmic Anthems:</span> ACϟDC, Guns N&apos; Roses, BTS, NewJeans</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Sector 05: Deep Space Transmission Array (Contact) */}
        <section id="transmission" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs font-mono text-cyan-300 uppercase tracking-widest mb-3">
              <FontAwesomeIcon icon={faSatelliteDish} />
              <span>Sector 05 • Transmission Array</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Send Deep Space{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Transmission
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Quick Frequencies (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Primary Comm Channel
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href="mailto:suradach.kan@gmail.com"
                    className="font-mono text-sm font-bold text-cyan-300 hover:underline break-all"
                  >
                    suradach.kan@gmail.com
                  </a>
                  <button
                    onClick={copyEmail}
                    className="p-2 rounded-lg bg-slate-800 text-xs font-mono text-slate-300 hover:text-white"
                    title="Copy Email"
                  >
                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://github.com/suradachk"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel p-4 rounded-xl border border-white/10 hover:border-cyan-400 transition-all flex items-center justify-between group"
                >
                  <span className="font-mono text-xs text-slate-300 group-hover:text-white font-bold">
                    GitHub
                  </span>
                  <FontAwesomeIcon icon={faGithub} className="text-cyan-400 text-base" />
                </a>

                <a
                  href="https://www.linkedin.com/in/suradachk"
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel p-4 rounded-xl border border-white/10 hover:border-purple-400 transition-all flex items-center justify-between group"
                >
                  <span className="font-mono text-xs text-slate-300 group-hover:text-white font-bold">
                    LinkedIn
                  </span>
                  <FontAwesomeIcon icon={faLinkedin} className="text-purple-400 text-base" />
                </a>
              </div>
            </div>

            {/* Dispatch Terminal (7 cols) */}
            <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                    Signal Origin (Email)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="explorer@deepspace.org"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                    Transmission Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Opportunity / Collaboration Directive"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                    Telemetry Payload (Message)
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter encrypted transmission payload..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {formStatus === "success" && (
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs flex items-center gap-2">
                    <FontAwesomeIcon icon={faCircleCheck} />
                    <span>Signal dispatched across space! Thank you.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-mono font-bold text-xs shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {formStatus === "loading" ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                      <span>Broadcasting Signal...</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} />
                      <span>Broadcast Transmission</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#020408] py-8 relative z-10 font-mono text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} Suradach Kanphaisit • Galaxy Edition v5.0</span>
          <span>Engineered with Three.js Spiral Astrophysics &amp; Next.js</span>
        </div>
      </footer>

      {/* Universal Floating Version Switcher */}
      <VersionSwitcher />
    </div>
  );
}
