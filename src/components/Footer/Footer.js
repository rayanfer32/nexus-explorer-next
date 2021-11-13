import styles from './Footer.module.css';
import Image from 'next/image';
import nexusLogo from 'assets/branding/NexusLogoWhite1250x225.png';
import walletLogo from 'assets/icons/wallet.png';
import appleLogo from 'assets/icons/apple.png';
import playstoreLogo from 'assets/icons/playstore.png';

function Footer() {
  const footerItems = {
    nexus: {
      href: 'https://nexus.io/',
      target: '_blank',
      label: 'Nexus.io',
      src: nexusLogo,
    },
    desktopWallet: {
      href: 'https://nexus.io/wallets',
      target: '_blank',
      label: 'Desktop Wallet',
      src: walletLogo,
    },
    playstore: {
      href: '',
      target: '_blank',
      label: 'Get it on Playstore',
      src: playstoreLogo,
    },
    appStore: {
      href: '',
      target: '_blank',
      label: 'Download from IOS store',
      src: appleLogo,
    },
    supportEmail: {
      href: 'mailto:contact@nexus.io',
      target: '_self',
      label: 'contact@nexus.io',
      src: '',
    },
  };

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
                src={walletLogo}
                alt="Wallet Logo"></Image>
              <div>{footerItems.desktopWallet.label}</div>
            </a>
          </div>

          <div>
            <a href={footerItems.appStore.href}>
              <Image
                width="32"
                height="32"
                src={appleLogo}
                alt="Apple Logo"></Image>
              <div>{footerItems.appStore.label}</div>
            </a>
          </div>

          <div>
            <a href={footerItems.playstore.href}>
              <Image
                width="32"
                height="32"
                src={playstoreLogo}
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
