// ** Style Import
import styles from './index.module.scss';

type CheckboxProps = {
  name?: string;
  label: string;
  labelDisplay?: LabelDisplay;
  disabled?: boolean;
  checked: boolean;
  onChange: () => void;
  value?: string | number;
};

type LabelDisplay = 'first' | 'last';

function Checkbox({
  label = '',
  value = '',
  checked = false,
  disabled = false,
  name = 'checkbox',
  onChange = () => {},
  labelDisplay = 'first',
}: CheckboxProps) {
  // ** Icon
  const CheckedIcon = () => (
    <svg
      width='24px'
      height='24px'
      version='1.1'
      viewBox='0 0 24.00 24.00'
      xmlns='http://www.w3.org/2000/svg'
      xlinkHref='http://www.w3.org/1999/xlink'
      fill='#2569FF'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g
        stroke='#CCCCCC'
        strokeWidth='0.144'
        strokeLinecap='round'
        strokeLinejoin='round'
        id='SVGRepo_tracerCarrier'
      ></g>
      <g id='SVGRepo_iconCarrier'>
        <title>ic_fluent_checkbox_checked_24_filled</title>
        <desc>Created with Sketch.</desc>
        <g
          fill='none'
          stroke='none'
          strokeWidth='1'
          fillRule='evenodd'
          id='🔍-Product-Icons'
        >
          <g
            fill='#2569FF'
            fillRule='nonzero'
            id='ic_fluent_checkbox_checked_24_filled'
          >
            <path
              d='M18,3 C19.6568542,3 21,4.34314575 21,6 L21,18 C21,19.6568542 19.6568542,21 18,21 L6,21 C4.34314575,21 
                    3,19.6568542 3,18 L3,6 C3,4.34314575 4.34314575,3 6,3 L18,3 Z M16.4696699,7.96966991 L10,14.4393398 L7.53033009,
                    11.9696699 C7.23743687,11.6767767 6.76256313,11.6767767 6.46966991,11.9696699 C6.1767767,12.2625631 6.1767767,
                    12.7374369 6.46966991,13.0303301 L9.46966991,16.0303301 C9.76256313,16.3232233 10.2374369,16.3232233 10.5303301,
                    16.0303301 L17.5303301,9.03033009 C17.8232233,8.73743687 17.8232233,8.26256313 17.5303301,7.96966991 C17.2374369,
                    7.6767767 16.7625631,7.6767767 16.4696699,7.96966991 Z'
              id='🎨-Color'
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );

  const UncheckedIcon = () => (
    <svg
      width='24px'
      height='24px'
      version='1.1'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      xlinkHref='http://www.w3.org/1999/xlink'
    >
      <title>ic_fluent_checkbox_unchecked_24_filled</title>
      <desc>Created with Sketch.</desc>
      <g
        fill='none'
        stroke='none'
        strokeWidth='1'
        fillRule='evenodd'
        id='🔍-Product-Icons'
      >
        <g
          fill='#212121'
          fillRule='nonzero'
          id='ic_fluent_checkbox_unchecked_24_filled'
        >
          <path
            d='M6,3 L18,3 C19.6568542,3 21,4.34314575 21,6 L21,18 C21,19.6568542 19.6568542,21 18,21 L6,21 C4.34314575,21 
                  3,19.6568542 3,18 L3,6 C3,4.34314575 4.34314575,3 6,3 Z M6,5 C5.44771525,5 5,5.44771525 5,6 L5,18 C5,18.5522847 
                  5.44771525,19 6,19 L18,19 C18.5522847,19 19,18.5522847 19,18 L19,6 C19,5.44771525 18.5522847,5 18,5 L6,5 Z'
            id='🎨Color'
          ></path>
        </g>
      </g>
    </svg>
  );

  return (
    <div
      className={styles.checkboxContainer}
      onClick={(e) => {
        e.stopPropagation();
        onChange?.();
      }}
    >
      {labelDisplay === 'first' && (
        <label htmlFor={name} className={styles.checkboxContainer__label}>
          {label}
        </label>
      )}
      <div className={styles.checkboxContainer__checkbox}>
        <input
          type='checkbox'
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={styles.checkboxContainer__checkbox__input}
        />
        {checked ? <CheckedIcon /> : <UncheckedIcon />}
      </div>
      {labelDisplay === 'last' && (
        <label htmlFor={name} className={styles.checkboxContainer__label}>
          {label}
        </label>
      )}
    </div>
  );
}
export default Checkbox;
