// ** React Import
import { Outlet } from 'react-router-dom';

// ** Styles Import
import styles from './index.module.scss';

// ** Another Import
import Header from '../../../../../utils/components/Header';

export default function LayoutToast() {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <Outlet />
    </div>
  );
}
