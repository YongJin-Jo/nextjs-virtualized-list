import { CSSProperties, memo } from "react";
import * as style from "./EmptyResult.css";

interface EmptyResultProps {
  title?: string;
  description?: string;
  style?: CSSProperties;
}

function EmptyResult({
  title = "검색 결과가 없습니다",
  description = "다른 검색어로 다시 시도해 보세요",
}: EmptyResultProps) {
  return (
    <div className={style.container} style={style}>
      <p className={style.title}>{title}</p>
      <p className={style.description}>{description}</p>
    </div>
  );
}

export default memo(EmptyResult);
