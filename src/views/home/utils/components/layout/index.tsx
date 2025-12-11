// ** React Import
import { Outlet } from 'react-router-dom';

// ** Styles Import
import styles from './index.module.scss';

// ** Another Import
import HeaderHome from '../header';

export default function LayoutHome() {
  return (
    <div className={styles.layoutContainer}>
      <HeaderHome />
      <Outlet />
    </div>
  );
}
