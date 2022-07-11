import styles from './ThemeMode.module.scss';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useDarkMode, useMediaQuery } from 'hooks';
import { cls } from 'utils';

/**
 * Toggle button Component for theme selection
 *
 * @param {boolean} isDark theme status
 * @param {Function} onClick onClick function
 */
export default function ThemeMode() {
  const [isDarkMode, setDarkMode] = useDarkMode();
  const isSmallScreen = useMediaQuery('(max-width: 920px)');
  const toggleStyle = isDarkMode
    ? { justifyContent: 'flex-end' }
    : { justifyContent: 'flex-start' };

  const Icon = ({ isDark }) => {
    return (
      <>
        {isDark ? (
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
      </>
    );
  };

  return (
    <>
      {isSmallScreen ? (
        <button
          className={styles.themeMode}
          style={toggleStyle}
          onClick={() => setDarkMode(!isDarkMode)}>
          <div className={styles.themeMode__thumb}>
            <Icon isDark={isDarkMode} />
          </div>
        </button>
      ) : (
        <button
          className={cls(
            styles.themeMode__thumb,
            styles.themeMode__thumb__desktop
          )}
          onClick={() => setDarkMode(!isDarkMode)}>
          <Icon isDark={isDarkMode} />
        </button>
      )}
    </>
  );
}
