import styles from './Header.module.scss';
import { useRouter } from 'next/router';
import Search from 'components/common/NE_SearchBar';
import TYPES from 'types';
import { useEffect, useRef, useState } from 'react';
import { NETWORKS } from 'types/ConstantsTypes';
import { useAppContext } from 'contexts/AppContext';
import Brand from './Brand';
import { DesktopNavbar, Hamburger, MobileMenu } from './Navbar';
import { throttle } from 'utils/common';

/**
 * Header component for the website
 * @returns {JSX.Element}
 */
const Header = () => {
  const [toggleMobileMenu, setToggle] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();
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

  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;

    const previousValue = window.pageYOffset;

    function onScroll() {
      if (window.pageYOffset > previousValue) {
        // avoid unnecessary increase in scroll offset Value
        const offsetValue =
          el.clientHeight * 2 > window.pageYOffset
            ? window.pageYOffset
            : el.clientHeight * 2;

        el.style.transform = `translateY(-${offsetValue}px)`;
      } else {
        el.style.transform = `translateY(0px)`;
      }
      previousValue = window.pageYOffset;
    }

    if (el) {
      window.addEventListener('scroll', throttle(onScroll));
    }
    return () =>
      window && window.removeEventListener('scroll', throttle(onScroll));
  }, []);

  const handleMenuToggle = () => {
    const body = document.querySelector('body');
    setToggle((prev) => {
      !prev
        ? body.setAttribute('style', 'overflow: hidden')
        : body.removeAttribute('style');
      return !prev;
    });
  };

  return (
    <>
      <header ref={headerRef} className={styles.container}>
        <div className={styles.header}>
          <div className={styles.nav}>
            <Brand
              isDarkMode={appContext.theme === TYPES.THEME.DARK}
              onClick={onClickBrand}
            />
            <DesktopNavbar
              activePathname={router.pathname}
              network={appContext.network.name}
              onNetworkChange={handleNetworkChange}
            />
            <Hamburger onClick={handleMenuToggle} />
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
      </header>
      {toggleMobileMenu && (
        <MobileMenu
          isOpen={toggleMobileMenu}
          network={appContext.network.name}
          activePathname={router.pathname}
          onNetworkChange={handleNetworkChange}
          onClose={handleMenuToggle}
          setClose={handleMenuToggle}
        />
      )}
    </>
  );
};

export default Header;
