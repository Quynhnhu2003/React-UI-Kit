// ** Another Import
import { SortOrder } from "../../../types/tableType";

 function sortData<T extends Record<string, any>>(
  data: T[],
  sortKey: string | null,
  sortOrder: SortOrder
): T[] {
  if (!sortKey || !sortOrder) return data;

  return [...data].sort((a, b) => {
    const valueA = a[sortKey];
    const valueB = b[sortKey];

    if (valueA == null && valueB == null) return 0;
    if (valueA == null) return 1;
    if (valueB == null) return -1;

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB, "en", { sensitivity: "base" })
        : valueB.localeCompare(valueA, "en", { sensitivity: "base" });
    }

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "asc"
        ? valueA - valueB
        : valueB - valueA;
    }

    return 0;
  });
}

export default sortData;
