import styles from './Navbar.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ThemeMode from 'components/atoms/ThemeMode';
import Search from 'components/atoms/SearchBar';
import { useDarkMode } from 'hooks';
import TYPES from 'types';
import { useEffect, useState } from 'react';
import SelectInput from 'components/atoms/SelectInput/SelectInput';
import { NETWORKS } from 'types/ConstantsTypes';
import { useAppContext } from 'contexts/AppContext';
import DropdownMenu from 'components/TestComponents/DropdownMenu';

/**
 * Header component for the website
 * @returns {JSX.Element}
 */
function Navbar() {
  const router = useRouter();
  const [isDarkMode, setDarkMode] = useDarkMode();
  const onClickBrand = () => router.push('/');
  const [searchInput, setSearchInput] = useState('');
  const [toggle, setToggle] = useState(false);

  const { appContext, setAppContext } = useAppContext();

  const handleNetworkChange = (e) => {
    const val = e.target.value;
    const network = NETWORKS[val.toUpperCase()];
    setAppContext('network', network);
  };

  useEffect(() => {
    document.body.classList.toggle(
      'testnet-filter',
      appContext.network.name == NETWORKS.TESTNET.name
    );
  }, [appContext.network]);

  const DesktopNavItem = () => (
    <>
      <div className={styles.navItem}>
        <nav className={styles.links}>
          <div style={{ marginRight: '1rem' }}>
            <SelectInput
              options={[NETWORKS.MAINNET.name, NETWORKS.TESTNET.name]}
              value={appContext.network.name}
              onChange={handleNetworkChange}
            />
          </div>

          {TYPES.NAVBAR.NAVLIST.map((navItem, index) => {
            return (
              <span
                key={index}
                className={
                  router.pathname === navItem.path ? styles.active : undefined
                }>
                <Link key={index} href={navItem.path}>
                  {navItem.title}
                </Link>
              </span>
            );
          })}

          {Object.entries(TYPES.NAVBAR.NAVDROPDOWN).map(([key, value]) => {
            return (
              <DropdownMenu key={key} title={key}>
                {value.map((item, index) => (
                  <Link key={index} href={item.path}>
                    {item.title}
                  </Link>
                ))}
              </DropdownMenu>
            );
          })}
        </nav>

        <ThemeMode
          onClick={() => setDarkMode((prevMode) => !prevMode)}
          isDark={isDarkMode}
        />
      </div>
    </>
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

            <nav className={styles.mlinks}>
              <SelectInput
                options={[NETWORKS.MAINNET.name, NETWORKS.TESTNET.name]}
                value={appContext.network.name}
                onChange={handleNetworkChange}
              />
              {TYPES.NAVBAR.NAVLIST.map((navItem) => {
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

              {Object.entries(TYPES.NAVBAR.NAVDROPDOWN).map(([key, value]) => {
                return (
                  <>
                    {value.map((item, index) => (
                      <span
                        key={index}
                        className={
                          router.pathname === item.path
                            ? styles.mactive
                            : undefined
                        }
                        onClick={() => setToggle(!toggle)}>
                        <Link href={item.path}>{item.title}</Link>
                      </span>
                    ))}
                  </>
                );
              })}
            </nav>
          </div>
        </section>
      )}
    </div>
  );

  return (
    <header className={styles.container}>
      <div className={styles.header}>
        <div className={styles.nav}>
          <div className={styles.brand} onClick={onClickBrand}>
            <Image
              width={142}
              height={32}
              layout="fixed"
              src={
                isDarkMode ? TYPES.NAVBAR.BRAND.WHITE : TYPES.NAVBAR.BRAND.BLUE
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
            placeholder={TYPES.PLACE_HOLDER.SEARCH}
            onSearch={() => {
              router.push(`/scan/${searchInput}`);
              setTimeout(() => setSearchInput(''), 3000);
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
