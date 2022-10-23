import { useState } from 'react';
import { cls } from 'utils';
import styles from './TabChanger.module.scss';

export const TabChanger = ({ options = [], onSelect, active = 0 }) => {
  const [_active, setActive] = useState(active ?? 0);

  const handleClick = (e, idx) => {
    setActive(idx);
    onSelect && onSelect(e);
  };

  return (
    <ul className={styles.tab_container}>
      {Array.isArray(options) &&
        options.map((ele, idx) => {
          return (
            <li
              key={idx}
              onClick={(e) => handleClick(e, idx)}
              className={cls(
                styles.tab_element,
                _active == idx && styles.active
              )}>
              {ele}
            </li>
          );
        })}
    </ul>
  );
};
