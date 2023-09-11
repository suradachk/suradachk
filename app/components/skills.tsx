import user from "./data/user.json";
import { Fade } from "react-awesome-reveal";

export const Skills: React.FC<{}> = () => {
  return (
    <Fade>
      <div className="grid grid-cols-1 md:grid-cols-3 ">
        <div className="my-2">
          <p className="font-bold text-xl">🚀 Languages</p>
          {user.skills.languages.map((item: string, index: number) => (
            <p key={index} className="mt-2 text-lg">
              ~ {item}
            </p>
          ))}
        </div>
        <div className="my-2">
          <p className="font-bold text-xl">🛸 Frameworks && Library </p>
          {user.skills.frameworks.map((item: string, index: number) => (
            <p key={index} className="mt-2 text-lg">
              ~ {item}
            </p>
          ))}
        </div>
        <div className="my-2">
          <p className="font-bold text-xl">⌨️ ORM</p>
          {user.skills.orm.map((item: string, index: number) => (
            <p key={index} className="mt-2 text-lg">
              ~ {item}
            </p>
          ))}
        </div>
        <div className="my-2">
          <p className="font-bold text-xl">📂 DataBase</p>
          {user.skills.database.map((item: string, index: number) => (
            <p key={index} className="mt-2 text-lg">
              ~ {item}
            </p>
          ))}
        </div>
        <div className="my-2">
          <p className="font-bold text-xl">🔧 Tools</p>
          {user.skills.tools.map((item: string, index: number) => (
            <p key={index} className="mt-2 text-lg">
              ~ {item}
            </p>
          ))}
        </div>
        <div className="my-2">
          <p className="font-bold text-xl">📄 Other</p>
          {user.skills.other.map((item: string, index: number) => (
            <p key={index} className="mt-2 text-lg">
              ~ {item}
            </p>
          ))}
        </div>
      </div>
    </Fade>
  );
};
