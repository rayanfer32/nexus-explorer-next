import styles from './Header.module.scss';
import { useRouter } from 'next/router';
import Search from 'components/atoms/SearchBar';
import { useDarkMode } from 'hooks';
import TYPES from 'types';
import { useEffect, useState } from 'react';
import { NETWORKS } from 'types/ConstantsTypes';
import { useAppContext } from 'contexts/AppContext';
import Brand from './Brand';
import { DesktopNavbar, Hamburger, MobileMenu } from './Navbar';

/**
 * Header component for the website
 * @returns {JSX.Element}
 */
const Header = () => {
  const [toggleMobileMenu, setToggle] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();
  const [isDarkMode, setDarkMode] = useDarkMode();
  const { appContext, setAppContext } = useAppContext();

  const onClickBrand = () => router.push('/');

  const handleNetworkChange = (e) => {
    const val = e.target.value;
    const network = NETWORKS[val.toUpperCase()];
    setAppContext('network', network);
  };

  useEffect(() => {
    // Toggle class to body to change theme mode depending on network
    document.body.classList.toggle(
      'testnet-filter',
      appContext.network.name == NETWORKS.TESTNET.name
    );
  }, [appContext.network]);

  return (
    <>
      <header className={styles.container}>
        <div className={styles.header}>
          <div className={styles.nav}>
            <Brand isDarkMode={isDarkMode} onClick={onClickBrand} />
            <DesktopNavbar
              isDark={isDarkMode}
              activePathname={router.pathname}
              network={appContext.network.name}
              onNetworkChange={handleNetworkChange}
              onThemeChange={() => setDarkMode((prevMode) => !prevMode)}
            />
            <Hamburger onClick={() => setToggle(!toggleMobileMenu)} />
          </div>
          <div className={styles.searchBar}>
            <Search
              long
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={TYPES.PLACE_HOLDER.SEARCH}
              onSearch={() => {
                router.push(`/scan/${searchInput}`);
                setTimeout(() => setSearchInput(''), 3000);
              }}
            />
          </div>
        </div>
        {toggleMobileMenu && (
          <MobileMenu
            isOpen={toggleMobileMenu}
            isDark={isDarkMode}
            network={appContext.network.name}
            activePathname={router.pathname}
            onThemeChange={() => setDarkMode((prevMode) => !prevMode)}
            onNetworkChange={handleNetworkChange}
            onClose={() => setToggle(!toggleMobileMenu)}
            setClose={setToggle}
          />
        )}
      </header>
    </>
  );
};

export default Header;
