// ** Style Import
import styles from './index.module.scss';

// ** React Import
import { ReactNode } from 'react';

interface InputFileProps {
  name?: string;
  disabled?: boolean;
  required?: boolean;
  children?: ReactNode;
  accept?: string;
  multiple?: boolean;
  onChange?: (files: FileList | null) => void;
}

function InputFile({
  disabled = false,
  children,
  onChange,
  required = false,
  name = 'file',
  accept,
  multiple = false,
}: InputFileProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.files);
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

      <div className={styles.upload}>
        <input
          type='file'
          name={name}
          accept={accept}
          multiple={multiple}
          className={styles.upload__input}
          onChange={handleChange}
          disabled={disabled}
          required={required}
        />

        <div className={styles.upload__content}>
          <div className={styles.upload__icon}>
            <span
              className='material-symbols-outlined'
              style={{ color: '#fff' }}
            >
              upload
            </span>{' '}
          </div>

          <div className={styles.upload__text}>
            <p className={styles.upload__title}>Upload file</p>
            <p className={styles.upload__desc}>
              Kéo & thả hoặc <span>click để chọn</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputFile;
