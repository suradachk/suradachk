"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faDownload,
  faEnvelope,
  faPaperPlane,
  faCheck,
  faCopy,
  faCircleCheck,
  faSpinner,
  faMicrochip,
  faServer,
  faDatabase,
  faComments,
  faCode,
  faGraduationCap,
  faShieldHalved,
  faUser,
  faBolt,
  faLayerGroup,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { faApple, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import AppleScene from "../components/three/AppleScene";
import VersionSwitcher from "../components/VersionSwitcher";
import { IUserData } from "../types/user-type";
import dayjs from "dayjs";

export default function ApplePage() {
  const [user, setUser] = useState<IUserData | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("/api/user");
        if (data) setUser(data);
      } catch (e) {
        console.warn("Using default profile data", e);
      }
    };
    fetchUserData();
  }, []);

  const yearsExp = dayjs().diff(dayjs("2020-04-01"), "year");
  const email = user?.contact.email || "suradach.kan@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] selection:bg-[#0071e3] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* 1. Apple Global Sub-Navigation Ribbon */}
      <nav className="sticky top-0 z-40 bg-[#161617]/80 backdrop-blur-md border-b border-[#424245]/40 px-4 sm:px-8 py-3 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faApple} className="text-white text-lg" />
            <span className="font-semibold text-base sm:text-lg tracking-tight text-white">
              Suradach Pro
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-[#86868b]">
            <button
              onClick={() => scrollToSection("overview")}
              className="hover:text-white transition-colors"
            >
              Overview
            </button>
            <button
              onClick={() => scrollToSection("architecture")}
              className="hover:text-white transition-colors"
            >
              Architecture
            </button>
            <button
              onClick={() => scrollToSection("techspecs")}
              className="hover:text-white transition-colors"
            >
              Tech Specs
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/api/resume"
              target="_blank"
              download="suradachk-resume.pdf"
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white transition-all hidden sm:inline-flex items-center gap-1.5"
            >
              <FontAwesomeIcon icon={faDownload} className="text-[10px]" />
              <span>Resume</span>
            </a>

            <button
              onClick={() => scrollToSection("contact")}
              className="px-4 py-1.5 rounded-full text-xs font-medium bg-[#0071e3] hover:bg-[#0077ed] text-white shadow-sm transition-all"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Keynote Hero Section */}
      <section id="overview" className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        {/* Eyebrow */}
        <p className="text-[#86868b] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
          Senior Software Developer
        </p>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-4">
          Suradach Pro.
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-[#86868b] max-w-3xl mx-auto mb-8">
          Titanium strength. Unrivaled architecture.{" "}
          <span className="text-white">{yearsExp}+ continuous years</span> of senior enterprise engineering.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <button
            onClick={() => scrollToSection("architecture")}
            className="px-6 py-2.5 rounded-full text-sm font-medium bg-[#0071e3] hover:bg-[#0077ed] text-white transition-all shadow-md"
          >
            Explore Architecture
          </button>
          <button
            onClick={() => scrollToSection("techspecs")}
            className="text-sm font-medium text-[#2997ff] hover:underline flex items-center gap-1"
          >
            <span>View Technical Specifications</span>
            <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
          </button>
        </div>

        {/* 3D Titanium Studio Display */}
        <div className="relative w-full max-w-4xl mx-auto">
          <AppleScene finish="natural" />
          <p className="text-[11px] text-[#86868b] mt-4 font-mono">
            Interactive 3D Spatial Monolith • Natural Titanium Finish • Designed by Suradach
          </p>
        </div>
      </section>

      {/* 3. The Keynote Feature Reveal (Flagship Systems) */}
      <section id="architecture" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-20 border-t border-[#1d1d1f]">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#86868b]">
            Pro Architecture
          </h2>
          <p className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            Take a closer look at what powers the machine.
          </p>
          <p className="text-[#86868b] text-base sm:text-lg font-normal">
            Four production systems engineered for extreme uptime, microsecond precision, and seamless multi-channel connectivity at O S D Co., Ltd.
          </p>
        </div>

        {/* 4 Feature System Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* System 1: CRM */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#161617] border border-[#2d2d2f] hover:border-[#424245] transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#2997ff]">
                Flagship Platform
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Enterprise CRM Web Application
              </h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed">
                A display of raw processing power. Constructed with a dual-database engine, separating transactional operations in PostgreSQL and dynamic pipeline records in MongoDB.
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[#2d2d2f] flex flex-wrap gap-2">
              {["NestJS", "ReactJS", "Ant Design", "TypeScript", "PostgreSQL", "MongoDB", "Prisma"].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full text-xs font-mono bg-[#242426] text-[#d2d2d7]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* System 2: DBMS */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#161617] border border-[#2d2d2f] hover:border-[#424245] transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#a855f7]">
                Data Engine
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Enterprise DBMS Web Application
              </h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed">
                Pro performance down to the millisecond. Designed for heavy analytical querying, schema migrations via TypeORM, and continuous data synchronization.
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[#2d2d2f] flex flex-wrap gap-2">
              {["Node.js", "React", "PostgreSQL", "MongoDB", "TypeORM"].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full text-xs font-mono bg-[#242426] text-[#d2d2d7]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* System 3: Omni-Channel */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#161617] border border-[#2d2d2f] hover:border-[#424245] transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#34d399]">
                Connectivity
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                LINE &amp; Messenger Omni-Channel
              </h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed">
                Instant connection across the ecosystem. Real-time webhook architecture ingesting thousands of customer conversations with automated routing and agent dashboards.
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[#2d2d2f] flex flex-wrap gap-2">
              {["Node.js", "React", "MongoDB", "LINE Messaging API", "Facebook Graph API"].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full text-xs font-mono bg-[#242426] text-[#d2d2d7]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* System 4: RESTful API Relay */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#161617] border border-[#2d2d2f] hover:border-[#424245] transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#f59e0b]">
                Microservices
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                High-Speed RESTful API Infrastructure
              </h3>
              <p className="text-[#86868b] text-sm sm:text-base leading-relaxed">
                Engineered for pure efficiency. Built with clean separation of concerns, normalized MySQL schemas via Sequelize, parameterized caching, and JWT security.
              </p>
            </div>
            <div className="pt-8 mt-6 border-t border-[#2d2d2f] flex flex-wrap gap-2">
              {["Node.js", "Express", "Sequelize", "MySQL", "REST API"].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full text-xs font-mono bg-[#242426] text-[#d2d2d7]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Apple Bento Summary Slide */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#161617] border border-[#2d2d2f] grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              {yearsExp}+ Years
            </span>
            <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">
              Senior Production Experience<sup>1</sup>
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-4xl sm:text-5xl font-extrabold text-[#2997ff] tracking-tight">
              3.14 GPA
            </span>
            <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">
              B.Eng Computer Engineering<sup>2</sup>
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-4xl sm:text-5xl font-extrabold text-[#a855f7] tracking-tight">
              Dual-DB
            </span>
            <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">
              Relational &amp; Document Engine
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-4xl sm:text-5xl font-extrabold text-[#34d399] tracking-tight">
              100%
            </span>
            <p className="text-xs text-[#86868b] uppercase tracking-wider font-semibold">
              System Ownership &amp; Mentorship<sup>3</sup>
            </p>
          </div>
        </div>
      </section>

      {/* 5. Iconic Apple Tech Specs Grid */}
      <section id="techspecs" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16 border-t border-[#1d1d1f]">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#86868b]">
            Technical Specifications
          </h2>
          <p className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Engineered to perfection.
          </p>
        </div>

        {/* Specs Table & Cards */}
        <div className="space-y-8 text-sm">
          {/* Spec Row 1: Languages & Core */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-8 border-b border-[#2d2d2f]">
            <div className="text-[#86868b] font-medium text-base">Languages &amp; Core</div>
            <div className="md:col-span-2 space-y-2">
              <p className="text-white font-semibold text-base">
                TypeScript, JavaScript, Java, PHP, HTML5, CSS3, SQL
              </p>
              <p className="text-[#86868b] text-xs leading-relaxed">
                Full-stack type safety with TypeScript, asynchronous event-driven pipelines, and modular object-oriented programming.
              </p>
            </div>
          </div>

          {/* Spec Row 2: Frameworks & UI */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-8 border-b border-[#2d2d2f]">
            <div className="text-[#86868b] font-medium text-base">Frameworks &amp; Runtime</div>
            <div className="md:col-span-2 space-y-2">
              <p className="text-white font-semibold text-base">
                NestJS (Node.js), Next.js, ReactJS, Ant Design, Tailwind CSS, Express
              </p>
              <p className="text-[#86868b] text-xs leading-relaxed">
                High-performance backend microservices with dependency injection, coupled with responsive React and Next.js frontends.
              </p>
            </div>
          </div>

          {/* Spec Row 3: Databases & ORM */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-8 border-b border-[#2d2d2f]">
            <div className="text-[#86868b] font-medium text-base">Data Storage &amp; ORM</div>
            <div className="md:col-span-2 space-y-2">
              <p className="text-white font-semibold text-base">
                PostgreSQL, MongoDB, MySQL, Redis, Prisma, TypeORM, Sequelize, Mongoose
              </p>
              <p className="text-[#86868b] text-xs leading-relaxed">
                ACID compliance for critical financial records paired with NoSQL flexibility for unstructured event streams.
              </p>
            </div>
          </div>

          {/* Spec Row 4: Cloud & Deployment */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-8 border-b border-[#2d2d2f]">
            <div className="text-[#86868b] font-medium text-base">Cloud, DevOps &amp; Tools</div>
            <div className="md:col-span-2 space-y-2">
              <p className="text-white font-semibold text-base">
                Docker, Kubernetes (K8s), AWS EC2, Nginx, Apache, Git &amp; GitHub, VS Code, Postman, DBeaver, Studio3T, Figma
              </p>
              <p className="text-[#86868b] text-xs leading-relaxed">
                Containerized CI/CD environments, reverse proxying, load balancing, and collaborative development tools.
              </p>
            </div>
          </div>

          {/* Spec Row 5: Education & Background */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-8 border-b border-[#2d2d2f]">
            <div className="text-[#86868b] font-medium text-base">Academic Credentials</div>
            <div className="md:col-span-2 space-y-2">
              <p className="text-white font-semibold text-base">
                Pibulsongkram Rajabhat University • Bachelor&apos;s in Computer Engineering
              </p>
              <p className="text-[#86868b] text-xs">
                Grade Point Average: 3.14 (July 2015 – December 2019)
              </p>
              <p className="text-white font-semibold text-base pt-2">
                Nabot Pittayakhom School • High School Science &amp; Mathematics
              </p>
              <p className="text-[#86868b] text-xs">
                Grade Point Average: 3.64 (May 2009 – May 2015)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Contact & Upgrade (The Apple Store Experience) */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12 border-t border-[#1d1d1f]">
        <div className="text-center space-y-3">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#86868b]">
            Order Configuration
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Upgrade your engineering team with Suradach Pro.
          </h2>
          <p className="text-[#86868b] text-base">
            Available for Senior Software Developer &amp; Full-Stack engineering leadership roles.
          </p>
        </div>

        {/* Apple Store Style Order Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#161617] border border-[#2d2d2f] shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2d2d2f]">
            <div>
              <h3 className="text-lg font-bold text-white">Direct Communication Channel</h3>
              <p className="text-xs text-[#86868b]">Response typically within 24 hours</p>
            </div>
            <button
              onClick={copyEmail}
              className="px-4 py-2 rounded-full text-xs font-medium bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white transition-all flex items-center gap-2 self-start sm:self-auto"
            >
              <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
              <span>{copied ? "Copied Email" : email}</span>
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-2">
                Your Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="recruiter@apple.com"
                className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-[#2d2d2f] text-white text-sm focus:outline-none focus:border-[#0071e3] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-2">
                Subject *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Senior Software Developer Opportunity"
                className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-[#2d2d2f] text-white text-sm focus:outline-none focus:border-[#0071e3] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-2">
                Message *
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your team and vision..."
                className="w-full px-4 py-3 rounded-xl bg-[#000000] border border-[#2d2d2f] text-white text-sm focus:outline-none focus:border-[#0071e3] transition-all"
              />
            </div>

            {formStatus === "success" && (
              <div className="p-4 rounded-xl bg-[#0071e3]/20 border border-[#0071e3]/40 text-white text-xs flex items-center gap-2">
                <FontAwesomeIcon icon={faCircleCheck} className="text-[#2997ff]" />
                <span>Message dispatched successfully. Thank you for considering Suradach Pro.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={formStatus === "loading"}
              className="w-full py-3.5 rounded-xl font-medium bg-[#0071e3] hover:bg-[#0077ed] text-white text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {formStatus === "loading" ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                  <span>Submitting Order...</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPaperPlane} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>

          {/* Social Channels */}
          <div className="pt-6 border-t border-[#2d2d2f] flex flex-wrap items-center justify-center gap-6 text-xs text-[#86868b]">
            <a
              href="https://www.linkedin.com/in/suradachk"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <FontAwesomeIcon icon={faLinkedin} className="text-sm" />
              <span>LinkedIn Profile</span>
            </a>
            <a
              href="https://github.com/suradachk"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <FontAwesomeIcon icon={faGithub} className="text-sm" />
              <span>GitHub Repositories</span>
            </a>
            <a
              href="/api/resume"
              target="_blank"
              download="suradachk-resume.pdf"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <FontAwesomeIcon icon={faDownload} className="text-sm" />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </div>
      </section>

      {/* 7. Apple Footnotes & Legal Footer */}
      <footer className="bg-[#161617] border-t border-[#2d2d2f] text-[#86868b] text-[11px] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="space-y-2 pb-6 border-b border-[#2d2d2f] leading-relaxed">
            <p>
              1. 4+ years of professional engineering tenure calculated from April 2020 through present at O S D Co., Ltd.
            </p>
            <p>
              2. Bachelor&apos;s degree in Computer Engineering conferred with GPA 3.14 by Pibulsongkram Rajabhat University.
            </p>
            <p>
              3. System ownership and uptime claims reflect real-world production systems (CRM, DBMS, LINE/Messenger bot APIs) maintained during full-time developer employment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>Copyright &copy; {new Date().getFullYear()} Suradach Kanphaisit. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="/" className="hover:text-white transition-colors">3D Cyberpunk</Link>
              <Link href="/galaxy" className="hover:text-white transition-colors">Galaxy</Link>
              <Link href="/terminal" className="hover:text-white transition-colors">Terminal</Link>
              <Link href="/minimal" className="hover:text-white transition-colors">Minimal</Link>
              <Link href="/classic" className="hover:text-white transition-colors">Classic</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Universal Version Switcher HUD */}
      <VersionSwitcher />
    </div>
  );
}
