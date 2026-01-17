import { style, styleVariants } from "@vanilla-extract/css";

export const base = style({
  width: "100%",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  "::placeholder": {
    color: "#9ca3af",
  },
  ":disabled": {
    backgroundColor: "#f3f4f6",
    cursor: "not-allowed",
    opacity: 0.6,
  },
});

export const variants = styleVariants({
  default: {
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    backgroundColor: "#fff",
    ":focus": {
      borderColor: "#3b82f6",
      boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
    },
  },
  outlined: {
    border: "2px solid #d1d5db",
    borderRadius: "8px",
    backgroundColor: "transparent",
    ":focus": {
      borderColor: "#3b82f6",
    },
  },
  filled: {
    border: "1px solid transparent",
    borderRadius: "8px",
    backgroundColor: "#f3f4f6",
    ":focus": {
      backgroundColor: "#fff",
      borderColor: "#3b82f6",
    },
  },
});

export const sizes = styleVariants({
  sm: {
    padding: "8px 12px",
    fontSize: "14px",
  },
  md: {
    padding: "12px 16px",
    fontSize: "16px",
  },
  lg: {
    padding: "16px 20px",
    fontSize: "18px",
  },
});

export const error = style({
  borderColor: "#ef4444 !important",
  ":focus": {
    boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)",
  },
});
