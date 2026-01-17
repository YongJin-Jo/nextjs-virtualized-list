import { NextRequest, NextResponse } from "next/server";
import { getWebtoons, searchWebtoons } from "@/services/webtoon.service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const count = parseInt(searchParams.get("count") || "20", 10);
  const query = searchParams.get("q") || "";

  // 검색어가 있으면 검색, 없으면 전체 목록
  const result = query
    ? searchWebtoons(query, page, count)
    : getWebtoons(page, count);

  // 네트워크 지연 시뮬레이션 (개발용)
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json(result);
}
