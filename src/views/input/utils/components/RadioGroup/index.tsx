// ** Style Import
import styles from './index.module.scss';

// ** React Import
import { ReactNode, useState } from 'react';

type Items = {
  id: string;
  name: string;
};

type LabelDisplay = 'first' | 'last';
type DisplayGroup = 'column' | 'row';

type RadioGroupProps = {
  name: string;
  title: string;
  items: Items[];
  children?: ReactNode;
  checked?: boolean;
  displayGroup?: DisplayGroup;
  labelDisplay?: LabelDisplay;
  onChange: (id: string) => void;
};

function RadioGroup({
  children,
  name = '',
  items = [],
  title = '',
  labelDisplay = 'first',
  displayGroup = 'column',
  onChange = () => {},
}: RadioGroupProps) {
  // ** State
  const [selected, setSelected] = useState<string | null>(null);

  // ** Function
  const handleRadio = (id: string) => {
    setSelected(id);
    onChange(id);
  };

  // ** Icon
  const CheckedIcon = () => (
    <svg
      width='24'
      height='25'
      fill='none'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      className={`${styles.radioContainer__input__svg}`}
    >
      <circle cx='12' r='9.25' cy='12.5' stroke='#2569FF' strokeWidth='1.5' />
      <circle cx='12' cy='12.5' r='6' fill='#2569FF' />
    </svg>
  );

  const UncheckedIcon = () => (
    <svg
      width='24'
      height='24'
      fill='none'
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      className={`${styles.radioContainer__input__svg}`}
    >
      <circle r='10' cx='12' cy='12.5' stroke='#7D7D7D' strokeWidth='1.5' />
    </svg>
  );

  return (
    <div className={styles.radioGroupContainer}>
      <div className={styles.radioGroupContainer__title}>{children}</div>
      <div
        className={`${styles.radioGroupContainer__style} ${
          displayGroup === 'column'
            ? styles['radioGroupContainer__style--column']
            : styles['radioGroupContainer__style--row']
        }`}
        aria-label={title}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={styles.radioGroupContainer__list}
            onClick={() => handleRadio(item.id)}
          >
            {labelDisplay === 'first' && (
              <label
                htmlFor={`${name}-${item.id}`}
                className={styles.radioGroupContainer__label}
              >
                {item.name}
              </label>
            )}

            <div className={styles.radioGroupContainer__input}>
              <input
                id={`${name}-${item.id}`}
                name={name}
                type='radio'
                value={item.name}
                checked={selected === item.id}
                onChange={() => handleRadio(item.id)}
              />

              {selected === item.id ? <CheckedIcon /> : <UncheckedIcon />}
            </div>

            {labelDisplay === 'last' && (
              <label
                htmlFor={`${name}-${item.id}`}
                className={styles.radioGroupContainer__label}
              >
                {item.name}
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default RadioGroup;
