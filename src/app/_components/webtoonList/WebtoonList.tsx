"use client";

import { Card, CardSkeleton } from "../card";
import { Webtoon } from "@/types/webtoon";
import useVirtualization from "@/hooks/useVirtualization";
import useResponsiveColumns from "@/hooks/useResponsiveColumns";
import * as style from "./WebtoonList.css";
import React, {
  useRef,
  useSyncExternalStore,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { fetchWebtoons } from "@/api/webtoon";
import SearchInput from "../searchInput/SearchInput";
import { FilterBar } from "../filterBar";
import EmptyResult from "../../../components/emptyResult";
import ErrorState from "../../../components/errorState";
import SearchStatus from "../searchStatus";
import type { SortType, GenreFilter } from "@/services/webtoon.service";

interface WebtoonListProps {
  initialData: Webtoon[];
  totalItems: number;
  count?: number;
  genres: string[];
}

// hydration 상태 감지
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function WebtoonList({
  initialData,
  totalItems,
  count = 20,
  genres,
}: WebtoonListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<GenreFilter>(null);
  const [selectedSort, setSelectedSort] = useState<SortType>("latest");
  const columns = useResponsiveColumns();
  const queryClient = useQueryClient();
  const isHydrated = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const isSearching = searchQuery.trim().length > 0;
  const isFiltering = selectedGenre !== null || selectedSort !== "latest";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["webtoons", searchQuery, selectedGenre, selectedSort],
    queryFn: ({ pageParam }) =>
      fetchWebtoons(pageParam, count, searchQuery, {
        genre: selectedGenre,
        sort: selectedSort,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined,
    // 검색/필터 중이 아닐 때만 초기 데이터 사용
    initialData:
      !isSearching && !isFiltering
        ? {
            pages: [
              {
                items: initialData,
                pagination: {
                  page: 1,
                  count,
                  totalItems,
                  totalPages: Math.ceil(totalItems / count),
                  hasNextPage: initialData.length < totalItems,
                },
              },
            ],
            pageParams: [1],
          }
        : undefined,
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  const handleGenreChange = useCallback((genre: GenreFilter) => {
    setSelectedGenre(genre);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  const handleSortChange = useCallback((sort: SortType) => {
    setSelectedSort(sort);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  // 모든 페이지의 아이템 합치기
  const allItems = data?.pages.flatMap((page) => page.items) ?? initialData;

  const { totalHeight, visibleItems, offsetY, endIndex } = useVirtualization({
    data: allItems,
    containerRef: containerRef as React.RefObject<HTMLDivElement>,
    itemHeight: 600,
    columns,
    overscan: 1,
  });

  // 다음 페이지 프리페칭 (더 일찍 미리 로드)
  useEffect(() => {
    if (!isHydrated || !hasNextPage || isFetchingNextPage) return;

    const prefetchThreshold = allItems.length - 20;
    if (endIndex >= prefetchThreshold) {
      const nextPage = (data?.pageParams.length ?? 0) + 1;
      queryClient.prefetchInfiniteQuery({
        queryKey: ["webtoons", searchQuery, selectedGenre, selectedSort],
        queryFn: ({ pageParam }) =>
          fetchWebtoons(pageParam, count, searchQuery, {
            genre: selectedGenre,
            sort: selectedSort,
          }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
          lastPage.pagination.hasNextPage
            ? lastPage.pagination.page + 1
            : undefined,
        pages: nextPage,
      });
    }
  }, [
    endIndex,
    allItems.length,
    hasNextPage,
    isFetchingNextPage,
    isHydrated,
    queryClient,
    searchQuery,
    selectedGenre,
    selectedSort,
    count,
    data?.pageParams.length,
  ]);

  // 끝에 도달하면 다음 페이지 로드
  useEffect(() => {
    if (!isHydrated) return;

    const threshold = allItems.length - 10;
    if (endIndex >= threshold && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    endIndex,
    allItems.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isHydrated,
  ]);

  const itemsToRender = isHydrated ? visibleItems : initialData;
  const resultCount = data?.pages[0]?.pagination.totalItems ?? totalItems;

  const sectionClassName = `${style.container} ${isHydrated ? style.containerHydrated : style.containerInitial}`;
  const articleClassName = isHydrated ? style.article : style.articleInitial;

  const articleStyle = useMemo(
    () => ({
      height: isHydrated ? totalHeight : "auto",
    }),
    [isHydrated, totalHeight]
  );

  const gridStyle = useMemo(
    () => ({
      transform: isHydrated ? `translateY(${offsetY}px)` : undefined,
    }),
    [isHydrated, offsetY]
  );

  return (
    <>
      <SearchInput onSearch={handleSearch} />

      <FilterBar
        genres={genres}
        selectedGenre={selectedGenre}
        selectedSort={selectedSort}
        onGenreChange={handleGenreChange}
        onSortChange={handleSortChange}
      />

      {isSearching && (
        <SearchStatus
          query={searchQuery}
          count={resultCount}
          isLoading={isLoading}
        />
      )}

      <section className={sectionClassName} ref={containerRef}>
        <article className={articleClassName} style={articleStyle}>
          <div className={style.grid} style={gridStyle}>
            {isLoading
              ? Array.from({ length: 20 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))
              : itemsToRender.map((webtoon, index) => (
                  <Card
                    key={webtoon.id}
                    webtoon={webtoon}
                    priority={index < 10}
                  />
                ))}
          </div>

          {isError && (
            <ErrorState
              title="데이터를 불러올 수 없습니다"
              description={
                error instanceof Error
                  ? error.message
                  : "네트워크 연결을 확인하고 다시 시도해 주세요."
              }
              onRetry={() => refetch()}
            />
          )}

          {!isError && allItems.length === 0 && !isLoading && <EmptyResult />}

          {isFetchingNextPage && (
            <div className={style.loadingGrid}>
              {Array.from({ length: 5 }).map((_, index) => (
                <CardSkeleton key={`loading-${index}`} />
              ))}
            </div>
          )}
        </article>
      </section>
    </>
  );
}
