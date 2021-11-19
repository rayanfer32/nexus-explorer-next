import styles from './ThemeMode.module.css';
import lightBtn from 'assets/icons/light_mode_black_24dp.svg';
import darkBtn from 'assets/icons/dark_mode_black_24dp.svg';
import Image from 'next/image';
import { useState } from 'react';

export default function ThemeMode(props) {
  const [toggle, setToggle] = useState(() => {
    props.isDark ?? true ? styles['thumb-right'] : styles['thumb-left'];
    return props.isDark ?? false;
  });

  const onClick = () => {
    setToggle(!toggle);
    props?.onClick && props?.onClick();
  };

  const toggleClass = toggle ? styles['thumb-right'] : styles['thumb-left'];

  return (
    <button className={styles.container} onClick={onClick}>
      <div className={toggleClass}>
        {toggle ? (
          <Image
            width={16}
            height={20}
            layout="fixed"
            src={darkBtn}
            alt="dark"
            className={styles.img}
          />
        ) : (
          <Image
            width={15}
            height={20}
            layout="fixed"
            src={lightBtn}
            alt="light"
            className={styles.img}
          />
        )}
      </div>
    </button>
  );
}
