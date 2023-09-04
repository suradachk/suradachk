import React from "react";
import "./style.css";

interface Prop {
  toggled: boolean;
  onClick: (event: boolean) => void;
}

export default function Toggle({ toggled, onClick }: Prop) {
  return (
    <div
      onClick={() => onClick(!toggled)}
      className={`toggle${toggled ? " night" : ""}`}
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
