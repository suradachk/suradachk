import { useCallback } from "react";
import { Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

interface Prop {
  mode: boolean;
}

export default function BackGround({ mode }: Prop) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        autoPlay: true,
        fullScreen: {
          enable: true,
          zIndex: 0,
        },

        detectRetina: true,
        fpsLimit: 120,

        interactivity: {
          events: {
            onDiv: [
              {
                selectors: "#repulse-div",
                enable: true,
                mode: "bounce",
                type: "circle",
              },
            ],
          },
        },

        particles: {
          collisions: {
            enable: true,
            mode: "bounce",
          },
          color: {
            value: mode ? "#fff" : "#003dc0",
          },
          move: {
            angle: {
              offset: 0,
              value: 90,
            },
            center: {
              x: 50,
              y: 50,
              mode: "percent",
              radius: 0,
            },
            direction: "none",
            drift: 0,
            enable: true,
            random: true,
            size: false,
            speed: 0.5,
            outMode: "bounce",
          },
          number: {
            limit: 0,
            value: 80,
          },

          opacity: {
            random: {
              enable: true,
              minimumValue: 0.3,
            },
            value: 0.4,
            animation: {
              count: 0,
              enable: true,
              speed: 0.2,
              decay: 0,
              sync: true,
              destroy: "none",
              startValue: "random",
            },
          },

          shape: {
            type: "character",
            character: [
              {
                fill: true,
                font: "Font Awesome 6 Brands",
                style: "",
                value: ["\uf13b"],
                weight: "400",
              },
              {
                fill: true,
                font: "Font Awesome 6 Brands",
                style: "",
                value: ["\uf38b"],
                weight: "400",
              },
              {
                fill: true,
                font: "Font Awesome 6 Brands",
                style: "",
                value: ["\uf3b9"],
                weight: "400",
              },
              {
                fill: true,
                font: "Font Awesome 6 Brands",
                style: "",
                value: ["\uf41b"],
                weight: "400",
              },
              {
                fill: true,
                font: "Font Awesome 6 Brands",
                style: "",
                value: ["\uf419"],
                weight: "400",
              },
              {
                fill: true,
                font: "Font Awesome 6 Brands",
                style: "",
                value: ["\uf3d3"],
                weight: "400",
              },
            ],
          },

          size: {
            random: {
              enable: true,
              minimumValue: 15,
            },
            animation: {
              count: 0,
              enable: false,
              speed: 0.2,
              decay: 0,
              sync: false,
              destroy: "none",
              startValue: "random",
            },
          },
        },
        pauseOnBlur: true,
        pauseOnOutsideViewport: true,
        smooth: true,
      }}
    />
  );
}
