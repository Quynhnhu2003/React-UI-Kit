// ** Styles Impoet
import styles from "./index.module.scss";

interface Props {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}

export default function TablePagination({
  page,
  pageSize,
  total,
  onChange,
}: Props) {
  const totalPage = Math.ceil(total / pageSize);

  return (
    <div className={styles.pagination}>
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>
        <span className="material-symbols-outlined">
          keyboard_double_arrow_left
        </span>
      </button>

      <span>
        Page {page} / {totalPage}
      </span>

      <button disabled={page === totalPage} onClick={() => onChange(page + 1)}>
        <span className="material-symbols-outlined">
          keyboard_double_arrow_right
        </span>
      </button>
    </div>
  );
}
