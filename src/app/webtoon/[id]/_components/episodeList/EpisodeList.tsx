"use client";

import {
  memo,
  useRef,
  useMemo,
  useState,
  useCallback,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import type { Episode } from "@/types/webtoon";
import { EyeIcon, HeartIcon } from "@/components/common";
import useVirtualization from "@/hooks/useVirtualization";
import * as styles from "./EpisodeList.css";

interface EpisodeListProps {
  episodes: Episode[];
}

type SortOrder = "latest" | "oldest";

// hydration 상태 감지
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const ITEM_HEIGHT = 104; // 아이템 높이 (padding + gap 포함)

export const EpisodeList = memo(function EpisodeList({
  episodes,
}: EpisodeListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");

  const isHydrated = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  // 정렬된 에피소드
  const sortedEpisodes = useMemo(() => {
    const result = [...episodes];
    result.sort((a, b) => {
      if (sortOrder === "latest") {
        return b.episodeNumber - a.episodeNumber;
      }
      return a.episodeNumber - b.episodeNumber;
    });
    return result;
  }, [episodes, sortOrder]);

  const { totalHeight, visibleItems, offsetY } = useVirtualization({
    data: sortedEpisodes,
    containerRef: containerRef as React.RefObject<HTMLDivElement>,
    itemHeight: ITEM_HEIGHT,
    columns: 1,
    overscan: 3,
  });

  const handleSortChange = useCallback((order: SortOrder) => {
    setSortOrder(order);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  const itemsToRender = isHydrated ? visibleItems : sortedEpisodes.slice(0, 10);

  const containerStyle = useMemo(
    () => ({
      height: isHydrated ? totalHeight : "auto",
    }),
    [isHydrated, totalHeight]
  );

  const listStyle = useMemo(
    () => ({
      transform: isHydrated ? `translateY(${offsetY}px)` : undefined,
    }),
    [isHydrated, offsetY]
  );

  if (episodes.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>에피소드</h2>
          <span className={styles.count}>총 {episodes.length}화</span>
        </div>
        <div className={styles.sortButtons}>
          <button
            className={`${styles.sortButton} ${sortOrder === "latest" ? styles.sortButtonActive : ""}`}
            onClick={() => handleSortChange("latest")}
          >
            최신화
          </button>
          <button
            className={`${styles.sortButton} ${sortOrder === "oldest" ? styles.sortButtonActive : ""}`}
            onClick={() => handleSortChange("oldest")}
          >
            1화부터
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className={isHydrated ? styles.scrollContainer : styles.listInitial}
      >
        <div style={containerStyle}>
          <div className={styles.list} style={listStyle}>
            {itemsToRender.map((episode) => (
              <div key={episode.id} className={styles.item}>
                <div className={styles.thumbnail}>
                  <Image
                    src={episode.thumbnail}
                    alt={episode.title}
                    fill
                    sizes="120px"
                    style={{ objectFit: "cover" }}
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+"
                    placeholder="blur"
                  />
                </div>
                <div className={styles.info}>
                  <h3 className={styles.episodeTitle}>{episode.title}</h3>
                  <div className={styles.meta}>
                    <span className={styles.metaItem}>
                      {episode.uploadDate}
                    </span>
                    <span className={styles.metaItem}>
                      <EyeIcon size={14} />
                      {episode.viewCount.toLocaleString()}
                    </span>
                    <span className={styles.metaItem}>
                      <HeartIcon size={14} />
                      {episode.likeCount.toLocaleString()}
                    </span>
                    {episode.isFree ? (
                      <span className={styles.freeBadge}>무료</span>
                    ) : (
                      <span className={styles.paidBadge}>유료</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});
