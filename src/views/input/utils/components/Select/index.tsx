// ** Style Import
import styles from './index.module.scss';

// ** React Import
import { ReactNode, useEffect, useRef, useState } from 'react';

// ** Component Import
import Radio from '../Radio';

type ListOpts = {
  id: string;
  name: string;
};

type Items = {
  groupName: string;
  listOpts: ListOpts[];
};

type SelectProps = {
  title: string;
  name?: string;
  disabled?: boolean;
  children?: ReactNode;
  placeholder?: string;
  itemsSelect: Items[];
  defaultCurrent?: number;
  onChange: (item: any, name?: string) => void;
};

function Select({
  onChange,
  children,
  title = '',
  itemsSelect,
  name = 'select',
  defaultCurrent = -1,
  placeholder = 'Select...',
}: SelectProps) {
  // ** State
  const [showList, setShowList] = useState<boolean>(false);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<any>(
    defaultCurrent !== -1 ? itemsSelect[defaultCurrent].listOpts[0] : null
  );

  // ** Ref
  const ref = useRef<HTMLDivElement | null>(null);

  // ** useEffect: close select when user click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowList(false);
      }
    }

    if (showList) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showList]);

  const handleSelect = (opt: ListOpts) => {
    setSelectedOption(opt);
    onChange(opt, name);
    // setShowList(false);
  };

  const getTitle = () => {
    return selectedOption?.name || placeholder;
  };

  return (
    <div className={styles.selectContainer}>
      <div className={styles.selectContainer__title}>{children}</div>
      <div
        ref={ref}
        tabIndex={0}
        role='button'
        className={styles.selectContainer__select}
        onKeyDown={(e) => e.preventDefault()}
        onClick={() => setShowList(!showList)}
      >
        <span className={styles.selectContainer__select__title}>
          {getTitle()}
          <svg
            width='14'
            height='8'
            fill='none'
            viewBox='0 0 14 8'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill='#464646'
              d='M12.92 0.180176H6.68999H1.07999C0.119992 0.180176 -0.360007 1.34018 0.319993 2.02018L5.49999 7.20018C6.32999 8.03018 
            7.67999 8.03018 8.50999 7.20018L10.48 5.23018L13.69 2.02018C14.36 1.34018 13.88 0.180176 12.92 0.180176Z'
            />
          </svg>
        </span>

        <div
          className={
            showList
              ? `${styles.selectContainer__select__list} ${styles['selectContainer__select__list--show']}`
              : styles.selectContainer__select__list
          }
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className={styles.selectContainer__select__list__header}
            onClick={() => setShowList(!showList)}
          >
            <svg
              height='5'
              width='40'
              fill='none'
              viewBox='0 0 40 5'
              xmlns='http://www.w3.org/2000/svg'
              className={styles.selectContainer__select__list__header__icon}
            >
              <rect y='0.5' width='40' height='4' rx='2' fill='#616161' />
            </svg>
            <p className={styles.selectContainer__select__list__header__title}>
              {title}
            </p>
          </div>

          {/* Tabs */}
          {itemsSelect.length > 1 && (
            <ul className={styles.selectContainer__select__tabs}>
              {itemsSelect.map((group, index) => (
                <li
                  key={index}
                  className={`${styles.selectContainer__select__tabs__item} ${
                    selectedGroupIndex === index
                      ? styles['selectContainer__select__tabs__item--active']
                      : ''
                  }`}
                  onClick={() => {
                    setSelectedGroupIndex(index);
                    setSelectedOption(null);
                  }}
                >
                  {group.groupName}
                </li>
              ))}
            </ul>
          )}

          <ul
            className={styles.selectContainer__select__options}
            style={{ padding: 0 }}
          >
            {itemsSelect[selectedGroupIndex]?.listOpts.map((opt) => (
              <li
                key={opt.id}
                role='menuitem'
                data-value={opt.id}
                onClick={() => handleSelect(opt)}
                onKeyDown={(e) => e.preventDefault()}
                className={styles.selectContainer__select__list__option}
                style={{ listStyle: 'none' }}
              >
                <Radio
                  label={opt.name}
                  onChange={() => handleSelect(opt)}
                  checked={selectedOption?.id === opt.id}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export { Select };
