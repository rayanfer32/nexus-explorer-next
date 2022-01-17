import styles from './Navbar.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeMode from 'components/atoms/ThemeMode';
import Search from 'components/atoms/SearchBar';
import { useDarkMode } from 'hooks';
import TYPES from 'types';
import { useState } from 'react';

function Navbar() {
  const router = useRouter();
  const [isDarkMode, setDarkMode] = useDarkMode();
  const onClickBrand = () => router.push('/');
  const [searchInput, setSearchInput] = useState('');
  const [toggle, setToggle] = useState(false);

  const DesktopNavItem = () => (
    <div className={styles.navItem}>
      <div className={styles.links}>
        {TYPES.navbar.NAVLIST.map((navItem) => {
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
              <ThemeMode
                onClick={() => setDarkMode((prevMode) => !prevMode)}
                isDark={isDarkMode}
              />
            </div>
            <div
              className={styles.closeHam}
              onClick={() => setToggle(!toggle)}></div>
            <div className={styles.mlinks}>
              {TYPES.navbar.NAVLIST.map((navItem) => {
                return (
                  <span
                    key={navItem.id}
                    className={
                      router.pathname === navItem.path
                        ? styles.mactive
                        : undefined
                    }
                    onClick={() => setToggle(!toggle)}>
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
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.brand} onClick={onClickBrand}>
            <Image
              width={142}
              height={32}
              layout="fixed"
              src={
                isDarkMode ? TYPES.navbar.brand.WHITE : TYPES.navbar.brand.BLUE
              }
              alt="nexus logo"></Image>
            <div className={styles.explorer}>Explorer</div>
          </div>
          <DesktopNavItem />
          <MobileNavItem />
        </div>
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
    </section>
  );
}

export default Navbar;
