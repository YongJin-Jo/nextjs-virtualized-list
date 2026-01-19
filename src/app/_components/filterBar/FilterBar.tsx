"use client";

import { memo, useCallback } from "react";
import type { SortType, GenreFilter } from "@/services/webtoon.service";
import * as styles from "./FilterBar.css";

interface FilterBarProps {
  genres: string[];
  selectedGenre: GenreFilter;
  selectedSort: SortType;
  onGenreChange: (genre: GenreFilter) => void;
  onSortChange: (sort: SortType) => void;
}

const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: "latest", label: "최신순" },
  { value: "popular", label: "인기순" },
  { value: "likes", label: "좋아요순" },
];

export const FilterBar = memo(function FilterBar({
  genres,
  selectedGenre,
  selectedSort,
  onGenreChange,
  onSortChange,
}: FilterBarProps) {
  const handleGenreChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.target.value;
      onGenreChange(value === "" ? null : value);
    },
    [onGenreChange]
  );

  return (
    <div className={styles.container}>
      <div className={styles.filterGroup}>
        <label htmlFor="genre-filter" className={styles.label}>
          장르
        </label>
        <select
          id="genre-filter"
          className={styles.select}
          value={selectedGenre ?? ""}
          onChange={handleGenreChange}
        >
          <option value="">전체</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.sortButtons}>
        {SORT_OPTIONS.map((option) => (
          <button
            key={option.value}
            className={`${styles.sortButton} ${selectedSort === option.value ? styles.sortButtonActive : ""}`}
            onClick={() => onSortChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
});
