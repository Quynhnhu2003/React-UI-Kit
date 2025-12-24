// ** Styles Import
import styles from "./index.module.scss";

// ** Another Import
import { Skeleton } from "@mui/material";

function TableSkeleton() {
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.search}>
        <Skeleton width={250} height={40} variant="rounded" />
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            {[1, 2, 3, 4, 5].map((index) => (
              <th key={index}>
                <Skeleton key={index} width={135} height={40} />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4, 5].map((index: number) => (
            <tr>
              {[1, 2, 3, 4, 5].map((col) => (
                <td key={col}>
                  <Skeleton key={index} width={135} height={40} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.paginationWrapper}>
        <Skeleton width={135} height={40} />
      </div>
    </div>
  );
}

export default TableSkeleton;
