import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050505",
        card: "#121212",
        cardhi: "#1A1A1A",
        line: "#232323",
        muted: "#8A8A8A",
        neon: "#7ED321",
        blood: "#E11D48",
      },
      fontFamily: {
        display: ["Anton", "Impact", "Haettenschweiler", "sans-serif"],
        head: ["'Bebas Neue'", "Anton", "Impact", "sans-serif"],
        body: ["Inter", "Sora", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(126,211,33,.45), 0 18px 50px -18px rgba(126,211,33,.45)",
        blood: "0 14px 40px -14px rgba(225,29,72,.75)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "translateY(18px) scale(.985)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        pulseLine: {
          "0%,100%": { opacity: ".35" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        riseIn: "riseIn .6s cubic-bezier(.22,1,.36,1) both",
        popIn: "popIn .32s cubic-bezier(.22,1,.36,1) both",
        fadeIn: "fadeIn .25s ease-out both",
        pulseLine: "pulseLine 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
