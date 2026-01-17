import { memo } from "react";
import Image from "next/image";
import type { Webtoon } from "@/types/webtoon";
import * as styles from "./Card.css";

interface CardProps {
  webtoon: Webtoon;
  priority?: boolean;
}

export const Card = memo(function Card({ webtoon, priority = false }: CardProps) {
  return (
    <article className={styles.card}>
      <Image
        className={styles.thumbnail}
        src={webtoon.thumbnail}
        alt={`${webtoon.title} - ${webtoon.author}`}
        width={300}
        height={400}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+"
        sizes="(max-width: 374px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, (max-width: 1439px) 25vw, 20vw"
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{webtoon.title}</h3>
        <span className={styles.author}>{webtoon.author}</span>
        <div className={styles.tags}>
          {webtoon.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.meta}>
          <span>{webtoon.genre}</span>
          <span>♥ {webtoon.likeCount.toLocaleString()}</span>
        </div>
      </div>
    </article>
  );
});
