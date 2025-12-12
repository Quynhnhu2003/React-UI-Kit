// ** Styles Import
import styles from './index.module.scss';

// ** Another Import
import Calendar from '../../utils/components/Calendar';

function TestCalendar() {
  return (
    <div className={styles.testCalendar}>
      <Calendar
        views={['day', 'month', 'year']}
        beginFromDay='Sunday'
        formatDayOfweek={['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']}
      ></Calendar>
    </div>
  );
}

export default TestCalendar;
