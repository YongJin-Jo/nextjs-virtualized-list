import { memo } from "react";
import Image from "next/image";
import type { Webtoon } from "@/types/webtoon";
import { EyeIcon, HeartIcon, CalendarIcon } from "@/components/common";
import * as styles from "./WebtoonInfo.css";

interface WebtoonInfoProps {
  webtoon: Webtoon;
}

export const WebtoonInfo = memo(function WebtoonInfo({
  webtoon,
}: WebtoonInfoProps) {
  return (
    <div className={styles.content}>
      <div className={styles.thumbnailWrapper}>
        <Image
          src={webtoon.thumbnail}
          alt={webtoon.title}
          fill
          priority
          sizes="300px"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className={styles.info}>
        <h1 className={styles.title}>{webtoon.title}</h1>
        <p className={styles.author}>{webtoon.author}</p>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <EyeIcon size={16} />
            {webtoon.viewCount.toLocaleString()}
          </span>
          <span className={styles.metaItem}>
            <HeartIcon size={16} />
            {webtoon.likeCount.toLocaleString()}
          </span>
          <span className={styles.metaItem}>
            <CalendarIcon size={16} />
            {webtoon.updateDay}
          </span>
          {webtoon.isNew && (
            <span className={`${styles.metaItem} ${styles.newBadge}`}>NEW</span>
          )}
        </div>

        <div className={styles.tags}>
          <span className={styles.genre}>{webtoon.genre}</span>
          {webtoon.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>

        <p className={styles.description}>{webtoon.description}</p>
      </div>
    </div>
  );
});
