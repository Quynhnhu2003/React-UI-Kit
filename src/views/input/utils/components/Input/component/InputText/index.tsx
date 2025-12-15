// ** Style Import
import styles from './index.module.scss';

// ** React Import
import { ReactNode } from 'react';

export interface InputTextProps {
  name?: string;
  onChange: (text: string) => void;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  // clearable?: boolean;
  children?: ReactNode;
  placeholder?: string;
}

function InputText({
  disabled = false,
  children,
  onChange = () => {},
  required = false,
  // clearable,
  value = '',
  name = 'text',
  maxLength = 3000,
  placeholder = '',
}: InputTextProps) {
  // ** Function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className={styles.textContainer}>
      {children && (
        <label className={styles.textContainer__title}>
          {children}
          {required && (
            <span className={styles.textContainer__title__required}>*</span>
          )}
        </label>
      )}
      <div className={styles.textContainer__form}>
        <input
          type='text'
          name={name}
          value={value}
          maxLength={maxLength}
          onChange={handleChange}
          placeholder={placeholder}
          {...(disabled ? { disabled: true } : {})}
          {...(required ? { required: true } : {})}
          className={styles.textContainer__form__input}
        />
        {/* {clearable && (
          <button className={styles.textContainer__form__clearable}>
            <i className='ti ti-circle-x'></i>
          </button>
        )} */}
      </div>
    </div>
  );
}

export default InputText;
