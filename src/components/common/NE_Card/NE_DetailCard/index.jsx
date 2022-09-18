import { Basic } from './Basic';
import { Market } from './Market';
import { Nexus_SVG_Icon } from 'assets/icons';
import styles from './DetailCard.module.scss';
import TYPES from 'types';
import { cls } from 'utils';

const NE_DetailCard = ({ type, ...props }) => {
  if (type === 'market') return <Market {...props} />;
  if (type === 'basic') return <Basic {...props} />;
  return <Basic {...props} />;
};

const Card_Watermark = ({ icon }) => (
  <div className={styles.triangle__container}>
    <div className={styles.triangle__one} />
    <div className={styles.triangle__two} />
    <div className={styles.triangle__three} />
    <div className={styles.triangle__icon}>
      {icon || (
        <Nexus_SVG_Icon
          fill={TYPES.COLORS.TRANSPARENT}
          color={TYPES.COLORS.WHITE}
        />
      )}
    </div>
  </div>
);

/* Card Header section */
const Card_Header = ({ label, sublabel, ticker }) => (
  <div className={cls(styles.header)}>
    <span className={styles.label__container}>
      {/* card name*/}
      <h3 className={styles.label__title}>{label}</h3>
      {/* card sublabel */}
      <label className={styles.label__sub}>{sublabel}</label>
    </span>
    {/* delay timestamp/ticker */}
    {!!ticker && <label className={styles.ticker} data-ticker={ticker}></label>}
  </div>
);

/* Card footer section */
const Card_Footer = ({ footerLabel, footerValue }) => (
  <div className={cls(styles.footer)}>
    <label className={styles.footer__label}>{footerLabel}</label>
    <p className={styles.footer__value}>{footerValue}</p>
  </div>
);

const ValueUnit = ({ value, unit }) => (
  <span className={styles.value__unit} title={`${value}${unit}`}>
    <p className={styles.value}>{value}</p>
    <sub className={styles.unit}>{unit}</sub>
  </span>
);

export default NE_DetailCard;

export {
  NE_DetailCard,
  Card_Watermark,
  Card_Header,
  Card_Footer,
  Basic,
  Market,
  ValueUnit,
};
