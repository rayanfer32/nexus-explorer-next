import styles from './Footer.module.css';
import Image from 'next/image';
import TYPES from 'types';
import { useDarkMode } from 'hooks';

/**
 * Footer component for the website
 * @returns {JSX.Element}
 */
function Footer() {
  const footerItems = TYPES.FOOTER_ITEMS;
  const [isDarkMode] = useDarkMode();
  return (
    <footer className={styles.container}>
      <div className={styles.footer}>
        <section className={styles.redirectIcon}>
          <a href={footerItems.NEXUS.href} target={footerItems.NEXUS.target}>
            <Image
              width={176}
              height={32}
              src={
                !isDarkMode
                  ? footerItems.NEXUS.brand.WHITE
                  : footerItems.NEXUS.brand.BLUE
              }
              alt={footerItems.NEXUS.label}
            />
          </a>
          <div className={styles.walletLinks}>
            <div>
              <a
                href={footerItems.desktopWallet.href}
                target={footerItems.desktopWallet.target}>
                <Image
                  width="32"
                  height="32"
                  src={footerItems.desktopWallet.src}
                  alt="Wallet Logo"></Image>
                <div>{footerItems.desktopWallet.label}</div>
              </a>
            </div>

            <div>
              <a
                href={footerItems.appStore.href}
                target={footerItems.appStore.target}>
                <Image
                  width="32"
                  height="32"
                  src={footerItems.appStore.src}
                  alt="Apple Logo"></Image>
                <div>{footerItems.appStore.label}</div>
              </a>
            </div>

            <div>
              <a
                href={footerItems.playstore.href}
                target={footerItems.playstore.target}>
                <Image
                  width="32"
                  height="32"
                  src={footerItems.playstore.src}
                  alt="playstore logo"></Image>
                <div>{footerItems.playstore.label}</div>
              </a>
            </div>
          </div>
        </section>
        <section className={styles.support}>
          <a href={footerItems.nexusSite.href}>Nexus.io</a>
          <p>|</p>
          <a href={footerItems.repoUrl.href}>{footerItems.repoUrl.label}</a>
          <p>|</p>
          <a href={footerItems.about.href}>{footerItems.about.label}</a>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
