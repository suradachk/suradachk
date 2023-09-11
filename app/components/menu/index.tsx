import React from "react";
import "./style.css";
import { IData } from "@/app/page";

interface Prop {
  data: IData[];
  menu: string;
  onClick: (menu: string) => void;
}

export default function Menu({ data, menu, onClick }: Prop) {
  return (
    data && (
      <div className="grid grid-cols-4 mt-4">
        {data.map((m) => (
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
