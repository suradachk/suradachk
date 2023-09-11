import { Fade } from "react-awesome-reveal";
import user from "./data/user.json";
import React from "react";

interface IExperience {
  company: string;
  position: string;
  detail: string[];
  date: string;
}

export const Experience: React.FC<{}> = () => {
  return (
    <Fade>
      <div className="flex flex-col">
        <div className="my-2">
          <p className="font-bold text-xl">🏢 Work Experience</p>
          {user.experience.map((item: IExperience, index: number) => (
            <React.Fragment key={index}>
              <p className="mt-2 text-lg">
                {item.company} , {item.position} ({item.date})
              </p>
              <div className="mt-2 text-lg">
                {item.detail.map((detail: string, index: number) => (
                  <p className="my-1" key={index}>
                    ~ {detail}
                  </p>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </Fade>
  );
};
