import {useEffect, useState} from 'react';

import {useInfiniteQuery} from '@tanstack/react-query';
import {Page} from '@types';

export interface UsePaginatedListResult<TData> {
  list: TData[];
  isError: boolean | null;
  isLoading: boolean;
  refresh: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

interface PaginatedListOption {
  /**
   * Set this to `false` to disable automatic refetching when the query mounts or changes query keys.
   */
  enabled?: boolean;
  /**
   * The time in milliseconds after data is considered stale.
   */
  staleTime?: number;
}

export function usePaginatedList<Data>(
  queryKey: readonly unknown[],
  getList: (page: number) => Promise<Page<Data>>,
  options?: PaginatedListOption,
): UsePaginatedListResult<Data> {
  const [list, setList] = useState<Data[]>([]);

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({pageParam = 1}) => getList(pageParam),
    getNextPageParam: ({meta}) =>
      meta.hasNextPage ? meta.currentPage + 1 : undefined,
    enabled: options?.enabled,
    staleTime: options?.staleTime,
  });

  useEffect(() => {
    if (query.data) {
      const newList = query.data.pages.reduce<Data[]>((prev, curr) => {
        return [...prev, ...curr.data];
      }, []);

      setList(newList);
    }
  }, [query.data]);

  return {
    list,
    isLoading: query.isLoading,
    isError: query.isError,
    refresh: query.refetch,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: !!query.hasNextPage,
  };
}

// const [list, setList] = useState<Data[]>([]);
// const [isLoading, setLoading] = useState(false);
// const [isError, setError] = useState<boolean | null>(null);
// const [page, setPage] = useState<number>(1);
// const [hasNextPage, setHasNextPage] = useState(true);

// async function fetchInitialData() {
//   try {
//     setError(null);
//     setLoading(true);

//     const {data, meta} = await getList(1);

//     setList(data);

//     if (meta.hasNextPage) {
//       setPage(2);
//     } else {
//       setHasNextPage(false);
//     }
//   } catch (err) {
//     setError(true);
//   } finally {
//     setLoading(false);
//   }
// }

// async function fetchNextPage() {
//   if (isLoading || !hasNextPage) {
//     return;
//   }

//   try {
//     setLoading(true);

//     const {data, meta} = await getList(page);

//     setList(prev => [...prev, ...data]);

//     if (meta.hasNextPage) {
//       setPage(prev => prev + 1);
//     } else {
//       setHasNextPage(false);
//     }
//   } catch (err) {
//     setError(true);
//   } finally {
//     setLoading(false);
//   }
// }

// useEffect(() => {
//   fetchInitialData();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);
