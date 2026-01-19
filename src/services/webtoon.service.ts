import webtoons from "@/constance/mock_webtoons.json";
import webtoonDetails from "@/constance/mock_webtoon_details.json";
import type { Webtoon, WebtoonDetail } from "@/types/webtoon";

const allWebtoons = webtoons as Webtoon[];
const allWebtoonDetails = webtoonDetails as WebtoonDetail[];

export interface WebtoonPagination {
  page: number;
  count: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface WebtoonsResult {
  items: Webtoon[];
  pagination: WebtoonPagination;
}

export type SortType = "latest" | "popular" | "likes";
export type GenreFilter = string | null;

export interface FilterOptions {
  genre?: GenreFilter;
  sort?: SortType;
}

/**
 * 모든 장르 목록 반환
 */
export function getAllGenres(): string[] {
  const genres = new Set(allWebtoons.map((w) => w.genre));
  return Array.from(genres).sort();
}

/**
 * 정렬 함수
 */
function sortWebtoons(webtoons: Webtoon[], sort: SortType): Webtoon[] {
  const sorted = [...webtoons];
  switch (sort) {
    case "popular":
      return sorted.sort((a, b) => b.viewCount - a.viewCount);
    case "likes":
      return sorted.sort((a, b) => b.likeCount - a.likeCount);
    case "latest":
    default:
      return sorted.sort((a, b) => b.id - a.id);
  }
}

/**
 * 웹툰 데이터를 페이지네이션하여 반환
 * Server Component와 API Route 모두에서 사용 가능
 */
export function getWebtoons(
  page: number = 1,
  count: number = 16,
  options?: FilterOptions
): WebtoonsResult {
  let filtered = [...allWebtoons];

  // 장르 필터
  if (options?.genre) {
    filtered = filtered.filter((w) => w.genre === options.genre);
  }

  // 정렬
  const sorted = sortWebtoons(filtered, options?.sort ?? "latest");

  const startIndex = (page - 1) * count;
  const endIndex = startIndex + count;
  const items = sorted.slice(startIndex, endIndex);

  const totalItems = sorted.length;
  const totalPages = Math.ceil(totalItems / count);
  const hasNextPage = page < totalPages;

  return {
    items,
    pagination: {
      page,
      count,
      totalItems,
      totalPages,
      hasNextPage,
    },
  };
}

/**
 * 전체 웹툰 수 반환
 */
export function getTotalWebtoons(): number {
  return allWebtoons.length;
}

/**
 * ID로 단일 웹툰 조회
 */
export function getWebtoonById(id: number): Webtoon | null {
  return allWebtoons.find((webtoon) => webtoon.id === id) ?? null;
}

/**
 * ID로 웹툰 상세 정보 조회 (에피소드 포함)
 */
export function getWebtoonDetailById(id: number): WebtoonDetail | null {
  return allWebtoonDetails.find((webtoon) => webtoon.id === id) ?? null;
}

/**
 * 관련 웹툰 추천 (같은 장르 또는 태그)
 */
export function getRelatedWebtoons(
  webtoon: Webtoon,
  limit: number = 4
): Webtoon[] {
  return allWebtoons
    .filter(
      (w) =>
        w.id !== webtoon.id &&
        (w.genre === webtoon.genre ||
          w.tags.some((tag) => webtoon.tags.includes(tag)))
    )
    .slice(0, limit);
}

/**
 * 모든 웹툰 ID 목록 반환 (generateStaticParams용)
 */
export function getAllWebtoonIds(): number[] {
  return allWebtoons.map((webtoon) => webtoon.id);
}

/**
 * 웹툰 검색
 */
export function searchWebtoons(
  query: string,
  page: number = 1,
  count: number = 16,
  options?: FilterOptions
): WebtoonsResult {
  const normalizedQuery = query.toLowerCase().trim();

  // 빈 검색어면 전체 반환
  if (!normalizedQuery) {
    return getWebtoons(page, count, options);
  }

  // 제목, 작가, 장르, 태그에서 검색
  let filtered = allWebtoons.filter((webtoon) => {
    return (
      webtoon.title.toLowerCase().includes(normalizedQuery) ||
      webtoon.author.toLowerCase().includes(normalizedQuery) ||
      webtoon.genre.toLowerCase().includes(normalizedQuery) ||
      webtoon.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
      webtoon.description.toLowerCase().includes(normalizedQuery)
    );
  });

  // 장르 필터
  if (options?.genre) {
    filtered = filtered.filter((w) => w.genre === options.genre);
  }

  // 정렬
  const sorted = sortWebtoons(filtered, options?.sort ?? "latest");

  const startIndex = (page - 1) * count;
  const endIndex = startIndex + count;
  const items = sorted.slice(startIndex, endIndex);

  const totalItems = sorted.length;
  const totalPages = Math.ceil(totalItems / count);
  const hasNextPage = page < totalPages;

  return {
    items,
    pagination: {
      page,
      count,
      totalItems,
      totalPages,
      hasNextPage,
    },
  };
}
