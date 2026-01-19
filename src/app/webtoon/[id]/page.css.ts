import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const shimmer = keyframes({
  "0%": { backgroundPosition: "-200px 0" },
  "100%": { backgroundPosition: "calc(200px + 100%) 0" },
});

export const container = style({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "24px 16px",
});

export const backButton = style({
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 16px",
  marginBottom: "24px",
  fontSize: "14px",
  color: vars.color.secondary,
  backgroundColor: "transparent",
  border: "1px solid #e5e5e5",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  textDecoration: "none",
  ":hover": {
    backgroundColor: vars.color.background,
    color: vars.color.foreground,
  },
});

// 스켈레톤 스타일
export const skeletonSection = style({
  marginTop: "32px",
});

export const skeletonTitle = style({
  width: "120px",
  height: "24px",
  marginBottom: "16px",
  borderRadius: "4px",
  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
  backgroundSize: "200px 100%",
  animation: `${shimmer} 1.5s infinite`,
});

export const skeletonItem = style({
  height: "80px",
  marginBottom: "12px",
  borderRadius: "8px",
  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
  backgroundSize: "200px 100%",
  animation: `${shimmer} 1.5s infinite`,
});

export const skeletonGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "16px",
  "@media": {
    "(max-width: 768px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
});

export const skeletonCard = style({
  aspectRatio: "3/4",
  borderRadius: "8px",
  background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
  backgroundSize: "200px 100%",
  animation: `${shimmer} 1.5s infinite`,
});
