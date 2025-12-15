// ** Style Import
import styles from './index.module.scss';

// ** React Import
import { ReactNode, useState } from 'react';

export interface InputSearchProps {
  name?: string;
  onChange?: any;
  value?: string;
  disabled?: true;
  maxLength?: number;
  children?: ReactNode;
  placeholder?: string;
}

function InputSearch({
  name,
  disabled,
  children = '',
  maxLength = 3000,
  placeholder = '',
}: // clearable,
InputSearchProps) {
  // ** State
  const [textValue, setTextValue] = useState<string>('');

  // ** Function
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(e.target.value);
  };

  // const clearValue = () => {
  //   setTextValue('');
  // };
  return (
    <div className={styles.searchContainer}>
      {children && (
        <label className={styles.searchContainer__title}>{children}</label>
      )}
      <div className={styles.searchContainer__form}>
        <label className={styles.searchContainer__form__icon}>
          <svg
            width='25'
            height='24'
            fill='none'
            viewBox='0 0 25 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              stroke='#464646'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M11.887 21C17.1337 21 21.387 16.7467 21.387 11.5C21.387 6.25329 17.1337 2 11.887 2C6.64026 2 
              2.38696 6.25329 2.38696 11.5C2.38696 16.7467 6.64026 21 11.887 21Z'
            />
            <path
              stroke='#464646'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M22.387 22L20.387 20'
            />
          </svg>
        </label>
        <input
          type='text'
          name={name}
          value={textValue}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={handleInputChange}
          {...(disabled ? { disabled: true } : {})}
          className={styles.searchContainer__form__input}
        />
        {/* {clearable && (
          <button
            className={styles.searchContainer__form__clearable}
            onClick={clearValue}
          >
            <i className='ti ti-x'></i>
          </button>
        )} */}
      </div>
    </div>
  );
}

export default InputSearch;
