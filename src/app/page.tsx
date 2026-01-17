import type { Metadata } from "next";
import * as styles from "./page.css";
import WebtoonList from "./_components/webtoonList/WebtoonList";
import { getWebtoons, getTotalWebtoons } from "@/services/webtoon.service";

const ITEMS_PER_PAGE = 20;

// SSR에서 메타데이터 생성
export async function generateMetadata(): Promise<Metadata> {
  const { items } = getWebtoons(1, ITEMS_PER_PAGE);
  const totalItems = getTotalWebtoons();

  // 웹툰 제목들로 description 생성
  const webtoonTitles = items
    .slice(0, 10)
    .map((w) => w.title)
    .join(", ");
  const genres = [...new Set(items.map((w) => w.genre))].join(", ");

  return {
    title: "전자도서 추천 | 인기 웹툰 모음",
    description: `총 ${totalItems}개의 웹툰을 추천합니다. ${webtoonTitles} 등 다양한 장르(${genres})의 웹툰을 만나보세요.`,
    keywords: items.flatMap((w) => [w.title, w.author, w.genre, ...w.tags]),
    openGraph: {
      title: "전자도서 추천 | 인기 웹툰 모음",
      description: `${webtoonTitles} 등 ${totalItems}개의 인기 웹툰을 추천합니다.`,
      type: "website",
    },
  };
}

export default function Home() {
  // 서비스 레이어를 통해 직접 데이터 가져오기 (SSR)
  const { items: initialData } = getWebtoons(1, ITEMS_PER_PAGE);
  const totalItems = getTotalWebtoons();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>웹툰 목록</h1>
      <div className={styles.group}>
        <WebtoonList
          initialData={initialData}
          totalItems={totalItems}
          count={ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
}
