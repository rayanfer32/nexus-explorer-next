import styles from './Footer.module.css';
import Image from 'next/image';
import nexusLogo from 'assets/branding/NexusLogoWhite1250x225.png';
import walletLogo from 'assets/icons/wallet.png';
import appleLogo from 'assets/icons/apple.png';
import playstoreLogo from 'assets/icons/playstore.png';

function Footer() {
  return (
    <div className={styles.footer}>
      <section className={styles.redirectIcon}>
        <Image width={176} height={32} src={nexusLogo} alt="nexus logo"></Image>
        <a className={styles.walletLinks} href="https://nexus.io/wallets">
          <div>
            <Image
              width="32"
              height="32"
              src={walletLogo}
              alt="Wallet Logo"></Image>
            <div>Desktop Wallet</div>
          </div>

          <div>
            <Image
              width="32"
              height="32"
              src={appleLogo}
              alt="Apple Logo"></Image>
            <div>Download from IOS store</div>
          </div>

          <div>
            <Image
              width="32"
              height="32"
              src={playstoreLogo}
              alt="playstore logo"></Image>
            <div>Get it on Playstore</div>
          </div>
        </a>
      </section>
      <section className={styles.support}>
        <p>Support-Contact</p>
        <p>|</p>
        <a href="mailto:contact@nexus.io">Contact@nexus.io</a>
      </section>
    </div>
  );
}

export default Footer;
