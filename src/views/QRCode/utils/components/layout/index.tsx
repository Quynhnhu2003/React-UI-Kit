// ** React Import
import { Outlet } from 'react-router-dom';

// ** Styles Import
import styles from './index.module.scss';

// ** Another Import
import HeaderQrCode from '../header';

export default function LayoutQrCode() {
  return (
    <div className={styles.layoutContainer}>
      <HeaderQrCode />
      <Outlet />
    </div>
  );
}
