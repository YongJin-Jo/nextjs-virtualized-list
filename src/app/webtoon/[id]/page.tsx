import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@/components/common";
import {
  getWebtoonById,
  getWebtoonDetailById,
  getRelatedWebtoons,
} from "@/services/webtoon.service";
import { WebtoonInfo } from "./_components/webtoonInfo";
import * as styles from "./page.css";

// 클라이언트 컴포넌트 동적 로드
const EpisodeList = dynamic(
  () =>
    import("./_components/episodeList").then((mod) => ({
      default: mod.EpisodeList,
    })),
  {
    loading: () => <EpisodeListSkeleton />,
  }
);

const RelatedWebtoons = dynamic(
  () =>
    import("./_components/relatedWebtoons").then((mod) => ({
      default: mod.RelatedWebtoons,
    })),
  {
    loading: () => <RelatedWebtoonsSkeleton />,
  }
);

// 스켈레톤 컴포넌트
function EpisodeListSkeleton() {
  return (
    <div className={styles.skeletonSection}>
      <div className={styles.skeletonTitle} />
      {[...Array(5)].map((_, i) => (
        <div key={i} className={styles.skeletonItem} />
      ))}
    </div>
  );
}

function RelatedWebtoonsSkeleton() {
  return (
    <div className={styles.skeletonSection}>
      <div className={styles.skeletonTitle} />
      <div className={styles.skeletonGrid}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className={styles.skeletonCard} />
        ))}
      </div>
    </div>
  );
}

interface WebtoonDetailPageProps {
  params: Promise<{ id: string }>;
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: WebtoonDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const webtoon = getWebtoonById(Number(id));

  if (!webtoon) {
    return {
      title: "웹툰을 찾을 수 없습니다",
    };
  }

  return {
    title: `${webtoon.title} - ${webtoon.author} | 웹툰 상세`,
    description: webtoon.description.slice(0, 160),
    keywords: [webtoon.title, webtoon.author, webtoon.genre, ...webtoon.tags],
    openGraph: {
      title: `${webtoon.title} - ${webtoon.author}`,
      description: webtoon.description.slice(0, 160),
      images: [webtoon.thumbnail],
      type: "article",
    },
  };
}

export default async function WebtoonDetailPage({
  params,
}: WebtoonDetailPageProps) {
  const { id } = await params;
  const webtoon = getWebtoonById(Number(id));
  const webtoonDetail = getWebtoonDetailById(Number(id));

  if (!webtoon) {
    notFound();
  }

  const relatedWebtoons = getRelatedWebtoons(webtoon, 4);
  const episodes = webtoonDetail?.episodes ?? [];

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backButton}>
        <ArrowLeftIcon size={16} />
        목록으로
      </Link>

      <WebtoonInfo webtoon={webtoon} />
      <EpisodeList episodes={episodes} />
      <RelatedWebtoons webtoons={relatedWebtoons} />
    </div>
  );
}
