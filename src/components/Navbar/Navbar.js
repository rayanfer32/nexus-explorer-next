import styles from './Navbar.module.css';
import Image from 'next/image';
import nexusLogo from 'assets/branding/NexusLogoWhite1000x225.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchBar from 'components/atoms/SearchBar/SearchBar';
import darkBtn from 'assets/icons/dark_mode_black_24dp.svg';
import lightBtn from 'assets/icons/light_mode_black_24dp.svg';

function Navbar() {
  const router = useRouter();
  const navList = [
    { id: 1, title: 'Home', path: '/' },
    { id: 2, title: 'Trustlist', path: '/trustlist' },
    { id: 3, title: 'Richlist', path: '/richlist' },
    { id: 4, title: 'Network', path: '/network' },
    { id: 5, title: 'About', path: '/about' },
  ];
  const onClickBrand = () => router.push('/');

  return (
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
      <div className={styles.searchBar}>
        <SearchBar />
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

        <div
          style={{ filter: 'invert(1)' }}
          onClick={() => {
            document.body.className =
              document.body.className == 'dark' ? 'light' : 'dark';
          }}>
          <Image
            width={32}
            height={32}
            layout="fixed"
            src={darkBtn}
            alt="Dark Mode Button"></Image>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
