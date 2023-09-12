import { Fade } from "react-awesome-reveal";
import { Fragment } from "react";
import { IExperienceDetail, IUserData } from "../types/user-type";
import SectionTitle from "./title";

interface Prop {
  user: IUserData | undefined;
}

const Experience: React.FC<Prop> = ({ user }) => {
  return (
    <>
      {user && (
        <Fade cascade damping={0.1}>
          <SectionTitle title="experience" subtitle="What I do" />
          <div className="flex flex-col mt-4">
            <p className="font-bold text-xl">🏢 Work Experience</p>
            {user.experience.map((item: IExperienceDetail, index: number) => (
              <Fragment key={index}>
                <div>
                  <p className=" my-2 font-bold text-lg mb-4">
                    {item.company} , {item.position} ({item.date})
                  </p>
                </div>
                <div className="mb-4">
                  <p className="font-bold">Responsibilities :</p>
                  <div className="my-2 text-lg">
                    {item.responsibilities.map(
                      (detail: string, index: number) => (
                        <Fragment key={index}>
                          <p className="my-1" key={index}>
                            ~ {detail}
                          </p>
                        </Fragment>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <p className="font-bold">Highlights :</p>
                  <div className="my-2 text-lg">
                    {item.detail.map((detail: string, index: number) => (
                      <Fragment key={index}>
                        <p className="my-1" key={index}>
                          ~ {detail}
                        </p>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </Fade>
      )}
    </>
  );
};

export default Experience;
