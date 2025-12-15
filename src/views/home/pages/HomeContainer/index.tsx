// ** Styles Import
import styles from './index.module.scss';

// ** Another Import
import { options } from '../../../../data';
import { useNavigate } from 'react-router-dom';

function HomeContainer() {
  // ** hooks
  const navigate = useNavigate();
  return (
    <div className={styles.bodyContainer}>
      <div className={styles['options-grid']}>
        {options.map((item, index) => (
          <div
            key={index}
            className={styles['option-card']}
            onClick={() => navigate('/' + item.id)}
          >
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeContainer;
