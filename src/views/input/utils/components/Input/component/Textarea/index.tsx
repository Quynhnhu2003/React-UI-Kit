import styles from './index.module.scss';
import { ReactNode } from 'react';

export interface InputTextareaProps {
  name?: string;
  rows?: number;
  cols?: number;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  showCount?: boolean;
  placeholder?: string;
  children?: ReactNode;
  onChange: (content: string) => void;
}

function InputTextarea({
  rows = 5,
  required,
  onChange,
  cols = 10,
  value = '',
  children = '',
  maxLength = 3000,
  disabled = false,
  placeholder = '',
  showCount = false,
  name = 'textarea',
}: InputTextareaProps) {
  // ** Function
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className={styles.textareaContainer}>
      {children && (
        <label className={styles.textareaContainer__title}>
          {children}
          {required && (
            <span className={styles.textContainer__title__required}>*</span>
          )}
        </label>
      )}
      <div className={styles.textareaContainer__form}>
        <span className={styles.textareaContainer__form__textarea}>
          <textarea
            name={name}
            rows={rows}
            cols={cols}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            placeholder={placeholder}
          />
        </span>
        {showCount && (
          <div className={styles.textareaContainer__form__textValue}>
            <span>{value?.length || 0}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputTextarea;
