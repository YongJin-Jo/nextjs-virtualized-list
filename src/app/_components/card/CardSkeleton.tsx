import { memo } from "react";
import * as styles from "./CardSkeleton.css";

export const CardSkeleton = memo(function CardSkeleton() {
  return (
    <article className={styles.card}>
      <div className={styles.thumbnail} />
      <div className={styles.content}>
        <div className={styles.title} />
        <div className={styles.author} />
        <div className={styles.tags}>
          <div className={styles.tag} />
          <div className={styles.tag} />
          <div className={styles.tag} />
        </div>
        <div className={styles.meta}>
          <div className={styles.metaItem} />
          <div className={styles.metaItem} />
        </div>
      </div>
    </article>
  );
});
