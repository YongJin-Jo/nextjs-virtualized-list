import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const container = style({
  display: "flex",
  gap: "12px",
  marginBottom: "16px",
  flexWrap: "wrap",
  alignItems: "center",
  "@media": {
    "(max-width: 480px)": {
      gap: "8px",
    },
  },
});

export const filterGroup = style({
  display: "flex",
  alignItems: "center",
  gap: "8px",
});

export const label = style({
  fontSize: "13px",
  fontWeight: 500,
  color: vars.color.secondary,
});

export const select = style({
  padding: "8px 32px 8px 12px",
  fontSize: "14px",
  color: vars.color.foreground,
  backgroundColor: "#fff",
  border: "1px solid #e5e5e5",
  borderRadius: "6px",
  cursor: "pointer",
  outline: "none",
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
  transition: "border-color 0.2s",
  ":focus": {
    borderColor: vars.color.primary,
  },
  ":hover": {
    borderColor: "#ccc",
  },
  "@media": {
    "(max-width: 480px)": {
      padding: "6px 28px 6px 10px",
      fontSize: "13px",
    },
  },
});

export const sortButtons = style({
  display: "flex",
  gap: "4px",
  marginLeft: "auto",
  "@media": {
    "(max-width: 480px)": {
      marginLeft: 0,
      width: "100%",
    },
  },
});

export const sortButton = style({
  padding: "8px 14px",
  fontSize: "13px",
  fontWeight: 500,
  color: vars.color.secondary,
  backgroundColor: "#f5f5f5",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "all 0.2s",
  ":hover": {
    backgroundColor: "#e8e8e8",
  },
  "@media": {
    "(max-width: 480px)": {
      flex: 1,
      padding: "8px 10px",
      fontSize: "12px",
    },
  },
});

export const sortButtonActive = style({
  color: "#fff",
  backgroundColor: vars.color.primary,
  ":hover": {
    backgroundColor: vars.color.primary,
  },
});
