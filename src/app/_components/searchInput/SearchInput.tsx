"use client";

import { useState, useCallback, useEffect, useRef, useDeferredValue } from "react";
import { Input, Button } from "@/components/common";
import { debounce } from "@/utils";
import * as styles from "./SearchInput.css";

interface SearchInputProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export default function SearchInput({
  onSearch,
  placeholder = "제목, 작가, 장르, 태그로 검색...",
  debounceMs = 300,
}: SearchInputProps) {
  const [value, setValue] = useState("");

  // debounce 함수를 ref로 관리
  const debouncedSearchRef = useRef<ReturnType<
    typeof debounce<(query: string) => void>
  > | null>(null);

  useEffect(() => {
    debouncedSearchRef.current = debounce((query: string) => {
      onSearch(query);
    }, debounceMs);

    return () => {
      debouncedSearchRef.current?.cancel();
    };
  }, [onSearch, debounceMs]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // 폼 제출 시 debounce 취소하고 즉시 검색
      debouncedSearchRef.current?.cancel();
      onSearch(value);
    },
    [value, onSearch]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      // 빈 값이면 즉시 검색 초기화
      if (!newValue.trim()) {
        debouncedSearchRef.current?.cancel();
        onSearch("");
      } else {
        // 입력 중에는 debounce 적용
        debouncedSearchRef.current?.(newValue);
      }
    },
    [onSearch]
  );

  const handleClear = useCallback(() => {
    setValue("");
    debouncedSearchRef.current?.cancel();
    onSearch("");
  }, [onSearch]);

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          variant="default"
          inputSize="md"
        />
        {value && (
          <Button
            type="button"
            onClick={handleClear}
            variant="ghost"
            size="sm"
            className={styles.clearButton}
            aria-label="검색어 지우기"
          >
            ×
          </Button>
        )}
      </div>
      <Button type="submit" variant="primary" size="md">
        검색
      </Button>
    </form>
  );
}
