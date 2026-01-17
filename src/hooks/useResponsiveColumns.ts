import { useState, useEffect } from "react";

// Chrome DevTools 기준 브레이크포인트
const BREAKPOINTS = {
  mobileS: 0, // 1열 (320px 미만)
  mobileM: 375, // 2열
  tablet: 768, // 3열
  laptop: 1024, // 4열
  desktop: 1440, // 5열
} as const;

function getColumns(width: number): number {
  if (width >= BREAKPOINTS.desktop) return 5;
  if (width >= BREAKPOINTS.laptop) return 4;
  if (width >= BREAKPOINTS.tablet) return 3;
  if (width >= BREAKPOINTS.mobileM) return 2;
  return 1;
}

export default function useResponsiveColumns(): number {
  const [columns, setColumns] = useState(5); // SSR 기본값

  useEffect(() => {
    const updateColumns = () => {
      setColumns(getColumns(window.innerWidth));
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);

    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  return columns;
}
