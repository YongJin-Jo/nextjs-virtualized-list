import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const content = style({
  display: "grid",
  gridTemplateColumns: "300px 1fr",
  gap: "32px",
  "@media": {
    "(max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const thumbnailWrapper = style({
  position: "relative",
  width: "100%",
  aspectRatio: "3 / 4",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
});

export const info = style({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const title = style({
  fontSize: "28px",
  fontWeight: 700,
  color: vars.color.foreground,
  margin: 0,
  "@media": {
    "(max-width: 768px)": {
      fontSize: "24px",
    },
  },
});

export const author = style({
  fontSize: "16px",
  color: vars.color.secondary,
});

export const meta = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "16px",
  fontSize: "14px",
  color: vars.color.secondary,
});

export const metaItem = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

export const tags = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
});

export const tag = style({
  padding: "6px 12px",
  fontSize: "13px",
  color: vars.color.secondary,
  backgroundColor: "#f0f0f0",
  borderRadius: "20px",
  transition: "all 0.2s ease",
  ":hover": {
    backgroundColor: "#e0e0e0",
  },
});

export const genre = style({
  padding: "6px 12px",
  fontSize: "13px",
  fontWeight: 500,
  color: "#fff",
  backgroundColor: vars.color.primary,
  borderRadius: "20px",
});

export const description = style({
  fontSize: "15px",
  lineHeight: 1.7,
  color: vars.color.foreground,
  whiteSpace: "pre-wrap",
});

export const newBadge = style({
  color: "#ef4444",
  fontWeight: 600,
});
