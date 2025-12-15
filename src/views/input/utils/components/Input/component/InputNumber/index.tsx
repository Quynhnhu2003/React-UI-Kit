// ** Style Import
import styles from './index.module.scss';

// ** React Import
import { ReactNode } from 'react';

export interface InputNumberProps {
  onChange?: (value: string) => void;
  name?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  children?: ReactNode;
  placeholder?: string;
}

function InputNumber({
  disabled = false,
  children,
  onChange = () => {},
  required = false,
  value = '',
  name = 'text',
  maxLength = 3000,
  placeholder = '',
}: InputNumberProps) {
  // ** Function
  const formatNumber = (value: string | number) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;

    // chỉ cho nhập số
    rawValue = rawValue.replace(/\D/g, '');

    onChange?.(rawValue);
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
          value={formatNumber(value)}
          onChange={handleChange}
          maxLength={maxLength}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          inputMode='numeric'
          className={styles.textContainer__form__input}
        />
      </div>
    </div>
  );
}

export default InputNumber;
