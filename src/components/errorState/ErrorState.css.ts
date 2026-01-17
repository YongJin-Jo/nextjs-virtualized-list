import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const fadeIn = keyframes({
  "0%": { opacity: 0, transform: "translateY(10px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const shake = keyframes({
  "0%, 100%": { transform: "translateX(0)" },
  "25%": { transform: "translateX(-5px)" },
  "75%": { transform: "translateX(5px)" },
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "60px 20px",
  animation: `${fadeIn} 0.4s ease-out`,
  flexGrow: 1,
  height: "100%",
});

export const iconWrapper = style({
  marginBottom: "20px",
  animation: `${shake} 0.5s ease-in-out`,
});

export const icon = style({
  width: "64px",
  height: "64px",
  color: "#ef4444",
});

export const title = style({
  fontSize: "18px",
  fontWeight: 600,
  color: vars.color.foreground,
  marginBottom: "8px",
});

export const description = style({
  fontSize: "14px",
  color: vars.color.secondary,
  textAlign: "center",
  lineHeight: 1.5,
  marginBottom: "24px",
});

export const retryButton = style({
  padding: "12px 24px",
  fontSize: "14px",
  fontWeight: 500,
  color: "#fff",
  backgroundColor: vars.color.primary,
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "opacity 0.2s ease",
  ":hover": {
    opacity: 0.8,
  },
  ":active": {
    transform: "scale(0.98)",
  },
});
