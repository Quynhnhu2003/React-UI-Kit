// ** Style Import
import styles from './index.module.scss';

// ** React Import
import { ReactNode, useState } from 'react';

export interface InputPasswordProps {
  name?: string;
  value?: string;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  children?: ReactNode;
  placeholder?: string;
  visibilityToggle?: boolean;
  onChange: (password: string) => void;
}

function InputPassword({
  value,
  disabled = false,
  required = false,
  name = '',
  children = '',
  onChange = () => {},
  placeholder = '',
  maxLength = 3000,
  visibilityToggle = false,
}: InputPasswordProps) {
  // ** State
  const [show, setShow] = useState<boolean>(false);

  // ** Function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className={styles.paswordContainer}>
      {children && (
        <label className={styles.paswordContainer__title}>
          {children}
          {required && (
            <span className={styles.paswordContainer__title__required}>*</span>
          )}
        </label>
      )}
      <div className={styles.paswordContainer__form}>
        <input
          name={name}
          value={value}
          maxLength={maxLength}
          onChange={handleChange}
          placeholder={placeholder}
          type={show ? 'text' : 'password'}
          {...(disabled ? { disabled: true } : {})}
          {...(required ? { required: true } : {})}
          className={styles.paswordContainer__form__input}
        />
        {visibilityToggle && (
          <div
            onClick={() => setShow(!show)}
            className={styles.paswordContainer__form__button}
          >
            {show ? (
              <span className='material-symbols-outlined'>visibility</span>
            ) : (
              <span className='material-symbols-outlined'>visibility_off</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default InputPassword;
