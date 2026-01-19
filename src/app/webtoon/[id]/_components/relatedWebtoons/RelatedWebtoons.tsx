import { memo } from "react";
import type { Webtoon } from "@/types/webtoon";
import { Card } from "@/app/_components/card";
import * as styles from "./RelatedWebtoons.css";

interface RelatedWebtoonsProps {
  webtoons: Webtoon[];
}

export const RelatedWebtoons = memo(function RelatedWebtoons({
  webtoons,
}: RelatedWebtoonsProps) {
  if (webtoons.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>관련 웹툰</h2>
      <div className={styles.grid}>
        {webtoons.map((webtoon) => (
          <Card key={webtoon.id} webtoon={webtoon} />
        ))}
      </div>
    </section>
  );
});
