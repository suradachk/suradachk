"use client";

import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import axios from "axios";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import Switch from "../components/switch";
import Menu from "../components/menu";
import BackGround from "../components/background";
import Profile from "../components/profile";
import { TypeAnimation } from "react-type-animation";
import { IUserData } from "../types/user-type";
import VersionSwitcher from "../components/VersionSwitcher";

export interface IData {
  key: string;
  label: string;
  element: JSX.Element;
}

const About = dynamic(() => import("../components/about"));
const Experience = dynamic(() => import("../components/experience"));
const Skills = dynamic(() => import("../components/skills"));
const Contact = dynamic(() => import("../components/contact"));

export default function ClassicPage() {
  const [mode, setMode] = useState<boolean>(true);
  const [menu, setMenu] = useState<string>("about");
  const [user, setUser] = useState<IUserData | undefined>();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get("/api/user");
        if (data) setUser(data);
      } catch (e) {
        console.error("Failed to fetch user data", e);
      }
    };
    getUser();
  }, []);

  const pages: IData[] = [
    {
      key: "about",
      label: "About",
      element: <About user={user} />,
    },
    {
      key: "experience",
      label: "Experience",
      element: <Experience user={user} />,
    },
    {
      key: "skills",
      label: "Skills",
      element: <Skills user={user} />,
    },
    {
      key: "contact",
      label: "Contact",
      element: <Contact user={user} />,
    },
  ];

  const handleSetMode = () => {
    const domBody = document.body;
    setMode(!mode);
    !mode
      ? (domBody.style.backgroundColor = "#16171b")
      : (domBody.style.backgroundColor = "#d1eef7");

    !mode
      ? localStorage.removeItem("mode")
      : localStorage.setItem("mode", "day");
  };

  useEffect(() => {
    const fragmentSection = window.location.hash;
    const section = fragmentSection.replace(/#/g, "");
    if (section) {
      setMenu(section);
    }
    const getMode = localStorage.getItem("mode");
    if (getMode && getMode === "day") {
      document.body.style.backgroundColor = "#d1eef7";
      setMode(false);
    }
  }, []);

  return (
    <div className="min-h-screen relative">
      <BackGround mode={mode} />

      <div
        className="content min-h-screen pb-16"
        style={{ color: mode ? "white" : "black" }}
      >
        {/* Top bar with back to 3D flagship and mode switch */}
        <div className="relative flex items-center justify-between h-14 w-full px-6 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono glass-panel border border-white/20 hover:border-cyan-400 text-slate-300 hover:text-white transition-all"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Switch to 3D Flagship (v2)</span>
          </Link>
          <Switch mode={mode} onClick={handleSetMode} />
        </div>

        {/* Hero & Profile Section */}
        <div className="grid grid-cols-1 mt-6 lg:grid-cols-3">
          <div className="flex justify-center lg:justify-end" id="repulse-div">
            <Fade cascade damping={0.1}>
              <Profile mode={mode} />
            </Fade>
          </div>
          <div className="col-span-2">
            <div className="card-text mx-4 mt-10 md:mx-20">
              <Fade>
                <TypeAnimation
                  sequence={[
                    `👨‍💻 Hi! I'm SURADACH , Full Stack Developer ${dayjs(
                      new Date()
                    ).diff(dayjs("2020-04-01"), "year")} years+ `,
                    3000,
                    `👨‍💻 Hi! I'm SURADACH , Full Stack Developer ${dayjs(
                      new Date()
                    ).diff(dayjs("2020-04-01"), "year")} years+ ...`,
                    3000,
                    `👨‍💻 Hi! I'm SURADACH , Full Stack Developer ${dayjs(
                      new Date()
                    ).diff(
                      dayjs("2020-04-01"),
                      "year"
                    )} years+ , I like challenging activities and enjoy working `,
                    3000,
                    `👨‍💻 Hi! I'm SURADACH , Full Stack Developer ${dayjs(
                      new Date()
                    ).diff(
                      dayjs("2020-04-01"),
                      "year"
                    )} years+ , I like challenging activities and enjoy working ☺️ `,
                    3000,
                  ]}
                  wrapper="span"
                  speed={20}
                  style={{ fontSize: "1.5em", display: "inline-block" }}
                  repeat={undefined}
                />
              </Fade>
            </div>
          </div>
        </div>

        {/* Menu Tabs */}
        <Menu data={pages} menu={menu} onClick={setMenu} />

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 w-full mt-4">
          {pages &&
            pages
              .filter((x: IData) => x.key === menu)
              .map((item: IData) => (
                <div key={item.key} className="card-text m-4 md:mx-20">
                  <motion.div
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    {item.element}
                  </motion.div>
                </div>
              ))}
        </div>

        <div className="flex justify-center mt-12 mb-4">
          <p className="font-bold text-sm">
            Copyright 🚀 SURADACHK • Classic 2023 Edition
          </p>
        </div>
      </div>

      {/* Universal Version Switcher HUD */}
      <VersionSwitcher />
    </div>
  );
}
