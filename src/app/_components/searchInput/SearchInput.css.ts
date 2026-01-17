import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  gap: "8px",
  marginBottom: "20px",
});

export const inputWrapper = style({
  position: "relative",
  flex: 1,
  display: "flex",
  alignItems: "center",
});

export const clearButton = style({
  position: "absolute",
  right: "8px",
  padding: "4px 8px !important",
  fontSize: "18px !important",
  minWidth: "auto",
});
