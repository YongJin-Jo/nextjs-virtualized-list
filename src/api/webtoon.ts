import type { Webtoon } from "@/types/webtoon";

export interface WebtoonResponse {
  items: Webtoon[];
  pagination: {
    page: number;
    count: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchWebtoons(
  page: number,
  count: number = 20,
  query?: string
): Promise<WebtoonResponse> {
  const params = new URLSearchParams({
    page: String(page),
    count: String(count),
  });

  if (query) {
    params.set("q", query);
  }

  let res: Response;

  try {
    res = await fetch(`/api/webtoons?${params}`);
  } catch {
    throw new ApiError(
      "네트워크 연결을 확인해 주세요.",
      0,
      "Network Error"
    );
  }

  if (!res.ok) {
    if (res.status >= 500) {
      throw new ApiError(
        "서버에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        res.status,
        res.statusText
      );
    }
    if (res.status === 404) {
      throw new ApiError(
        "요청한 데이터를 찾을 수 없습니다.",
        res.status,
        res.statusText
      );
    }
    throw new ApiError(
      "데이터를 불러오는 중 오류가 발생했습니다.",
      res.status,
      res.statusText
    );
  }

  return res.json();
}
