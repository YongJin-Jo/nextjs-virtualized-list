import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const page = style({
  minHeight: "100vh",
  maxWidth: "1200px",
  padding: "24px",
  backgroundColor: vars.color.background,
  margin: "0 auto",
});

export const title = style({
  fontSize: "24px",
  fontWeight: 700,
  marginBottom: "24px",
  color: vars.color.primary,
});

export const group = style({
  height: "90vh",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
});
