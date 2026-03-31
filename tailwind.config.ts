import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: "#121212",
          50: "#1a1a1a",
          100: "#232323",
          200: "#2d2d2d",
          300: "#363636",
          400: "#1f1f1f",
          500: "#121212",
          600: "#0e0e0e",
          700: "#0a0a0a",
          800: "#060606",
          900: "#020202",
        },
        gold: {
          DEFAULT: "#D4AF37",
          50: "#faf6e8",
          100: "#f5edcf",
          200: "#ecdb9f",
          300: "#e2c96f",
          400: "#d9b740",
          500: "#D4AF37",
          600: "#a8891b",
          700: "#7d6516",
          800: "#524110",
          900: "#271e0a",
        },
        offwhite: {
          DEFAULT: "#F5F5F5",
          50: "#ffffff",
          100: "#F5F5F5",
          200: "#e8e8e8",
          300: "#d4d4d4",
          400: "#b0b0b0",
          500: "#8c8c8c",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        hindi: ["var(--font-hind)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern": "url('/hero-pattern.svg')",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
