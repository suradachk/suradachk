import React from "react";
import "./style.css";
import { IData } from "@/app/page";
import Link from "next/link";

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
              <Link href={`#${m.key}`} className="font-bold">
                {m.label}
              </Link>
            </div>
          </div>
        ))}
      </div>
    )
  );
}
