// ** Style Import
import styles from './index.module.scss';

type RadioProps = {
  name?: string;
  label: string;
  disabled?: true;
  labelDisplay?: LabelDisplay;
  checked?: boolean;
  value?: string | number;
  onChange?: (option: string) => void;
};
type LabelDisplay = 'first' | 'last';
function Radio({
  disabled,
  onChange,
  name = '',
  label = '',
  value = '',
  checked = false,
  labelDisplay = 'first',
}: RadioProps) {
  // ** Function
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={styles.radioContainer}>
      {labelDisplay === 'first' && (
        <label
          htmlFor={name}
          className={`${styles.radioContainer__label} ${styles['radioContainer__label--first']}`}
        >
          {label}
        </label>
      )}
      <div className={styles.radioContainer__checkbox}>
        <input
          name={name}
          type='radio'
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className={styles.radioContainer__checkbox__input}
        />

        {checked ? (
          <svg
            width='24'
            height='25'
            fill='none'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            className={`${styles.radioContainer__checkbox__svg}`}
          >
            <circle
              cx='12'
              r='9.25'
              cy='12.5'
              stroke='#2569FF'
              strokeWidth='1.5'
            />
            <circle cx='12' cy='12.5' r='6' fill='#2569FF' />
          </svg>
        ) : (
          <svg
            width='24'
            height='24'
            fill='none'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            className={`${styles.radioContainer__checkbox__svg}`}
          >
            <circle
              r='10'
              cx='12'
              cy='12.5'
              stroke='#7D7D7D'
              strokeWidth='1.5'
            />
          </svg>
        )}
      </div>
      {labelDisplay === 'last' && (
        <label
          htmlFor={name}
          className={`${styles.radioContainer__label} ${styles['radioContainer__label--last']}`}
        >
          {label}
        </label>
      )}
    </div>
  );
}
export default Radio;
