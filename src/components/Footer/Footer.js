import styles from './Footer.module.css';
import Image from 'next/image';
import nexusLogo from '../../assets/branding/NexusLogoWhite1250x225.png';
import walletLogo from '../../assets/icons/wallet.png';
import appleLogo from '../../assets/icons/apple.png';
import playstoreLogo from '../../assets/icons/playstore.png';

function Footer() {
  return (
    <div className={styles.footer}>
      <section>
        <Image width={220} height={40} src={nexusLogo} alt="nexus logo"></Image>
        <div className={styles.walletLinks}>
          <div>
            <Image
              width="48"
              height="48"
              src={walletLogo}
              alt="Wallet Logo"></Image>
            <div>Desktop Wallet</div>
          </div>

          <div>
            <Image
              width="48"
              height="48"
              src={appleLogo}
              alt="Apple Logo"></Image>
            <div>Download from IOS store</div>
          </div>

          <div>
            <Image
              width="48"
              height="48"
              src={playstoreLogo}
              alt="playstore logo"></Image>
            <div>Get it on Playstore</div>
          </div>
        </div>
      </section>
      <section>
        <p>
          Support Contact | <span>contact@nexus.io</span>
        </p>
      </section>
    </div>
  );
}

export default Footer;
