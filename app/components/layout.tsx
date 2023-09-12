import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { TypeAnimation } from "react-type-animation";
import Toggle from "./toggle";
import { About } from "./about";
import { Contact } from "./contact";
import { Experience } from "./experience";
import Menu from "./menu";
import { Skills } from "./skills";
import Stars from "./stars";
import { SunMoon } from "./sunMoon";
import { IUserData } from "../types/user-type";

interface Prop {
  user: IUserData | undefined;
}

export interface IData {
  key: string;
  label: string;
  element: JSX.Element;
}

const MainLayout: React.FC<Prop> = ({ user }) => {
  const [mode, setMode] = useState<boolean>(true);
  const [menu, setMenu] = useState<string>("about");

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

  useEffect(() => {
    const fragmentSection = window.location.hash;
    const secetion = fragmentSection.replace(/#/g, "");
    if (secetion) {
      setMenu(secetion);
    }
  }, []);
  return (
    <div>
      <Stars mode={mode} />
      <div className="content" style={{ color: mode ? "white" : "black" }}>
        <div className="relative flex justify-end h-10 w-full">
          <Toggle toggled={mode} onClick={setMode} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-10">
          <div className="flex justify-center ">
            <Fade cascade damping={0.1}>
              <SunMoon mode={mode} />
            </Fade>
          </div>
          <div className="md:col-span-2">
            <div className="card-text mt-2 mx-4 md:mr-20">
              <Fade>
                <TypeAnimation
                  sequence={[
                    "👨‍💻 Hi! I'm SURADACH , Full Stack Developer ...",
                    5000,
                    "👨‍💻 I'm always looking for new opportunities. I enjoy challenging activities and enjoy working...",
                    5000,
                  ]}
                  wrapper="span"
                  speed={20}
                  style={{ fontSize: "1.5em", display: "inline-block" }}
                  repeat={Infinity}
                />
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
          {/* {data &&
          data
            .filter((x: IData) => x.key === menu)
            .map((item: IData) => (
              <div key={item.key} className="card-text m-4 md:mx-20">
                {item.element}
              </div>
            ))} */}
        </div>
        <div className="flex justify-center mb-2">
          <div>Copyright 🚀 SURADACHK</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
