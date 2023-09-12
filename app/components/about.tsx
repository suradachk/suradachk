import dayjs from "dayjs";
import { Fade } from "react-awesome-reveal";
import { IUserData } from "../types/user-type";
import SectionTitle from "./SectionTitle";

interface Prop {
  user: IUserData | undefined;
}

const About: React.FC<Prop> = ({ user }) => {
  return (
    <>
      {user && (
        <Fade cascade damping={0.1}>
          <SectionTitle title="About me" subtitle="introduction" />
          <div className="my-4">
            <div className="flex justify-start">
              <p className="font-bold text-xl">🧑🏻 Personal Profile</p>
            </div>
            <div className="flex flex-col">
              <p className="mt-2 text-lg">~ Name: {user.about.personal.name}</p>
              <p className="mt-2 text-lg">
                ~ Nick Name: {user.about.personal.nickName}
              </p>
              <p className="mt-2 text-lg">
                ~ Date Of Birth:{" "}
                {dayjs(user.about.personal.birthday).format("DD MMMM YYYY")} (
                {dayjs(new Date()).diff(
                  dayjs(user.about.personal.birthday),
                  "year"
                )}{" "}
                years old)
              </p>
            </div>
          </div>
          <div className="my-4">
            <div className="flex justify-start">
              <p className="font-bold text-xl">🏃🏻 Activities && hobby</p>
            </div>
            <div className="flex flex-col">
              <p className="mt-2 text-lg">
                ~ Sport: {user.about.personal.hobby.sport}
              </p>
              <p className="mt-2 text-lg">
                ~ Music: {user.about.personal.hobby.music}
              </p>
              <p className="mt-2 text-lg">
                ~ Movies: {user.about.personal.hobby.movie}
              </p>
              <p className="mt-2 text-lg">
                ~ Games: {user.about.personal.hobby.games}
              </p>
            </div>
          </div>
          <div className="my-4">
            <div className="flex justify-start">
              <p className="font-bold text-xl">👨🏻‍🎓 Education History</p>
            </div>
            <div className="flex flex-col">
              <p className="mt-2 text-lg">
                {" "}
                ~ {user.about.education.university.name}
              </p>
              <p className="text-base">
                {user.about.education.university.details}
              </p>
              <p className="mt-2 text-lg">
                {" "}
                ~ {user.about.education.school.name}
              </p>
              <p className="text-base">{user.about.education.school.details}</p>
            </div>
          </div>
        </Fade>
      )}
    </>
  );
};

export default About;
