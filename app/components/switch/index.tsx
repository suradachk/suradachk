import React from "react";
import "./style.css";

interface Prop {
  mode: boolean;
  onClick: () => void;
}

export default function Switch({ mode, onClick }: Prop) {
  return (
    <div
      onClick={() => onClick()}
      className={`toggle ${mode ? "night" : "day"}`}
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
