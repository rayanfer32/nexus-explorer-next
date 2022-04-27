import { Basic } from './Basic';
import { Market } from './Market';
import Image from 'next/image';
import pngLogo from 'assets/icons/nexusWhite.png';
import styles from './DetailCard.module.scss';

const NE_DetailCard = ({ type, ...props }) => {
  if (type === 'market') return <Market {...props} />;
  if (type === 'basic') return <Basic {...props} />;
  return <Basic {...props} />;
};

const Card_Watermark = ({ logo = pngLogo, icon }) => (
  <div className={styles.triangle__container}>
    <div className={styles.triangle__one} />
    <div className={styles.triangle__two} />
    <div className={styles.triangle__three} />
    <div className={styles.triangle__icon}>
      {icon || <Image src={logo} alt="nexus logo" layout="fill" />}
    </div>
  </div>
);

/* Card Header section */
const Card_Header = ({ label, sublabel, ticker }) => (
  <div className={[styles.header].join(' ')}>
    <span className={styles.label__container}>
      {/* card name*/}
      <h3 className={styles.label__title}>{label}</h3>
      {/* card sublabel */}
      <label className={styles.label__sub}>{sublabel}</label>
    </span>
    {/* delay timestamp/ticker */}
    {!!ticker && <label className={styles.ticker}>{ticker}</label>}
  </div>
);

/* Card footer section */
const Card_Footer = ({ footerLabel, footerValue }) => (
  <div className={[styles.footer].join(' ')}>
    <label className={styles.footer__label}>{footerLabel}</label>
    <p className={styles.footer__value}>{footerValue}</p>
  </div>
);

export default NE_DetailCard;

export {
  NE_DetailCard,
  Card_Watermark,
  Card_Header,
  Card_Footer,
  Basic,
  Market,
};
