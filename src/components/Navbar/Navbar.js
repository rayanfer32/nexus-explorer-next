import styles from "./Navbar.module.css";
import Image from "next/image";
import nexusLogo from "../../assets/icons/NexuslogoBlue1000.png";
import Link from 'next/link'

function Navbar() {
  return (
    <div className={styles.nav}>
      <div className={styles.brand}>
        <Image width={145} height={32} layout="fixed" src={nexusLogo}></Image>
        <div className={styles.explorer}>Explorer</div>
      </div>
      <div className={styles.links}>
          <Link href="/">Home</Link>
          <Link href="/trustlist">Trustlist</Link>
          <Link href="/richlist">Richlist</Link>
          <Link href="/network">Network</Link>
          <Link href="/about">About</Link>
      </div>
    </div>
  );
}

export default Navbar;
