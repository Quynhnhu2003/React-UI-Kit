// ** React Import
import { Outlet } from 'react-router-dom';

// ** Styles Import
import styles from './index.module.scss';

export default function LayoutAuthen() {
  return (
    <div className={styles.authenContainer}>
      <div className={styles['authenContainer--login']}>
        <Outlet />
      </div>
    </div>
  );
}
