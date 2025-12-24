// ** Another Import
import { Column } from "../../../../types/tableType";

interface Props<T> {
  record: T;
  index: number;
  columns: Column<T>[];
}

function TableRow<T extends object>({
  record,
  index,
  columns,
}: Props<T>) {
  return (
    <tr>
    {columns.map((col) => {
      const value = col.dataIndex
        ? record[col.dataIndex]
        : undefined;

      return (
        <td
          key={col.key}
          style={{ textAlign: col.align ?? "left" }}
        >
          {col.render
            ? col.render(value, record, index)
            : String(value ?? "")}
        </td>
      );
    })}
  </tr>
  );
}

export default TableRow;
