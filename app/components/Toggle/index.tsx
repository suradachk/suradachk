import React from "react";
import "./style.css";

interface Prop {
  toggled: boolean;
  onClick: () => void;
}

export default function Toggle({ toggled, onClick }: Prop) {
  return (
    <div
      onClick={() => onClick()}
      className={`toggle ${toggled ? "night" : "day"}`}
    >
      <div className="notch">
        <div className="crater" />
        <div className="crater" />
      </div>
      <div>
        <div className="shape sm" />
        <div className="shape sm" />
        <div className="shape md" />
        <div className="shape lg" />
      </div>
    </div>
  );
}
