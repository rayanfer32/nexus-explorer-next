import styles from './Dropdown.module.scss';
import { FiChevronDown } from 'react-icons/fi';
import { Children } from 'react';
import { cls } from 'utils';

const Dropdown = ({ title = 'Dropdown', children, selected = false }) => {
  return (
    <div className={styles.dropDown}>
      <button className={cls(styles.dropDown__btn, 'btn__selected')}>
        {title}
        <FiChevronDown size="1rem" color="inherit" />
      </button>
      <div className={styles.dropDown__content}>
        {Children.map(children, (child) => {
          return <div className={styles.dropDown__content__item}>{child}</div>;
        })}
      </div>
      <style jsx>{`
        /* Dropdown Button on Selected*/
        .btn__selected {
          border-radius: ${selected &&
          `var(--space-xxxs) var(--space-xxxs) 0 0`};
          color: ${selected && `var(--theme-page-text-secondary)`};
          font-weight: ${selected && `bold`};
          border-bottom: ${selected
            ? `solid 0.125rem var(--sky-blue)`
            : `none`};
        }
      `}</style>
    </div>
  );
};

export default Dropdown;
