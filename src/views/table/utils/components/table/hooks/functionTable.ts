// ** React Import
import { useMemo, useState } from "react";

// ** Another Import
import sortData from "./sortData";
import { Column, PaginationProps, SortOrder } from "../../../types/tableType";

interface FunctionTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pagination?: PaginationProps;
}

export function useTable<T extends Record<string, any>>({
  data,
  columns,
  pagination,
}: FunctionTableProps<T>) {
  // ** State
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  // ** Function
  const onSort = (key?: string) => {
    // Feature: toggle sort
    if (!key) return;

    if (sortKey !== key) {
      setSortKey(key);
      setSortOrder("asc");
      return;
    }

    if (sortOrder === "asc") setSortOrder("desc");
    else if (sortOrder === "desc") {
      setSortKey(null);
      setSortOrder(null);
    } else setSortOrder("asc");
  };

  const sortedData = useMemo(
    () => sortData(data, sortKey, sortOrder),
    [data, sortKey, sortOrder]
  );

  const pagedData = useMemo(() => {
    if (!pagination) return sortedData;

    const start = (pagination.page - 1) * pagination.pageSize;
    return sortedData.slice(start, start + pagination.pageSize);
  }, [sortedData, pagination]);

  return {
    columns,
    rows: pagedData,
    sortKey,
    sortOrder,
    onSort,
  };
}
