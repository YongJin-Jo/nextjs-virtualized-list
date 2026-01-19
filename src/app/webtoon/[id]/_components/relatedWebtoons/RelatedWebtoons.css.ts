import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const section = style({
  marginTop: "48px",
});

export const title = style({
  fontSize: "20px",
  fontWeight: 600,
  color: vars.color.foreground,
  marginBottom: "20px",
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",

  gap: "16px",
  "@media": {
    "(max-width: 768px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    "(max-width: 480px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
});
