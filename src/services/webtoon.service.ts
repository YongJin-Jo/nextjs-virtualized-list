import webtoons from "@/constance/mock_webtoons.json";
import type { Webtoon } from "@/types/webtoon";

const allWebtoons = webtoons as Webtoon[];

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

/**
 * 웹툰 데이터를 페이지네이션하여 반환
 * Server Component와 API Route 모두에서 사용 가능
 */
export function getWebtoons(page: number = 1, count: number = 20): WebtoonsResult {
  const startIndex = (page - 1) * count;
  const endIndex = startIndex + count;
  const items = allWebtoons.slice(startIndex, endIndex);

  const totalItems = allWebtoons.length;
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
 * 웹툰 검색
 */
export function searchWebtoons(
  query: string,
  page: number = 1,
  count: number = 20
): WebtoonsResult {
  const normalizedQuery = query.toLowerCase().trim();

  // 빈 검색어면 전체 반환
  if (!normalizedQuery) {
    return getWebtoons(page, count);
  }

  // 제목, 작가, 장르, 태그에서 검색
  const filtered = allWebtoons.filter((webtoon) => {
    return (
      webtoon.title.toLowerCase().includes(normalizedQuery) ||
      webtoon.author.toLowerCase().includes(normalizedQuery) ||
      webtoon.genre.toLowerCase().includes(normalizedQuery) ||
      webtoon.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
      webtoon.description.toLowerCase().includes(normalizedQuery)
    );
  });

  const startIndex = (page - 1) * count;
  const endIndex = startIndex + count;
  const items = filtered.slice(startIndex, endIndex);

  const totalItems = filtered.length;
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
