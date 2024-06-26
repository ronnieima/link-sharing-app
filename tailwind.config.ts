import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    colors: {
      purple: "#633CFF",
      purpleHover: "#BEADFF",
      lightPurple: "#EFEBFF",
      darkGray: "#333333",
      gray: "#737373",
      border: "#D9D9D9",
      lightGray: "#FAFAFA",
      white: "#FFFFFF",
      red: "#FF3939",
    },
    backgroundImage: {
      phonePreview: "url('/images/illustration-phone-mockup.svg')",
    },
    extend: {
      aria: {
        invalid: 'invalid="true"',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
