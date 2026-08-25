/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0B0B",
          50: "#F4F4F3",
          100: "#E7E6E3",
          200: "#C9C7C2",
          300: "#8E8B85",
          400: "#5C5954",
          500: "#2E2C2A",
          600: "#1A1918",
          700: "#121211",
          800: "#0B0B0B",
          900: "#070707",
        },
        paper: {
          DEFAULT: "#F6F3EE",
          dark: "#EBE6DC",
        },
        bronze: {
          DEFAULT: "#B8956A",
          light: "#D4BC94",
          dark: "#8C6D45",
          muted: "#C4A574",
        },
      },
      fontFamily: {
        display: ['"Elms Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Elms Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        frame: "0 24px 60px rgba(11, 11, 11, 0.22)",
        glow: "0 0 0 1px rgba(184, 149, 106, 0.35), 0 20px 50px rgba(0, 0, 0, 0.28)",
      },
      letterSpacing: {
        brand: "0.18em",
      },
      backgroundImage: {
        "hero-wash":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(184, 149, 106, 0.22), transparent 55%), linear-gradient(180deg, rgba(7, 7, 7, 0.25) 0%, rgba(7, 7, 7, 0.72) 48%, #070707 100%)",
      },
    },
  },
  plugins: [],
};
