import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    background: "#ffffff",
    foreground: "#171717",
    primary: "#000000",
    secondary: "#666666",
  },
});
