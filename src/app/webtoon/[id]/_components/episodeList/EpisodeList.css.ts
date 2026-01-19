import { style } from "@vanilla-extract/css";
import { vars } from "@/styles/theme.css";

export const section = style({
  marginTop: "48px",
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
});

export const title = style({
  fontSize: "20px",
  fontWeight: 600,
  color: vars.color.foreground,
});

export const titleGroup = style({
  display: "flex",
  alignItems: "baseline",
  gap: "8px",
});

export const count = style({
  fontSize: "14px",
  color: vars.color.secondary,
});

export const sortButtons = style({
  display: "flex",
  gap: "4px",
});

export const sortButton = style({
  padding: "8px 16px",
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
});

export const sortButtonActive = style({
  color: "#fff",
  backgroundColor: vars.color.primary,
  ":hover": {
    backgroundColor: vars.color.primary,
  },
});

export const scrollContainer = style({
  maxHeight: "600px",
  overflowY: "auto",
  overflowX: "hidden",
});

export const listInitial = style({
  maxHeight: "none",
  overflow: "visible",
});

export const list = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
});

export const item = style({
  display: "flex",
  gap: "16px",
  padding: "12px",
  backgroundColor: vars.color.background,
  borderRadius: "8px",
  border: "1px solid #e5e5e5",
  transition: "all 0.2s ease",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#f8f8f8",
    borderColor: vars.color.primary,
  },
  "@media": {
    "(max-width: 480px)": {
      gap: "12px",
      padding: "10px",
    },
  },
});

export const thumbnail = style({
  position: "relative",
  width: "120px",
  height: "80px",
  borderRadius: "6px",
  overflow: "hidden",
  flexShrink: 0,
  "@media": {
    "(max-width: 480px)": {
      width: "80px",
      height: "54px",
    },
  },
});

export const info = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "6px",
  flex: 1,
  minWidth: 0,
});

export const episodeTitle = style({
  fontSize: "15px",
  fontWeight: 500,
  color: vars.color.foreground,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  "@media": {
    "(max-width: 480px)": {
      fontSize: "14px",
    },
  },
});

export const meta = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "12px",
  fontSize: "13px",
  color: vars.color.secondary,
  "@media": {
    "(max-width: 480px)": {
      fontSize: "12px",
      gap: "8px",
    },
  },
});

export const metaItem = style({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

export const freeBadge = style({
  padding: "2px 8px",
  fontSize: "11px",
  fontWeight: 600,
  color: "#16a34a",
  backgroundColor: "#dcfce7",
  borderRadius: "4px",
});

export const paidBadge = style({
  padding: "2px 8px",
  fontSize: "11px",
  fontWeight: 600,
  color: "#dc2626",
  backgroundColor: "#fee2e2",
  borderRadius: "4px",
});
