import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Pretendard", "Inter", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          DEFAULT: "#111827",
          muted: "#6B7280",
          accent: "#22d3ee"
        }
      }
    }
  },
  plugins: []
};

export default config;
