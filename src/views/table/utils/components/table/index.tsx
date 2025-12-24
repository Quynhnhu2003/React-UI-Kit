// ** Styles Import
import styles from "./index.module.scss";

// ** Components Import
import TableRow from "./components/TableRow";
import EmptyState from "./components/EmptyState";
import TablePagination from "./components/TablePagination";

// ** Another Import
import { TableProps } from "../../types/tableType";
import { useTable } from "./hooks/functionTable";
import useTableSearch from "./hooks/searchData";

function Table<T extends object>({
  data,
  rowKey,
  columns,
  className,
  pagination,
  size = "lg",
  loading = false,
  searchable=true,
  variant = "default",
  emptyText = "No data",
}: TableProps<T>) {
  // ** Hooks
  const search = useTableSearch<T>({
    data,
    columns,
  });

  const table = useTable<T>({
    data: search.filteredData,
    columns,
    pagination,
  });

  return (
    <div
      className={`${styles.tableWrapper}  ${styles[`size-${size}`]}
        ${styles[`variant-${variant}`]} ${className ?? ""}`}
    >
      {searchable && <input
        className={styles.search}
        placeholder="searching..."
        value={search.search}
        onChange={(e) => {
          search.setSearch(e.target.value);
          pagination?.onChange?.(1);
        }}
      />}

      <table className={styles.table}>
        <thead>
          <tr>
            {table.columns.map((col) => (
              <th
                key={col.key}
                onClick={() =>
                  col.sortable && table.onSort(col.dataIndex as string)
                }
                className={col.sortable ? styles.sortable : ""}
              >
                <span>{col.title}</span>

                {col.sortable && (
                  <span
                    className={`
                    ${styles.sortIcon}
                    ${table.sortKey === col.dataIndex ? styles.active : ""}
                    ${table.sortOrder === "asc" ? styles.asc : ""}
                    ${table.sortOrder === "desc" ? styles.desc : ""}
                  `}
                  >
                    {table.sortKey === col.dataIndex
                      ? table.sortOrder === "asc"
                        ? "▲"
                        : table.sortOrder === "desc"
                        ? "▼"
                        : "⇅"
                      : "⇅"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className={styles.loading}>
                Loading...
              </td>
            </tr>
          ) : table.rows.length === 0 ? (
            <EmptyState colSpan={columns.length} text={emptyText} />
          ) : (
            table.rows.map((record: any, index: number) => (
              <TableRow
                key={String(record[rowKey])}
                record={record}
                index={index}
                columns={columns}
              />
            ))
          )}
        </tbody>
      </table>

      {pagination && (
        <div className={styles.paginationWrapper}>
          <TablePagination
            page={pagination.page}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={pagination.onChange}
          />
        </div>
      )}
    </div>
  );
}

export default Table;
