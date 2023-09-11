import { Fade } from "react-awesome-reveal";
import user from "./data/user.json";

export const Contact: React.FC<{}> = () => {
  return (
    <Fade>
      <div className="flex flex-col">
        <div className="my-2">
          <p className="font-bold text-xl">🤵🏼 Contact</p>
          <p className="text-lg">Email: {user.contact.email}</p>
          <p className="text-lg">LinkIn: {user.contact.linkin}</p>
          <p className="text-lg">Github: {user.contact.github}</p>
          <p className="text-lg">Website: {user.contact.website}</p>
          <p className="text-lg">Phone: {user.contact.phone}</p>
        </div>
        <div className="my-2">
          <p className="font-bold text-xl">🏠 Address</p>
          <p className="text-lg">{user.contact.address}</p>
        </div>
      </div>
    </Fade>
  );
};
