import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const card = style({
  display: "flex",
  flexDirection: "column",
  borderRadius: "8px",
  overflow: "hidden",
  backgroundColor: vars.color.background,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s, box-shadow 0.2s",
  cursor: "pointer",
  textDecoration: "none",
  ":hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
  },
  ":focus-visible": {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: "2px",
  },
});

export const thumbnail = style({
  width: "100%",
  aspectRatio: "3 / 4",
  objectFit: "cover",
});

export const content = style({
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const title = style({
  fontSize: "16px",
  fontWeight: 600,
  color: vars.color.primary,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const author = style({
  fontSize: "14px",
  color: vars.color.secondary,
});

export const tags = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "4px",
});

export const tag = style({
  fontSize: "12px",
  color: vars.color.secondary,
  backgroundColor: "#f0f0f0",
  padding: "2px 8px",
  borderRadius: "4px",
});

export const meta = style({
  display: "flex",
  justifyContent: "space-between",
  fontSize: "12px",
  color: vars.color.secondary,
});
