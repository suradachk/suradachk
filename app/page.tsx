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
        "Staying up to date with the software development industry and studying the latest trends and programming techniques",
        "Training junior software engineers to ensure they understand best practices and architecture",
        "Compiling, analysing and summarising information regarding development and service issues",
        "Taking ownership of developed applications and production systems",
        "Engaging in product development and brainstorming with team members",
      ],
      detail: [
        "Maintained Web App (CRM). Stack: NestJs, ReactJs(Antd), TypeScript, PostgreSQL, MongoDB, Prisma",
        "Maintained Web App (DBMS). Stack: Node.js, React, PostgreSQL, MongoDB, TypeORM",
        "Maintained Web App (Messenger & Line channels) Stack: Node.js, React, MongoDB",
        "Built RESTful API. Stack: Node.js, Express, Sequelize, MySQL",
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
