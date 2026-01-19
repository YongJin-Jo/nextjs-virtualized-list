import { NextRequest, NextResponse } from "next/server";
import {
  getWebtoons,
  searchWebtoons,
  type SortType,
  type FilterOptions,
} from "@/services/webtoon.service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const count = parseInt(searchParams.get("count") || "16", 10);
  const query = searchParams.get("q") || "";
  const genre = searchParams.get("genre") || null;
  const sort = (searchParams.get("sort") as SortType) || "latest";

  const options: FilterOptions = {
    genre,
    sort,
  };

  // 검색어가 있으면 검색, 없으면 전체 목록
  const result = query
    ? searchWebtoons(query, page, count, options)
    : getWebtoons(page, count, options);

  // 네트워크 지연 시뮬레이션 (개발용)
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json(result);
}
