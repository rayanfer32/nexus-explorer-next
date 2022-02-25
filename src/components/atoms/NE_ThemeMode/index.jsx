import styles from './ThemeMode.module.scss';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';

ThemeMode.propTypes = {
  isDark: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

/**
 * Toggle button Component for theme selection
 *
 * @param {boolean} isDark theme status
 * @param {Function} onClick onClick function
 */
export default function ThemeMode({ isDark = false, onClick = () => null }) {
  const [toggle, setToggle] = useState(isDark);

  const handleOnClick = () => {
    setToggle(!toggle);
    onClick();
  };

  const toggleStyle = toggle
    ? { justifyContent: 'flex-end' }
    : { justifyContent: 'flex-start' };

  return (
    <button
      className={styles.themeMode}
      style={toggleStyle}
      onClick={handleOnClick}>
      <div className={styles.themeMode__thumb}>
        {toggle ? (
          <BsMoonFill
            color="inherit"
            className={styles.themeMode__thumb__icon}
          />
        ) : (
          <BsSunFill
            color="inherit"
            className={styles.themeMode__thumb__icon}
          />
        )}
      </div>
    </button>
  );
}
