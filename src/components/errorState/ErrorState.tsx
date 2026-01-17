import { memo } from "react";
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
        <svg
          className={style.icon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
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
