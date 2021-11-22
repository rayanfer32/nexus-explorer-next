import styles from './Navbar.module.css';
import Image from 'next/image';
import nexusLogo from 'assets/branding/NexusLogoWhite1000x225.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeMode from 'components/atoms/ThemeMode';
import Search from 'components/atoms/SearchBar';
import { useDarkMode } from 'hooks';
import TYPES from 'types';
import { useState } from 'react';
import { useAppContext } from 'contexts/AppContext';

function Navbar() {
  const router = useRouter();
  const [isDarkMode, setDarkMode] = useDarkMode();
  const navList = TYPES.navList;
  const onClickBrand = () => router.push('/');
  const [searchInput, setSearchInput] = useState('');

  const { sharedState, setSharedState } = useAppContext();

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <div className={styles.brand} onClick={onClickBrand}>
          <Image
            width={142}
            height={32}
            layout="fixed"
            src={nexusLogo}
            alt="nexus logo"></Image>
          <div className={styles.explorer}>Explorer</div>
        </div>
        <div className={styles.navItem}>
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
            onClick={() =>
              setDarkMode((prevMode) => {
                setSharedState({
                  ...sharedState,
                  theme: prevMode ? 'light' : 'dark',
                });
                return !prevMode;
              })
            }
            isDark={isDarkMode}
          />
        </div>
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
  );
}

export default Navbar;
