import "./index.css";

interface Prop {
  mode: boolean;
}

export const SunMoon = ({ mode }: Prop) => {
  return (
    <>
      {mode ? (
        <div className="flex">
          <div className="zzz1"></div>
          <div className="zzz2"></div>
          <div className="zzz3"></div>
          <div className="planet" />
          <div className="star pos-star1 "></div>
          <div className="star pos-star2 "></div>
          <div className="star pos-star3 "></div>
        </div>
      ) : (
        <div className="day">
          <div className="zzz1"></div>
          <div className="zzz2"></div>
          <div className="zzz3"></div>
          <div className="planet" />
          <div className="star pos-star1 "></div>
          <div className="star pos-star2 "></div>
          <div className="star pos-star3 "></div>
        </div>
      )}
    </>
  );
};
