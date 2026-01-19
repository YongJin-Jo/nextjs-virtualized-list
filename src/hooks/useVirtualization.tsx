import React, { useEffect, useMemo, useState, useRef } from "react";
import { throttle } from "@/utils";

interface UseVirtualizationProps<T> {
  data: T[];
  containerRef: React.RefObject<HTMLDivElement>;
  itemHeight: number;
  columns?: number;
  overscan?: number;
  throttleMs?: number;
}

const useVirtualization = <T,>({
  data,
  containerRef,
  itemHeight,
  columns = 1,
  overscan = 3,
  throttleMs = 16, // 약 60fps
}: UseVirtualizationProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const totalRows = Math.ceil(data.length / columns);
  const totalHeight = itemHeight * totalRows;

  const visibleRowCount = Math.ceil(containerHeight / itemHeight);

  // 행(row) 기준 계산
  const startRow = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endRow = Math.min(totalRows, startRow + visibleRowCount + overscan * 2);

  // 아이템 인덱스로 변환 (행 * 열 개수)
  const startIndex = startRow * columns;
  const endIndex = Math.min(data.length, endRow * columns);

  const offsetY = startRow * itemHeight;

  const visibleItems = useMemo(() => {
    return data.slice(startIndex, endIndex);
  }, [data, startIndex, endIndex]);

  // throttle 함수를 ref로 관리
  const throttledFnRef = useRef<ReturnType<typeof throttle<(value: number) => void>> | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // throttle 함수 생성
    throttledFnRef.current = throttle(
      (value: number) => setScrollTop(value),
      throttleMs
    );

    const handleScroll = () => {
      throttledFnRef.current?.(container.scrollTop);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      throttledFnRef.current?.cancel();
    };
  }, [containerRef, throttleMs]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      const { height } = entry.contentRect;
      setContainerHeight(height);
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return {
    totalHeight,
    visibleItems,
    offsetY,
    startIndex,
    endIndex,
  };
};

export default useVirtualization;
