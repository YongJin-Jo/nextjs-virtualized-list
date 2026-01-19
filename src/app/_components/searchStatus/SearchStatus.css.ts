import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const fadeIn = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const pulse = keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.5 },
});

export const container = style({
  marginBottom: "16px",
  fontSize: "14px",
  color: vars.color.secondary,
  animation: `${fadeIn} 0.3s ease-out`,
});

export const loading = style({
  animation: `${pulse} 1.5s ease-in-out infinite`,
});

export const query = style({
  fontWeight: 600,
  color: vars.color.foreground,
});

export const count = style({
  color: vars.color.secondary,
});
