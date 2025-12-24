import { useMemo, useState } from "react";
import { Column } from "../../../types/tableType";

interface UseTableSearchProps<T> {
  data: T[];
  columns: Column<T>[];
}

function useTableSearch<T extends object>({
  data,
  columns,
}: UseTableSearchProps<T>) {
// ** State
  const [search, setSearch] = useState("");

  // ** Function
  const searchableKeys = useMemo(() => {
    const keys = columns
      .filter((col) => col.searchable && col.dataIndex)
      .map((col) => col.dataIndex as keyof T);
  
    if (keys.length) return keys;
  
    return columns
      .filter((col) => col.dataIndex)
      .map((col) => col.dataIndex as keyof T);
  }, [columns]);
  

  const filteredData = useMemo(() => {
    if (!search) return data;

    const keyword = search.toLowerCase();

    return data.filter((record) =>
      searchableKeys.some((key) =>
        String(record[key] ?? "")
          .toLowerCase()
          .includes(keyword)
      )
    );
  }, [data, search, searchableKeys]);

  return {
    search,
    setSearch,
    filteredData,
  };
}

export default useTableSearch;
