// ** Style Import
import styles from './index.module.scss';

// ** Other Import
import { ChangeEvent, ReactNode, useState } from 'react';

export interface InputOTPProps {
  name?: string;
  onChange?: any;
  value?: string;
  disabled?: true;
  otpLength?: number;
  children?: ReactNode;
}

function InputOTP({
  value,
  disabled,
  name = 'otp',
  otpLength = 4,
  children = '',
}: InputOTPProps) {
  // ** State
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));

  const otpArray = new Array(otpLength).fill(null);

  // ** Function
  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value.replace(/[^0-9]/g, '');

    if (value.length === 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input field if current one is filled
      if (index < otp.length - 1) {
        const nextElement = document.getElementById(
          `otp-input-${index + 1}`
        ) as HTMLInputElement;
        nextElement?.focus();
      }
    }
  };

  return (
    <div className={styles.otpContainer}>
      {children && (
        <label className={styles.otpContainer__title}>{children}</label>
      )}
      <div className={styles.otpContainer__form}>
        {otpArray.map((_, index: any) => (
          <input
            key={index}
            type='text'
            id={`otp-input-${index}`}
            name={`${name}[${index}]`}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target, index)
            }
            maxLength={1}
            placeholder='-'
            {...(disabled ? { disabled: true } : {})}
            className={styles.otpContainer__form__input}
          />
        ))}
      </div>
    </div>
  );
}

export default InputOTP;
