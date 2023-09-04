"use client";

import { useState } from "react";
import Image from "next/image";
import Toggle from "./components/Toggle";

export default function Home() {
  const [mode, setMode] = useState<boolean>(true);
  return (
    <>
      <div className="main">
        <div className={`overlay ${mode ? "nighttime" : "daytime"}`} />
        <video autoPlay loop muted id={"bgVideo"}>
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
        <div className="content" style={{ color: mode ? "white" : "black" }}>
          <div className="relative flex justify-end h-10 w-full">
            <Toggle toggled={mode} onClick={setMode} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 mt-10">
            <div className="flex justify-center md:justify-end">
              <div className="card-profile">
                <Image
                  src={"/images/suradachk.jpg"}
                  width={500}
                  height={500}
                  alt="suradachk"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="card-text mt-2 ml-4 md:mr-10">SURADACHK</div>
            </div>
          </div>
          <div className="grid grid-cols-4 mt-4">
            <div className="flex justify-center">
              <div className="menu">About</div>
            </div>
            <div className="flex justify-center">
              <div className="menu">Experience</div>
            </div>
            <div className="flex justify-center">
              <div className="menu">Stack</div>
            </div>
            <div className="flex justify-center">
              <div className="menu">Contact</div>
            </div>
          </div>
          <div className="grid grid-cols-1 w-full ">
            <div className="card-text m-4 md:mx-20">
              SURADACHK SURADACHK SURADACHK SURADACHK SURADACHK SURADACHK
              SURADACHK SURADACHK SURADACHK SURADACHK SURADACHK SURADACHK
              SURADACHK SURADACHK SURADACHK SURADACHK SURADACHK SURADACHK
              SURADACHK SURADACHK
            </div>
          </div>
          <div className="flex justify-center"> Copyright By SURADACHK</div>
        </div>
      </div>
    </>
  );
}
