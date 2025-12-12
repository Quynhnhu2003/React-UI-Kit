// ** Styles Import
import styles from './index.module.scss';

// ** Another Import
import notify from '../../utils/components/Toast/components/notify';

const statusNoti = [
  {
    id: 'success',
    label: '✅ Success',
  },
  {
    id: 'error',
    label: '❌ Error',
  },
  {
    id: 'blank',
    label: '️💨 Blank',
  },
];

function Toast() {
  // ** Function
  const showNoti = (id: string) => {
    switch (id) {
      case 'success':
        notify({
          message: 'Successfully Toast!',
          toastType: 'success',
          toastPosition: 'top',
        });

        break;
      case 'error':
        notify({
          message: 'This isnt work!',
          toastType: 'error',
          toastPosition: 'bottom',
        });

        break;
      case 'promise':
        notify({
          message: '❌ This isnt work!',
          toastType: 'error',
          toastPosition: 'bottom',
        });

        break;

      default:
        notify({
          message: 'Lorem ipsum dolor sit',
          toastType: 'blank',
          toastPosition: 'bottom',
        });

        break;
    }
  };
  return (
    <div className={styles.toastContainer}>
      <div className={styles.toastContainer__grid}>
        {statusNoti.map((status) => (
          <div
            key={status.id}
            className={styles.card}
            onClick={() => showNoti(status.id)}
          >
            {status.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Toast;
