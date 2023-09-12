import React from "react";
import "./style.css";
import { IData } from "../layout";

interface Prop {
  data: IData[];
  menu: string;
  onClick: (menu: string) => void;
}

export default function Menu({ data, menu, onClick }: Prop) {
  return (
    data && (
      <div className="grid grid-cols-4 mt-6">
        {data.map((m: IData) => (
          <div
            className="flex justify-center"
            key={m.key}
            onClick={() => onClick(m.key)}
          >
            <div className={`menu ${menu === m.key ? "active" : ""}`}>
              <a href={`#${m.key}`} className="font-bold">
                {m.label}
              </a>
            </div>
          </div>
        ))}
      </div>
    )
  );
}
