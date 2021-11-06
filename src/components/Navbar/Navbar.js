import styles from './Navbar.module.css';
import Image from 'next/image';
import nexusLogo from '../../assets/branding/NexusLogoWhite1000x225.png';
import Link from 'next/link';
import SearchBar from '../../components/atoms/SearchBar';

function Navbar() {
  return (
    <div className={styles.nav}>
      <div className={styles.brand}>
        <Image
          width={145}
          height={32}
          layout="fixed"
          alt="nexus logo"
          src={nexusLogo}></Image>
        <div className={styles.explorer}>Explorer</div>
      </div>
      <div className={styles.spacing}></div>
      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/trustlist">Trustlist</Link>
        <Link href="/richlist">Richlist</Link>
        <Link href="/network">Network</Link>
        <Link href="/about">About</Link>
      </div>
      <SearchBar />
    </div>
  );
}

export default Navbar;
