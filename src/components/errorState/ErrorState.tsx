import { memo } from "react";
import { WarningIcon } from "@/components/common";
import * as style from "./ErrorState.css";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

function ErrorState({
  title = "오류가 발생했습니다",
  description = "데이터를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className={style.container}>
      <div className={style.iconWrapper}>
        <WarningIcon className={style.icon} />
      </div>
      <p className={style.title}>{title}</p>
      <p className={style.description}>{description}</p>
      {onRetry && (
        <button className={style.retryButton} onClick={onRetry}>
          다시 시도
        </button>
      )}
    </div>
  );
}

export default memo(ErrorState);
