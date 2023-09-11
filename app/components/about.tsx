import dayjs from "dayjs";
import user from "./data/user.json";
import { Fade } from "react-awesome-reveal";

export const About: React.FC<{}> = () => {
  return (
    <>
      <Fade cascade damping={0.1}>
        <div className="mb-4">
          <div className="flex justify-start">
            <p className="font-bold text-xl">🧑🏻 Personal Profile</p>
          </div>
          <div className="flex flex-col">
            <p className="mt-2 text-lg">Name: {user.personal.name}</p>
            <p className="mt-2 text-lg">Nick Name: {user.personal.nickName}</p>
            <p className="mt-2 text-lg">
              Date Of Birth:{" "}
              {dayjs(user.personal.birthday).format("DD MMMM YYYY")} (
              {dayjs(new Date()).diff(dayjs(user.personal.birthday), "year")}{" "}
              years old)
            </p>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-start">
            <p className="font-bold text-xl">🏃🏻 Activities && hobby</p>
          </div>
          <div className="flex flex-col">
            <p className="mt-2 text-lg">Sport: {user.personal.hobby.sport}</p>
            <p className="mt-2 text-lg">Music: {user.personal.hobby.music}</p>
            <p className="mt-2 text-lg">Movies: {user.personal.hobby.movie}</p>
            <p className="mt-2 text-lg">Games: {user.personal.hobby.games}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-start">
            <p className="font-bold text-xl">👨🏻‍🎓 Education History</p>
          </div>
          <div className="flex flex-col">
            <p className="mt-2 text-lg"> - {user.education.university.name}</p>
            <p className="text-base">{user.education.university.details}</p>
            <p className="mt-2 text-lg"> - {user.education.school.name}</p>
            <p className="text-base">{user.education.school.details}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="my-2">
            <p className="font-bold text-xl">🤵🏼 Contact</p>
            <p className="text-lg">Email: {user.contact.email}</p>
            <p className="text-lg">LinkIn: {user.contact.linkin}</p>
            <p className="text-lg">Github: {user.contact.github}</p>
            <p className="text-lg">Website: {user.contact.website}</p>
          </div>
        </div>
      </Fade>
    </>
  );
};
