import { memo } from "react";
import * as style from "./SearchStatus.css";

interface SearchStatusProps {
  query: string;
  count: number;
  isLoading: boolean;
}

function SearchStatus({ query, count, isLoading }: SearchStatusProps) {
  if (isLoading) {
    return <div className={`${style.container} ${style.loading}`}>검색 중...</div>;
  }

  return (
    <div className={style.container}>
      <span className={style.query}>&quot;{query}&quot;</span> 검색 결과:{" "}
      <span className={style.count}>{count}개</span>
    </div>
  );
}

export default memo(SearchStatus);
