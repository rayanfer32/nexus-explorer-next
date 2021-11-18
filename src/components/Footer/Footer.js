import styles from './Footer.module.css';
import Image from 'next/image';
import TYPES from 'types';

function Footer() {
  const footerItems = TYPES.footerItems;

  return (
    <div className={styles.footer}>
      <section className={styles.redirectIcon}>
        <a href={footerItems.nexus.href} target={footerItems.nexus.target}>
          <Image
            width={176}
            height={32}
            src={footerItems.nexus.src}
            alt={footerItems.nexus.label}
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
        <p>Support - Contact</p>
        <p>|</p>
        <a href={footerItems.supportEmail.href}>
          {footerItems.supportEmail.label}
        </a>
      </section>
    </div>
  );
}

export default Footer;
