import { Fade } from "react-awesome-reveal";
import Image from "next/image";

import Link from "next/link";
import { IUserData } from "../types/user-type";
import SectionTitle from "./title";
interface Prop {
  user: IUserData | undefined;
}

const Contact: React.FC<Prop> = ({ user }) => {
  return (
    <>
      {user && (
        <Fade cascade damping={0.1}>
          <SectionTitle title="contact" subtitle="get in touch" />
          <div className="flex flex-col">
            <div className="flex space-x-4 m-2">
              <Image
                src={`/images/email.png`}
                alt={`linkin`}
                width={100}
                height={100}
                loading="lazy"
                style={{ width: "40px", height: "auto" }}
              />
              <Link
                href={`mailto:${user.contact.email}`}
                className="my-2 text-xs md:text-lg"
              >
                {user.contact.email}
              </Link>
            </div>
            <div className="flex space-x-4 m-2">
              <Image
                src={`/images/linkin.png`}
                alt={`linkin`}
                width={100}
                height={100}
                loading="lazy"
                style={{ width: "40px", height: "auto" }}
              />
              <Link
                href={` https://linkedin.com/in/${user.contact.linkin}`}
                target="_blank"
                className="my-2 text-xs md:text-lg"
              >
                {user.contact.linkin}
              </Link>
            </div>
            <div className="flex space-x-4 m-2">
              <Image
                src={`/images/github.png`}
                alt={`github`}
                width={100}
                height={100}
                loading="lazy"
                style={{ width: "40px", height: "auto" }}
              />
              <Link
                href={user.contact.github}
                target="_blank"
                className="my-2 text-xs md:text-lg"
              >
                {user.contact.github}
              </Link>
            </div>
            <div className="flex space-x-4 m-2">
              <Image
                src={`/images/website.png`}
                alt={`website`}
                width={100}
                height={100}
                loading="lazy"
                style={{ width: "40px", height: "auto" }}
              />
              <Link
                href={user.contact.website}
                target="_blank"
                className="my-2 text-xs md:text-lg"
              >
                {user.contact.website}
              </Link>
            </div>
          </div>
        </Fade>
      )}
    </>
  );
};

export default Contact;
