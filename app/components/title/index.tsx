import { m, LazyMotion, domAnimation } from "framer-motion";

interface Prop {
  title: string;
  subtitle: string;
}

const SectionTitle: React.FC<Prop> = ({ title, subtitle }) => {
  return (
    <div className="flex justify-center">
      <div>
        <span
          className="opacity-50"
          style={{
            textTransform: "lowercase",
            fontWeight: "600",
          }}
        >
          {subtitle}
        </span>
        <h2 className="tracking-wider text-2xl md:text-2xl">
          {title.split("").map((char, index) => {
            if (char === " ") {
              return " ";
            }
            return (
              <span key={index} className="bounce uppercase font-bold">
                {char}
              </span>
            );
          })}
        </h2>
      </div>
    </div>
  );
};

export default SectionTitle;
