import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  height: "100vh",
  overflow: "auto",
});

export const containerHydrated = style({
  height: "calc(100vh - 120px)",
  overflow: "auto",
});

export const containerInitial = style({
  height: "auto",
  overflow: "visible",
});

export const article = style({
  position: "relative",
});

export const articleInitial = style({
  position: "static",
});

// Chrome DevTools 기준 디바이스 브레이크포인트
// Mobile S: 320px, Mobile M: 375px, Mobile L: 425px
// Tablet: 768px, Laptop: 1024px, Laptop L: 1440px
export const grid = style({
  display: "grid",
  gap: "16px",
  gridTemplateColumns: "repeat(1, 1fr)", // Mobile S (기본)
  "@media": {
    // Mobile M (375px 이상)
    "(min-width: 375px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    // Tablet (768px 이상)
    "(min-width: 768px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    // Laptop (1024px 이상)
    "(min-width: 1024px)": {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
});

export const loadingGrid = style({
  display: "grid",
  gap: "16px",
  marginTop: "16px",
  gridTemplateColumns: "repeat(1, 1fr)",
  "@media": {
    "(min-width: 375px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "(min-width: 768px)": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    "(min-width: 1024px)": {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
    "(min-width: 1440px)": {
      gridTemplateColumns: "repeat(5, 1fr)",
    },
  },
});
