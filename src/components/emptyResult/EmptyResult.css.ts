import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

const fadeIn = keyframes({
  "0%": { opacity: 0, transform: "translateY(10px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const float = keyframes({
  "0%, 100%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-8px)" },
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
  animation: `${float} 3s ease-in-out infinite`,
});

export const icon = style({
  width: "80px",
  height: "80px",
  color: "#d1d5db",
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
});
