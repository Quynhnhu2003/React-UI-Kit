// ** Style Import
import styles from './index.module.scss';

// ** React Import
import { useEffect, useRef, useState } from 'react';

type ViewMode = 'year' | 'month' | 'day';
type DayOfWeek = 'Monday' | 'Sunday';

type CalendarModalProps = {
  isOpen: boolean;
  views?: ViewMode[];
  onClose: () => void;
  formatDayOfweek?: string[];
  beginFromDay?: DayOfWeek;
  onDateSelect: (date: string) => void;
};

type DayType = {
  day: number;
  currentMonth: boolean;
  type: 'prev' | 'current' | 'next';
};

function CalendarModal({
  onDateSelect,
  isOpen = false,
  views = ['day', 'month', 'year'],
  onClose = () => {},
  formatDayOfweek = [],
  beginFromDay = 'Monday',
}: CalendarModalProps) {
  const today = new Date();

  const handleCheckView = (): ViewMode => {
    if (views.includes('day')) return 'day';
    if (views.includes('month')) return 'month';
    return 'year';
  };

  // ** State
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [monthDisplay, setMonthDisplay] = useState(today.getMonth());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [yearDisplay, setYearDisplay] = useState(today.getFullYear());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [currentView, setCurrentView] = useState<ViewMode>(handleCheckView);

  // ** Ref
  const yearListRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const startYear = today.getFullYear() - 50;
  const years = Array.from({ length: 100 }, (_, i) => startYear + i);
  const months = Array.from({ length: 12 }, (_, i) => i);

  const weekDays =
    formatDayOfweek.length > 0
      ? formatDayOfweek
      : beginFromDay === 'Monday'
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // ** useEffect
  const yearRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (isOpen) {
      setCurrentView(handleCheckView());
    }
  }, [isOpen]);

  useEffect(() => {
    if (currentView === 'year') {
      const el = yearRefs.current[selectedYear];
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentView]);

  // ** useEffect: close modal when user click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // ** Function
  const pad = (val: number) => String(val).padStart(2, '0');
  const formatDate = (month: number, year: number, day?: number): string => {
    if (views.includes('day')) {
      return `${pad(day ?? 0)}/${pad(month + 1)}/${year}`;
    } else if (views.includes('month')) {
      return `${pad(month + 1)}/${year}`;
    }
    return `${year}`;
  };

  // ** Function: Calculator day in month
  const getDaysInMonthGrid = () => {
    const days: DayType[] = [];

    const rawFirstDay = new Date(yearDisplay, monthDisplay, 1).getDay();
    const firstDayOfMonth =
      beginFromDay === 'Monday' ? (rawFirstDay + 6) % 7 : rawFirstDay;

    const totalDaysInMonth = new Date(
      yearDisplay,
      monthDisplay + 1,
      0
    ).getDate();

    const totalDaysInPrevMonth = new Date(
      yearDisplay,
      monthDisplay,
      0
    ).getDate();

    const leadingDays = firstDayOfMonth;

    for (let i = leadingDays; i > 0; i--) {
      days.push({
        day: totalDaysInPrevMonth - i + 1,
        type: 'prev',
        currentMonth: false,
      });
    }

    for (let i = 1; i <= totalDaysInMonth; i++) {
      days.push({
        day: i,
        type: 'current',
        currentMonth: true,
      });
    }

    const trailingDays = 42 - days.length;
    for (let i = 1; i <= trailingDays; i++) {
      days.push({
        day: i,
        type: 'next',
        currentMonth: false,
      });
    }

    return days;
  };

  // ** Function
  const handleYearClick = (year: number) => {
    setSelectedYear(year);
    setYearDisplay(year);
    if (views.includes('day')) {
      setCurrentView('month');
    } else {
      const formatted = formatDate(selectedMonth, year);
      onDateSelect?.(formatted);
    }
  };

  // ** Function
  const handleMonthClick = (month: number) => {
    setSelectedMonth(month);
    setMonthDisplay(month);
    if (views.includes('day')) {
      setCurrentView('day');
    } else {
      setCurrentView('year');
    }
  };

  // ** Function:
  const selectDate = (day: number, type: string) => {
    setSelectedYear(yearDisplay);
    setSelectedMonth(monthDisplay);
    if (type === 'current') {
      setSelectedDay(day);
      const formatted = formatDate(
        monthDisplay ? monthDisplay : selectedMonth,
        yearDisplay ? yearDisplay : selectedYear,
        day
      );
      onDateSelect(formatted);
      onClose();
    }
    return;
  };

  // ** Function
  const prevMonth = () => {
    if (monthDisplay === 0) {
      setMonthDisplay(11);
      setYearDisplay((prev) => prev - 1);
    } else {
      setMonthDisplay((prev) => prev - 1);
    }
  };

  // ** Function
  const nextMonth = () => {
    if (monthDisplay === 11) {
      setMonthDisplay(0);
      setYearDisplay((prev) => prev + 1);
    } else {
      setMonthDisplay((prev) => prev + 1);
    }
  };

  const headerText = `${new Date(yearDisplay, monthDisplay).toLocaleString(
    'default',
    { month: 'long' }
  )} ${yearDisplay}`;

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContainer__content} ref={modalRef}>
        <div className={styles.modalContainer__content__header}>
          {/* Previous month */}
          {currentView === 'day' && (
            <a
              onClick={prevMonth}
              className={styles.modalContainer__content__header__title}
            >
              <svg
                width='10'
                height='17'
                fill='none'
                viewBox='0 0 10 17'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill='#464646'
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M8.68183 15.7198C8.57583 15.8268 8.44967 15.9118 8.31064 15.9698C8.17161 16.0278 8.02247 16.0576 7.87183 16.0576C7.72119 16.0576 7.57205 16.0278 7.43302 15.9698C7.29399 15.9118 7.16783 15.8268 7.06183 15.7198L0.411833 9.05981C0.148025 8.79385 0 8.43442 0 8.05981C0 7.6852 0.148025 7.32577 0.411833 7.05981L7.06183 0.40981C7.16427 0.287455 7.29105 0.187759 7.43411 0.117062C7.57718 0.046366 7.73338 0.00621749 7.8928 -0.000830753C8.05222 -0.007879 8.21136 0.0183278 8.36011 0.0761231C8.50885 0.133918 8.64393 0.222037 8.75677 0.334874C8.86961 0.447711 8.95772 0.582796 9.01552 0.731538C9.07332 0.880279 9.09952 1.03942 9.09247 1.19884C9.08543 1.35826 9.04528 1.51447 8.97458 1.65753C8.90388 1.80059 8.80419 1.92737 8.68183 2.02981L2.63183 8.02981L8.68183 14.0798C8.79192 14.1861 8.87947 14.3135 8.93926 14.4544C8.99906 14.5953 9.02987 14.7468 9.02987 14.8998C9.02987 15.0529 8.99906 15.2043 8.93926 15.3452C8.87947 15.4861 8.79192 15.6135 8.68183 15.7198Z'
                />
              </svg>
            </a>
          )}
          {views.includes('year') && views.includes('day')
            ? (currentView === 'month' || currentView === 'day') &&
              views.includes('year') && (
                <a
                  onClick={() => setCurrentView('year')}
                  className={styles.modalContainer__content__header__title}
                >
                  {headerText}
                  {currentView === 'day' && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='#434343'
                      height='12px'
                      width='12px'
                      version='1.1'
                      id='Layer_1'
                      viewBox='0 0 386.257 386.257'
                    >
                      <polygon points='0,96.879 193.129,289.379 386.257,96.879 ' />
                    </svg>
                  )}
                </a>
              )
            : views.includes('month') && (
                <a
                  onClick={() => setCurrentView('month')}
                  className={styles.modalContainer__content__header__title}
                >
                  {headerText}
                  {currentView === 'day' && (
                    // <svg
                    //   fill='none'
                    //   width='auto'
                    //   viewBox='0 0 14 8'
                    //   xmlns='http://www.w3.org/2000/svg'
                    //   className={styles.modalContainer__content__header__icon}
                    // >
                    //   <path
                    //     fill='#464646'
                    //     d='M12.9202 0.180176H6.69024H1.08024C0.120237 0.180176 -0.359763 1.34018 0.320237 2.02018L5.50024 7.20018C6.33024 8.03018 7.68024 8.03018 8.51024 7.20018L10.4802 5.23018L13.6902 2.02018C14.3602 1.34018 13.8802 0.180176 12.9202 0.180176Z'
                    //   />
                    // </svg>
                    <i className='ti ti-arrow-big-down-line-filled'></i>
                  )}
                </a>
              )}
          {/* Next month */}
          {currentView === 'day' && (
            <a
              onClick={nextMonth}
              className={styles.modalContainer__content__header__title}
            >
              <svg
                width='10'
                height='17'
                fill='none'
                viewBox='0 0 10 17'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill='#464646'
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M0.411917 0.336833C0.517916 0.229801 0.644075 0.144832 0.783106 0.0868483C0.922136 0.0288639 1.07128 -0.000988007 1.22192 -0.000988007C1.37256 -0.000988007 1.5217 0.0288639 1.66073 0.0868483C1.79976 0.144832 1.92592 0.229801 2.03192 0.336833L8.68192 6.99683C8.94572 7.26279 9.09375 7.62222 9.09375 7.99683C9.09375 8.37144 8.94572 8.73087 8.68192 8.99683L2.03192 15.6468C1.92948 15.7692 1.8027 15.8689 1.65964 15.9396C1.51657 16.0103 1.36037 16.0504 1.20095 16.0575C1.04153 16.0645 0.882386 16.0383 0.733644 15.9805C0.584903 15.9227 0.449818 15.8346 0.336981 15.7218C0.224144 15.6089 0.136025 15.4738 0.0782299 15.3251C0.0204344 15.1764 -0.00577259 15.0172 0.00127602 14.8578C0.00832462 14.6984 0.0484724 14.5422 0.119169 14.3991C0.189866 14.2561 0.289562 14.1293 0.411917 14.0268L6.46192 8.02683L0.411917 1.97683C0.301832 1.87051 0.214283 1.74311 0.154488 1.60223C0.0946922 1.46135 0.0638771 1.30988 0.0638771 1.15683C0.0638771 1.00379 0.0946922 0.852308 0.154488 0.711429C0.214283 0.570549 0.301832 0.443153 0.411917 0.336833Z'
                />
              </svg>
            </a>
          )}
        </div>

        <div className={styles.modalContainer__content__body}>
          {/* YEAR VIEW */}
          {currentView === 'year' && (
            <div
              ref={yearListRef}
              className={`${styles.modalContainer__content__body__grid} ${styles['modalContainer__content__body__grid--year']}`}
            >
              {years.map((year) => (
                <div
                  key={year}
                  ref={(el) => (yearRefs.current[year] = el)}
                  onClick={() => handleYearClick(year)}
                  className={`${styles.modalContainer__content__body__date} ${
                    year === selectedYear
                      ? styles['modalContainer__content__body__date--selected']
                      : ''
                  }`}
                >
                  {year}
                </div>
              ))}
            </div>
          )}

          {/* MONTH VIEW */}
          {currentView === 'month' && (
            <div
              className={`${styles.modalContainer__content__body__grid} ${styles['modalContainer__content__body__grid--month']}`}
            >
              {months.map((month) => (
                <div
                  key={month}
                  className={`${styles.modalContainer__content__body__day} ${
                    month === selectedMonth
                      ? styles['modalContainer__content__body__day--selected']
                      : ''
                  }`}
                  onClick={() => handleMonthClick(month)}
                >
                  {new Date(0, month).toLocaleString('default', {
                    month: 'short',
                  })}
                </div>
              ))}
            </div>
          )}

          {/* DAY VIEW */}
          {currentView === 'day' && (
            <div
              className={`${styles.modalContainer__content__body__grid} ${styles['modalContainer__content__body__grid--day']}`}
            >
              {weekDays.map((day, index) => (
                <div
                  key={index}
                  role='button'
                  aria-disabled='true'
                  className={`${styles.modalContainer__content__body__day} ${styles['modalContainer__content__body__day--weekdays']}`}
                >
                  {day}
                </div>
              ))}

              {getDaysInMonthGrid().map((day, index) => (
                <div
                  key={index}
                  onClick={() =>
                    day &&
                    day.type === 'current' &&
                    selectDate(day.day, day.type)
                  }
                  className={`
                    // ** Checking date display type to add scss class
                      ${
                        day.type === 'current'
                          ? styles.modalContainer__content__body__day
                          : styles[
                              'modalContainer__content__body__day--preNext'
                            ]
                      }
                      // ** Checking today and add scss class
                      ${
                        day.day === today.getDate() &&
                        monthDisplay === today.getMonth() &&
                        selectedYear === today.getFullYear() &&
                        day.type === 'current' &&
                        styles['modalContainer__content__body__date--today']
                      }
                      // ** Checking date was selected by the user to add the scss class
                      ${
                        day.day === selectedDay &&
                        selectedMonth === monthDisplay &&
                        selectedYear === yearDisplay &&
                        day.type === 'current' &&
                        styles['modalContainer__content__body__date--selected']
                      }
                    `}
                >
                  {day.day}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarModal;
