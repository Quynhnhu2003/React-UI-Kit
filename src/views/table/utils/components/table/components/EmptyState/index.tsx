// ** Styles Import
import styles from "./index.module.scss";

interface Props {
  colSpan: number;
  text: string;
}

export default function EmptyState({ colSpan, text }: Props) {
  return (
    <tr>
      <td colSpan={colSpan} className={styles.empty}>
        {text}
      </td>
    </tr>
  );
}
