import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        brand: {
          cyan: "#00f0ff",
          purple: "#7928ca",
          pink: "#ff0080",
          neon: "#00ffcc",
          dark: "#0b0f19",
          darker: "#06090e",
          card: "rgba(15, 23, 42, 0.7)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
