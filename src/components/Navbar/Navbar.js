import styles from './Navbar.module.css';
import Image from 'next/image';
import nexusLogoWhite from 'assets/branding/NexusLogoWhite1000x225.png';
import nexusLogoBlue from 'assets/branding/NexusLogoBlue1000x225.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeMode from 'components/atoms/ThemeMode';
import Search from 'components/atoms/SearchBar';
import { useDarkMode } from 'hooks';
import TYPES from 'types';
import { useState } from 'react';
import Portal from 'components/HOC/Portal';

function Navbar() {
  const router = useRouter();
  const [isDarkMode, setDarkMode] = useDarkMode();
  const navList = TYPES.navList;
  const onClickBrand = () => router.push('/');
  const [searchInput, setSearchInput] = useState('');
  const [toggle, setToggle] = useState(false);

  const DesktopNavItem = () => (
    <div className={styles.navItem}>
      <div className={styles.brand} onClick={onClickBrand}>
        <Image
          width={142}
          height={32}
          layout="fixed"
          src={isDarkMode ? nexusLogoWhite : nexusLogoBlue}
          alt="nexus logo"></Image>
        <div className={styles.explorer}>Explorer</div>
      </div>
      <div className={styles.links}>
        {navList.map((navItem) => {
          return (
            <span
              key={navItem.id}
              className={
                router.pathname === navItem.path ? styles.active : undefined
              }>
              <Link href={navItem.path}>{navItem.title}</Link>
            </span>
          );
        })}
      </div>

      <ThemeMode
        onClick={() => setDarkMode((prevMode) => !prevMode)}
        isDark={isDarkMode}
      />
    </div>
  );

  const MobileNavItem = () => (
    <div className={styles.mNavItem}>
      <div className={styles.hamIcon} onClick={() => setToggle(!toggle)}></div>
      {toggle && (
        <section className={styles.mPortal}>
          <div className={styles.hamMenu}>
            <div className={styles.themeIcon}>
              {' '}
              <ThemeMode
                onClick={() => setDarkMode((prevMode) => !prevMode)}
                isDark={isDarkMode}
              />
            </div>

            <div
              className={styles.closeHam}
              onClick={() => setToggle(!toggle)}></div>

            <div className={styles.mlinks}>
              {navList.map((navItem) => {
                return (
                  <span
                    key={navItem.id}
                    className={
                      router.pathname === navItem.path
                        ? styles.mactive
                        : undefined
                    }>
                    <Link href={navItem.path}>{navItem.title}</Link>
                  </span>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.nav}>
          {/* <div className={styles.navItem}> */}
          <DesktopNavItem />
          <MobileNavItem />
          {/* </div> */}
          <div className={styles.searchBar}>
            <Search
              long
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onSearch={() => {
                router.push(`/scan/${searchInput}`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
