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

export { NE_DetailCard, Card_Watermark, Basic, Market };
