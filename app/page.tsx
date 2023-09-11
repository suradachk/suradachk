"use client";

import { useState } from "react";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";

import Toggle from "./components/Toggle";
import Menu from "./components/menu";
import Stars from "./components/stars";
import { About } from "./components/about";
import { Experience } from "./components/experience";
import { Skills } from "./components/skills";
import { Contact } from "./components/contact";

export interface IData {
  key: string;
  label: string;
  element: JSX.Element;
}

export default function Home() {
  const [mode, setMode] = useState<boolean>(true);
  const [menu, setMenu] = useState<string>("about");
  const data: IData[] = [
    {
      key: "about",
      label: "About",
      element: <About />,
    },
    {
      key: "skills",
      label: "Skills",
      element: <Skills />,
    },
    {
      key: "experience",
      label: "Experience",
      element: <Experience />,
    },
    {
      key: "contact",
      label: "Contact",
      element: <Contact />,
    },
  ];
  return (
    <>
      <div>
        <Stars mode={mode} />
        <div className="content" style={{ color: mode ? "white" : "black" }}>
          <div className="relative flex justify-end h-10 w-full">
            <Toggle toggled={mode} onClick={setMode} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 mt-10">
            <div className="flex justify-center md:justify-end md:mr-4">
              <div className="card-profile">
                <Image
                  src={"/images/suradachk.jpg"}
                  width={500}
                  height={500}
                  alt="suradachk"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="card-text mt-2 mx-4 md:mr-20">
                <Fade>
                  <p> 👨‍💻 Hi! I'm Suradach , Full Stack Developer ...</p>
                  <p className="mt-2">
                    "I'm always looking for new opportunities. I enjoy
                    challenging activities and enjoy working."
                  </p>
                  <div className="mt-4">
                    <button
                      className="mx-2"
                      style={{
                        backgroundImage: `url(/images/linkin.png)`,
                        backgroundSize: "cover",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                    <button
                      className="mx-2"
                      style={{
                        backgroundImage: `url(/images/github.png)`,
                        backgroundSize: "cover",
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  </div>
                </Fade>
              </div>
            </div>
          </div>
          <Menu data={data} menu={menu} onClick={setMenu} />
          <div className="grid grid-cols-1 w-full ">
            {data &&
              data
                .filter((x) => x.key === menu)
                .map((item: IData) => (
                  <div key={item.key} className="card-text m-4 md:mx-20">
                    {item.element}
                  </div>
                ))}
          </div>
          <div className="flex justify-center mb-2">
            <div>Copyright 🚀 SURADACHK</div>
          </div>
        </div>
      </div>
    </>
  );
}
