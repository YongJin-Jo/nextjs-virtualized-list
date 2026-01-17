import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const shimmer = keyframes({
  "0%": {
    backgroundPosition: "-200% 0",
  },
  "100%": {
    backgroundPosition: "200% 0",
  },
});

const skeletonBase = style({
  background: `linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  )`,
  backgroundSize: "200% 100%",
  animation: `${shimmer} 1.5s infinite`,
  borderRadius: "4px",
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  borderRadius: "8px",
  overflow: "hidden",
  backgroundColor: vars.color.background,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
});

export const thumbnail = style([
  skeletonBase,
  {
    width: "100%",
    aspectRatio: "3 / 4",
  },
]);

export const content = style({
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const title = style([
  skeletonBase,
  {
    height: "20px",
    width: "80%",
  },
]);

export const author = style([
  skeletonBase,
  {
    height: "16px",
    width: "50%",
  },
]);

export const tags = style({
  display: "flex",
  gap: "4px",
});

export const tag = style([
  skeletonBase,
  {
    height: "20px",
    width: "50px",
  },
]);

export const meta = style({
  display: "flex",
  justifyContent: "space-between",
});

export const metaItem = style([
  skeletonBase,
  {
    height: "14px",
    width: "40px",
  },
]);
