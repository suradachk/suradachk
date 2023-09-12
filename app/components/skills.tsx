import axios from "axios";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { IUserData } from "../types/user-type";
import SectionTitle from "./title";

interface Prop {
  user: IUserData | undefined;
}

const Skills: React.FC<Prop> = ({ user }) => {
  const [logos, setLogos] = useState<string[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("/api/logos");
      if (data) setLogos(data);
    };
    getUser();
  }, []);

  return (
    <>
      {user && (
        <Fade cascade damping={0.1}>
          <SectionTitle title="skills" subtitle="What I use" />
          <div className="grid grid-cols-1 my-4 md:grid-cols-3 ">
            <div className="mb-6">
              <p className="font-bold text-xl">🚀 Languages</p>
              {user.skills.languages.map((item: string, index: number) => (
                <p key={index} className="mt-2 text-lg">
                  ~ {item}
                </p>
              ))}
            </div>
            <div className="mb-6">
              <p className="font-bold text-xl">🛸 Frameworks && Library </p>
              {user.skills.frameworks.map((item: string, index: number) => (
                <p key={index} className="mt-2 text-lg">
                  ~ {item}
                </p>
              ))}
            </div>
            <div className="mb-6">
              <p className="font-bold text-xl">⌨️ ORM</p>
              {user.skills.orm.map((item: string, index: number) => (
                <p key={index} className="mt-2 text-lg">
                  ~ {item}
                </p>
              ))}
            </div>
            <div className="mb-6">
              <p className="font-bold text-xl">📂 DataBase</p>
              {user.skills.database.map((item: string, index: number) => (
                <p key={index} className="mt-2 text-lg">
                  ~ {item}
                </p>
              ))}
            </div>
            <div className="mb-6">
              <p className="font-bold text-xl">🔧 Tools</p>
              {user.skills.tools.map((item: string, index: number) => (
                <p key={index} className="mt-2 text-lg">
                  ~ {item}
                </p>
              ))}
            </div>
            <div className="mb-6">
              <p className="font-bold text-xl">📄 Other</p>
              {user.skills.other.map((item: string, index: number) => (
                <p key={index} className="mt-2 text-lg">
                  ~ {item}
                </p>
              ))}
            </div>
          </div>
          {logos && (
            <div className="mt-6">
              <Marquee>
                {logos.map((logo: string, index: number) => (
                  <div style={{ margin: "0 20px" }} key={index}>
                    <Image
                      src={`/images/logo/${logo}.png`}
                      alt={logo}
                      width={60}
                      height={60}
                      loading="lazy"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          )}
        </Fade>
      )}
    </>
  );
};

export default Skills;
