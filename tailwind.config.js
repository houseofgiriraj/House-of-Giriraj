import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./*.html", "./src/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        surface: "var(--bg-surface)",
        "surface-low": "var(--bg-surface-low)",
        "surface-raised": "var(--bg-surface-raised)",
        "surface-high": "var(--bg-surface-high)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        gold: "var(--accent-gold)",
        "gold-deep": "var(--accent-gold-deep)",
        line: "var(--border-subtle)"
      },
      fontFamily: {
        serif: ["Noto Serif", "Georgia", "serif"],
        sans: ["Manrope", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 80px var(--shadow-gold)",
        "deep-soft": "0 28px 100px rgba(0, 0, 0, 0.42)"
      },
      letterSpacing: {
        luxury: "0.18em",
        "luxury-wide": "0.32em"
      }
    }
  },
  plugins: [forms]
};
