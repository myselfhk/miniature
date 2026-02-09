import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        paper: "var(--paper)",
        bg: "var(--bg)",
        text: "var(--text)",
        muted: "var(--muted)",
        dim: "var(--dim)",
        border: "var(--border)",
        accent: {
          magenta: "var(--accent-magenta)",
          cyan: "var(--accent-cyan)",
          yellow: "var(--accent-yellow)",
        },
      },
      fontFamily: {
        sans: ["var(--font-host-grotesk)", "system-ui", "sans-serif"],
        serif: ["var(--font-flecha)", "serif"],
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at 50% 50%, rgba(2, 20, 20, 0), rgba(2, 20, 20, 1))",
        "card-gradient":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        wide: "0.02em",
        wider: "0.05em",
        widest: "0.15em",
      },
      transitionTimingFunction: {
        custom: "var(--ease)", // cubic-bezier(.84, 0, .16, 1)
        expo: "var(--expoInOut)", // cubic-bezier(.87, 0, .13, 1)
        smooth: "var(--smooth)", // cubic-bezier(.76, 0 ,.24 ,1)
      },
    },
  },
  plugins: [],
};

export default config;
