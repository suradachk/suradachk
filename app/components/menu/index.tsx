import React from "react";
import "./style.css";

interface Prop {
  menu: string;
  onClick: (menu: string) => void;
}

export default function Menu({ menu, onClick }: Prop) {
  const menuList = [
    {
      key: "about",
      label: "About",
    },
    {
      key: "experience",
      label: "Experience",
    },
    {
      key: "skills",
      label: "Skills",
    },
    {
      key: "contact",
      label: "Contact",
    },
  ];
  return (
    menuList && (
      <div className="grid grid-cols-4 mt-4">
        {menuList.map((m) => (
          <div
            className="flex justify-center"
            key={m.key}
            onClick={() => onClick(m.key)}
          >
            <div className={`menu ${menu === m.key ? "active" : ""}`}>
              {m.label}
            </div>
          </div>
        ))}
      </div>
    )
  );
}
