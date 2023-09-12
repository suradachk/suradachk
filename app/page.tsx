"use client";

import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import Switch from "./components/switch";
import Menu from "./components/menu";
import BackGround from "./components/background";
import Profile from "./components/profile";
import { TypeAnimation } from "react-type-animation";
import axios from "axios";
import { IUserData } from "./types/user-type";

export interface IData {
  key: string;
  label: string;
  element: JSX.Element;
}

const About = dynamic(() => import("./components/about"));
const Experience = dynamic(() => import("./components/experience"));
const Skills = dynamic(() => import("./components/skills"));
const Contact = dynamic(() => import("./components/contact"));

export default function Home() {
  const [mode, setMode] = useState<boolean>(true);
  const [menu, setMenu] = useState<string>("about");
  const [user, setUser] = useState<IUserData | undefined>();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("/api/user");
      if (data) setUser(data);
    };
    getUser();
  }, []);

  const data: IData[] = [
    {
      key: "about",
      label: "About",
      element: <About user={user} />,
    },
    {
      key: "skills",
      label: "Skills",
      element: <Skills user={user} />,
    },
    {
      key: "experience",
      label: "Experience",
      element: <Experience user={user} />,
    },
    {
      key: "contact",
      label: "Contact",
      element: <Contact user={user} />,
    },
  ];

  const hadleSetMode = () => {
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
    const secetion = fragmentSection.replace(/#/g, "");
    if (secetion) {
      setMenu(secetion);
    }
    const getMode = localStorage.getItem("mode");
    if (getMode && getMode === "day") {
      document.body.style.backgroundColor = "#d1eef7";
      setMode(false);
    }
  }, []);

  return (
    <>
      <BackGround mode={mode} />
      <div className="content" style={{ color: mode ? "white" : "black" }}>
        <div className="relative flex justify-end h-10 w-full">
          <Switch mode={mode} onClick={hadleSetMode} />
        </div>
        <div className="grid grid-cols-1 mt-10 lg:grid-cols-3">
          <div className="flex justify-center lg:justify-end " id="repulse-div">
            <Fade cascade damping={0.1}>
              <Profile mode={mode} />
            </Fade>
          </div>
          <div className="col-span-2">
            <div className="card-text mx-4 mt-10  md:mx-20">
              <Fade>
                <TypeAnimation
                  sequence={[
                    "👨‍💻 Hi! I'm SURADACH , Full Stack Developer..",
                    3000,
                    "👨‍💻 Hi! I'm SURADACH , Full Stack Developer.. I'm always looking for new opportunities.",
                    3000,
                    "👨‍💻 Hi! I'm SURADACH , Full Stack Developer.. I like challenging activities and enjoy working.",
                    3000,
                  ]}
                  wrapper="span"
                  speed={20}
                  style={{ fontSize: "1.5em", display: "inline-block" }}
                  repeat={Infinity}
                />
              </Fade>
            </div>
          </div>
        </div>
        <Menu data={data} menu={menu} onClick={setMenu} />

        <div className="grid grid-cols-1 w-full ">
          {data &&
            data
              .filter((x: IData) => x.key === menu)
              .map((item: IData) => (
                <div key={item.key} className="card-text m-4 md:mx-20">
                  <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
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

        <div className="flex justify-center mb-2">
          <p className="font-bold">Copyright 🚀 SURADACHK</p>
        </div>
      </div>
    </>
  );
}
