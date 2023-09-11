import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

interface Prop {
  mode: boolean;
}

export default function Stars({ mode }: Prop) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={
        mode
          ? {
              autoPlay: true,
              background: {
                color: {
                  value: "#111111",
                },
                image: "",
                position: "",
                repeat: "",
                size: "",
                opacity: 1,
              },
              backgroundMask: {
                composite: "destination-out",
                cover: {
                  color: {
                    value: "#fff",
                  },
                  opacity: 1,
                },
                enable: false,
              },
              backgroundMode: {
                enable: true,
                zIndex: -1,
              },
              detectRetina: true,
              fpsLimit: 120,
              infection: {
                cure: true,
                delay: 0,
                enable: false,
                infections: 0,
                stages: [],
              },
              interactivity: {
                detectsOn: "window",
                events: {
                  onClick: {
                    enable: false,
                    mode: [],
                  },
                  onDiv: {
                    selectors: [],
                    enable: false,
                    mode: [],
                    type: "circle",
                  },
                  onHover: {
                    enable: false,
                    mode: "attract",
                    parallax: {
                      enable: false,
                      force: 2,
                      smooth: 10,
                    },
                  },
                  resize: false,
                },
                modes: {
                  attract: {
                    distance: 200,
                    duration: 0.4,
                    speed: 1,
                  },
                  bounce: {
                    distance: 200,
                  },
                  bubble: {
                    distance: 200,
                    duration: 0.4,
                  },
                  connect: {
                    distance: 80,
                    links: {
                      opacity: 0.5,
                    },
                    radius: 60,
                  },
                  grab: {
                    distance: 100,
                    links: {
                      blink: false,
                      consent: false,
                      opacity: 1,
                    },
                  },
                  light: {
                    area: {
                      gradient: {
                        start: {
                          value: "#ffffff",
                        },
                        stop: {
                          value: "#000000",
                        },
                      },
                      radius: 1000,
                    },
                    shadow: {
                      color: {
                        value: "#000000",
                      },
                      length: 2000,
                    },
                  },
                  push: {
                    quantity: 4,
                  },
                  remove: {
                    quantity: 2,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                    speed: 1,
                  },
                  slow: {
                    factor: 3,
                    radius: 200,
                  },
                  trail: {
                    delay: 0.005,
                    quantity: 5,
                    particles: {
                      color: {
                        value: "#ff0000",
                        animation: {
                          enable: true,
                          speed: 400,
                          sync: true,
                        },
                      },
                      collisions: {
                        enable: false,
                        bounce: {
                          horizontal: {
                            random: {},
                          },
                          vertical: {
                            random: {},
                          },
                        },
                      },
                      links: {
                        enable: false,
                        shadow: {},
                        triangles: {},
                      },
                      move: {
                        outMode: "destroy",
                        speed: 5,
                        angle: {},
                        attract: {
                          rotate: {},
                        },
                        gravity: {},
                        noise: {
                          delay: {
                            random: {},
                          },
                        },
                        outModes: {},
                        trail: {},
                      },
                      size: {
                        value: 5,
                        animation: {
                          enable: true,
                          speed: 5,
                          minimumValue: 1,
                          sync: true,
                          startValue: "min",
                          destroy: "max",
                        },
                        random: {},
                      },
                      bounce: {
                        horizontal: {
                          random: {},
                        },
                        vertical: {
                          random: {},
                        },
                      },
                      life: {
                        delay: {
                          random: {},
                        },
                        duration: {
                          random: {},
                        },
                      },
                      number: {
                        density: {},
                      },
                      opacity: {
                        animation: {},
                        random: {},
                      },
                      rotate: {
                        animation: {},
                      },
                      shadow: {
                        offset: {},
                      },
                      shape: {},
                      stroke: {
                        color: {
                          value: "",
                          animation: {
                            enable: false,
                            speed: 0,
                            sync: false,
                          },
                        },
                      },
                      twinkle: {
                        lines: {},
                        particles: {},
                      },
                    },
                  },
                },
              },
              manualParticles: [],
              motion: {
                disable: false,
                reduce: {
                  factor: 16,
                  value: true,
                },
              },
              particles: {
                number: {
                  value: 355,
                  density: {
                    enable: true,
                    value_area: 789.1476416322727,
                  },
                },
                color: {
                  value: "#ffffff",
                },
                shape: {
                  type: "circle",
                  stroke: {
                    width: 0,
                    color: "#000000",
                  },
                  polygon: {
                    nb_sides: 5,
                  },
                  image: {
                    src: "img/github.svg",
                    width: 100,
                    height: 100,
                  },
                },
                opacity: {
                  value: 0.48927153781200905,
                  random: false,
                  anim: {
                    enable: true,
                    speed: 0.2,
                    opacity_min: 0,
                    sync: false,
                  },
                },
                size: {
                  value: 2,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0,
                    sync: false,
                  },
                },
                line_linked: {
                  enable: false,
                  distance: 150,
                  color: "#ffffff",
                  opacity: 0.4,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 0.2,
                  direction: "none",
                  random: true,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                  attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200,
                  },
                },
              },
              pauseOnBlur: false,
              pauseOnOutsideViewport: true,
              themes: [],
            }
          : {
              autoPlay: true,
              background: {
                color: {
                  value: "#add8e6",
                },
                image: "",
                position: "",
                repeat: "",
                size: "",
                // opacity: 1,
              },
              backgroundMask: {
                composite: "destination-out",
                cover: {
                  color: {
                    value: "#000000",
                  },
                  opacity: 1,
                },
                enable: false,
              },
              backgroundMode: {
                enable: true,
                zIndex: -1,
              },
              detectRetina: true,
              fpsLimit: 120,
              infection: {
                cure: true,
                delay: 0,
                enable: false,
                infections: 0,
                stages: [],
              },
              interactivity: {
                detectsOn: "window",
                events: {
                  onClick: {
                    enable: false,
                    mode: [],
                  },
                  onDiv: {
                    selectors: [],
                    enable: false,
                    mode: [],
                    type: "circle",
                  },
                  onHover: {
                    enable: false,
                    mode: "attract",
                    parallax: {
                      enable: false,
                      force: 2,
                      smooth: 10,
                    },
                  },
                  resize: false,
                },
                modes: {
                  attract: {
                    distance: 200,
                    duration: 0.4,
                    speed: 1,
                  },
                  bounce: {
                    distance: 200,
                  },
                  bubble: {
                    distance: 200,
                    duration: 0.4,
                  },
                  connect: {
                    distance: 80,
                    links: {
                      opacity: 0.5,
                    },
                    radius: 60,
                  },
                  grab: {
                    distance: 100,
                    links: {
                      blink: false,
                      consent: false,
                      opacity: 1,
                    },
                  },
                  light: {
                    area: {
                      gradient: {
                        start: {
                          value: "#ffffff",
                        },
                        stop: {
                          value: "#000000",
                        },
                      },
                      radius: 1000,
                    },
                    shadow: {
                      color: {
                        value: "#000000",
                      },
                      length: 2000,
                    },
                  },
                  push: {
                    quantity: 4,
                  },
                  remove: {
                    quantity: 2,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                    speed: 1,
                  },
                  slow: {
                    factor: 3,
                    radius: 200,
                  },
                  trail: {
                    delay: 0.005,
                    quantity: 5,
                    particles: {
                      color: {
                        value: "#ff0000",
                        animation: {
                          enable: true,
                          speed: 400,
                          sync: true,
                        },
                      },
                      collisions: {
                        enable: false,
                        bounce: {
                          horizontal: {
                            random: {},
                          },
                          vertical: {
                            random: {},
                          },
                        },
                      },
                      links: {
                        enable: false,
                        shadow: {},
                        triangles: {},
                      },
                      move: {
                        outMode: "destroy",
                        speed: 5,
                        angle: {},
                        attract: {
                          rotate: {},
                        },
                        gravity: {},
                        noise: {
                          delay: {
                            random: {},
                          },
                        },
                        outModes: {},
                        trail: {},
                      },
                      size: {
                        value: 5,
                        animation: {
                          enable: true,
                          speed: 5,
                          minimumValue: 1,
                          sync: true,
                          startValue: "min",
                          destroy: "max",
                        },
                        random: {},
                      },
                      bounce: {
                        horizontal: {
                          random: {},
                        },
                        vertical: {
                          random: {},
                        },
                      },
                      life: {
                        delay: {
                          random: {},
                        },
                        duration: {
                          random: {},
                        },
                      },
                      number: {
                        density: {},
                      },
                      opacity: {
                        animation: {},
                        random: {},
                      },
                      rotate: {
                        animation: {},
                      },
                      shadow: {
                        offset: {},
                      },
                      shape: {},
                      stroke: {
                        color: {
                          value: "",
                          animation: {
                            enable: false,
                            speed: 0,
                            sync: false,
                          },
                        },
                      },
                      twinkle: {
                        lines: {},
                        particles: {},
                      },
                    },
                  },
                },
              },
              manualParticles: [],
              motion: {
                disable: false,
                reduce: {
                  factor: 16,
                  value: true,
                },
              },
              particles: {
                number: {
                  value: 355,
                  density: {
                    enable: true,
                    value_area: 800,
                  },
                },
                color: {
                  value: "#106d8a",
                },
                shape: {
                  type: "circle",
                  stroke: {
                    width: 0,
                    color: "#ffffff",
                  },
                  polygon: {
                    nb_sides: 5,
                  },
                },
                opacity: {
                  value: 0.5,
                  random: false,
                  anim: {
                    enable: true,
                    speed: 0.2,
                    opacity_min: 0,
                    sync: false,
                  },
                },
                size: {
                  value: 2,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0,
                    sync: false,
                  },
                },
                line_linked: {
                  enable: false,
                  distance: 150,
                  color: "#ffffff",
                  opacity: 0.4,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 1,
                  direction: "none",
                  random: true,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                  attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200,
                  },
                },
              },
              pauseOnBlur: false,
              pauseOnOutsideViewport: true,
              themes: [],
            }
      }
    />
  );
}
