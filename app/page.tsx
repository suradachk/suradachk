"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { IUserData } from "./types/user-type";
import Navbar from "./components/modern/Navbar";
import Hero from "./components/modern/Hero";
import AboutSection from "./components/modern/AboutSection";
import ExperienceSection from "./components/modern/ExperienceSection";
import SkillsSection from "./components/modern/SkillsSection";
import ContactSection from "./components/modern/ContactSection";
import Footer from "./components/modern/Footer";
import VersionSwitcher from "./components/VersionSwitcher";

export interface IData {
  key: string;
  label: string;
  element?: JSX.Element;
}

// Dynamic client-only Three.js background
const BackgroundParticles = dynamic(
  () => import("./components/three/BackgroundParticles"),
  { ssr: false }
);

// Fallback initial data to eliminate loading flashes
const INITIAL_USER_DATA: IUserData = {
  about: {
    personal: {
      name: "Suradach Kanphaisit",
      nickName: "Dach",
      birthday: "1998-04-03",
      email: "suradach.kan@gmail.com",
      hobby: {
        sport: "Football",
        music: "ACϟDC / Guns N' Roses / Justin Bieber / BTS / BlackPink / NEWJEANS",
        movie: "Anime / Marvel Universe / K-Dramas",
        games: "Dota2 / Valorant",
      },
      militaryStatus: "Conscripted",
    },
    education: {
      university: {
        name: "Pibulsongkram Rajabhat University",
        details:
          "Bachelor's degree computer engineering | July 2015 - December 2019 Grade point average: 3.14",
      },
      school: {
        name: "Nabot Pittayakhom School",
        details:
          "High School Science, Math | May 2009 - May 2015 Grade point average: 3.64",
      },
    },
  },
  skills: {
    languages: [
      "JavaScript && TypeScript",
      "Java",
      "PHP",
      "HTML && CSS",
      "SQL",
    ],
    frameworks: [
      "NodeJs (NestJs)",
      "ReactJS (NextJs)",
      "Antd",
      "Tailwind CSS",
    ],
    orm: ["Sequelize", "Typeorm", "Prisma", "Mongoose"],
    tools: [
      "Visual Studio Code",
      "Git && Github",
      "DBeaver && Studio3T",
      "Slack && Trello",
      "Figma",
      "postman",
    ],
    database: ["Mysql", "Postgresql", "Mongodb", "Redis"],
    other: [
      "K8S && Docker",
      "Nginx && Apache",
      "Basic Command lines",
      "AWS (ec2)",
      "Line && Facebook Messenger API",
    ],
  },
  experience: [
    {
      company: "O S D Co., Ltd.",
      position: "Full Time: Senior Software Developer",
      responsibilities: [
        "End-to-End Ownership: Architecting, developing, and maintaining high-concurrency production systems with strict SLA targets",
        "Mentorship & Leadership: Training junior software engineers in TypeScript, clean architecture patterns, and rigorous code reviews",
        "Technical Problem Solving: Compiling, analysing, and resolving complex database performance bottlenecks and service incidents",
        "Architecture Strategy: Formulating Technical Decision Records (ADRs) and collaborating closely with cross-functional product teams",
        "Industry Best Practices: Continuously modernizing codebase with latest frameworks, microservices patterns, and DevOps tooling",
      ],
      detail: [
        "Enterprise CRM Platform: Engineered multi-tenant CRM with NestJS & React (Antd); implemented Dual-DB strategy (PostgreSQL ACID transactions + MongoDB dynamic document streams) with Prisma ORM, cutting runtime data errors by 40%",
        "Enterprise DBMS Web App: Maintained mission-critical database administration and querying platform using Node.js, React, PostgreSQL, MongoDB, and TypeORM; achieved sub-second query latency across millions of records",
        "Omni-Channel Messaging Hub: Architected real-time webhook ingestion engine handling thousands of daily customer events across LINE & Facebook Messenger APIs with automated routing and zero message loss",
        "Scalable RESTful API Infrastructure: Engineered high-velocity microservices using Node.js, Express, Sequelize, and MySQL; implemented indexed queries and caching strategies achieving ~99.9% uptime",
      ],
      date: "Apr 2020 - Present",
    },
  ],
  contact: {
    email: "suradach.kan@gmail.com",
    website: "https://suradachk.com",
    github: "https://github.com/suradachk",
    linkin: "https://www.linkedin.com/in/suradachk",
  },
};

export default function Home() {
  const [user, setUser] = useState<IUserData>(INITIAL_USER_DATA);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/user");
        if (data) {
          setUser(data);
        }
      } catch (err) {
        console.warn("Using fallback profile data", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#06090e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 3D Ambient Background Particles */}
      <BackgroundParticles />

      {/* Modern Sticky Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero user={user} />
        <AboutSection user={user} />
        <ExperienceSection user={user} />
        <SkillsSection user={user} />
        <ContactSection user={user} />
      </main>

      {/* Modern Footer with Bangkok Time */}
      <Footer />

      {/* Universal Version Switcher HUD */}
      <VersionSwitcher />
    </div>
  );
}
