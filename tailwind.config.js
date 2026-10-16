const c = (n) => `rgb(var(--${n}) / <alpha-value>)`;
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { bg: c("bg"), fg: c("fg"), muted: c("muted"), card: c("card"), line: c("line"), accent: c("accent"), accent2: c("accent2"), onaccent: c("onaccent") },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
