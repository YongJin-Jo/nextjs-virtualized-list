import { style, styleVariants } from "@vanilla-extract/css";

export const base = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "inherit",
  fontWeight: 500,
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.2s, border-color 0.2s, transform 0.1s",
  border: "none",
  ":disabled": {
    cursor: "not-allowed",
    opacity: 0.5,
  },
  ":active:not(:disabled)": {
    transform: "scale(0.98)",
  },
});

export const variants = styleVariants({
  primary: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    ":hover:not(:disabled)": {
      backgroundColor: "#2563eb",
    },
  },
  secondary: {
    backgroundColor: "#6b7280",
    color: "#fff",
    ":hover:not(:disabled)": {
      backgroundColor: "#4b5563",
    },
  },
  outline: {
    backgroundColor: "transparent",
    color: "#3b82f6",
    border: "1px solid #3b82f6",
    ":hover:not(:disabled)": {
      backgroundColor: "rgba(59, 130, 246, 0.1)",
    },
  },
  ghost: {
    backgroundColor: "transparent",
    color: "#6b7280",
    ":hover:not(:disabled)": {
      backgroundColor: "#f3f4f6",
    },
  },
});

export const sizes = styleVariants({
  sm: {
    padding: "8px 16px",
    fontSize: "14px",
  },
  md: {
    padding: "12px 24px",
    fontSize: "16px",
  },
  lg: {
    padding: "16px 32px",
    fontSize: "18px",
  },
});
