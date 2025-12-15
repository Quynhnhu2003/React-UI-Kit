// ** Style Import
import styles from './index.module.scss';

// ** Other Import
import { ReactNode, useState, useEffect } from 'react';
import CalendarModal from './components/CalendarModal';

export type DatePickerProps = {
  disabled?: boolean;
  children?: ReactNode;
  onChange: (value: string) => void;
};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

function DatePicker({ children, disabled, onChange }: DatePickerProps) {
  // ** State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  // ** useEffect
  useEffect(() => {
    const today = formatDate(new Date());
    setSelectedDate(today);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // ** Function
  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    onChange?.(date);
    closeModal();
  };

  return (
    <div className={styles.dateContainer}>
      {children && (
        <label className={styles.dateContainer__title}>{children}</label>
      )}
      <div className={styles.dateContainer__form}>
        <input
          type='text'
          maxLength={10}
          onClick={openModal}
          value={selectedDate}
          placeholder='dd/MM/yyyy'
          {...(disabled ? { disabled: true } : {})}
          className={styles.dateContainer__form__input}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <div onClick={openModal} className={styles.dateContainer__form__button}>
          <svg
            width='24'
            height='24'
            fill='none'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8 2V5'
              stroke='#464646'
              strokeWidth='1.5'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M16 2V5'
              stroke='#464646'
              strokeWidth='1.5'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M3.5 9.08984H20.5'
              stroke='#464646'
              strokeWidth='1.5'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              stroke='#464646'
              strokeWidth='1.5'
              strokeMiterlimit='10'
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z'
            />
            <path
              stroke='#464646'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.6937 13.7002H15.7027'
            />
            <path
              stroke='#464646'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.6937 16.7002H15.7027'
            />
            <path
              stroke='#464646'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11.9945 13.7002H12.0035'
            />
            <path
              stroke='#464646'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11.9945 16.7002H12.0035'
            />
            <path
              stroke='#464646'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.29529 13.7002H8.30427'
            />
            <path
              stroke='#464646'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.29529 16.7002H8.30427'
            />
          </svg>
        </div>
        <CalendarModal
          isOpen={isModalOpen}
          onClose={closeModal}
          formatDayOfweek={['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']}
          beginFromDay='Monday'
          onDateSelect={handleDateChange}
        />
      </div>
    </div>
  );
}

export default DatePicker;
