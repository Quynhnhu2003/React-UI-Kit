// ** Style Import
import styles from './index.module.scss';

// ** React Import
import { useState } from 'react';
import { Country } from '../../../../types/inputType';
import { Countries } from '../../../../../../../data';

interface InputPhoneProps {
  value?: string;
  country?: Country;
  onChange?: (data: {
    country: Country;
    phone: string;
    fullPhone: string;
  }) => void;
  required?: boolean;
  disabled?: boolean;
  label?: string;
}

function InputPhone({
  value = '',
  country = Countries[2], // Benin mặc định giống ảnh
  onChange,
  required,
  disabled,
  label = 'Enter your phone',
}: InputPhoneProps) {
  // ** State
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(country);

  // ** Function
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value.replace(/\D/g, '');
    onChange?.({
      country: selected,
      phone,
      fullPhone: `${selected.dialCode}${phone}`,
    });
  };

  return (
    <div className={styles.phoneField}>
      <label className={styles.label}>
        {label} {required && <span className={styles.label__required}>*</span>}
      </label>

      <div className={styles.inputWrapper}>
        {/* Country */}
        <button
          type='button'
          className={styles.country}
          onClick={() => setOpen(!open)}
          disabled={disabled}
        >
          <span>{selected.flag}</span>
          <span className={styles.dial}>{selected.dialCode}</span>
          <i className='ti ti-chevron-down' />
        </button>

        {/* Phone input */}
        <input
          type='text'
          value={value}
          onChange={handlePhoneChange}
          disabled={disabled}
          inputMode='numeric'
          className={styles.phoneInput}
        />
      </div>

      {open && (
        <div className={styles.dropdown}>
          {Countries.map((c) => (
            <div
              key={c.code}
              className={`${styles.option} ${
                c.code === selected.code ? styles.active : ''
              }`}
              onClick={() => {
                setSelected(c);
                setOpen(false);
              }}
            >
              <span>{c.flag}</span>
              <span>{c.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InputPhone;
