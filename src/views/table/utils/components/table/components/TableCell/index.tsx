// ** Styles Import
import styles from "./index.module.scss";

// ** Another Import
import { Column } from "../../../../types/tableType";

interface Props<T> {
  column: Column<T>;
  record: T;
  index: number;
}

function TableCell<T extends object>({
  column,
  record,
  index,
}: Props<T>) {
  const value = column.dataIndex
    ? record[column.dataIndex]
    : undefined;

  return (
    <td
      className={styles.cell}
      style={{ textAlign: column.align }}
    >
      {column.render
        ? column.render(value, record, index)
        : String(value ?? "")}
    </td>
  );
}

export default TableCell;
