import styles from './SmallCard.module.scss';
// import svgLogo from "assets/icons/icon.svg"
import pngLogo from 'assets/icons/nexusblue.png';
import Image from 'next/dist/client/image';
import PropTypes from 'prop-types';

SmallCard.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  sublabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  ticker: PropTypes.any,
};

export default function SmallCard(props) {
  return (
    <div className={`${styles.smallcard}`}>
      {/* card label and sublabel */}
      <div className={styles.headerContainer}>
        <div className={styles.label}>{props.label}</div>
        <div className={styles.sublabel}>{props.sublabel}</div>
      </div>
      {/* card body value and unit */}
      <div className={styles.bodyContainer}>
        <span className={styles.bodyText}>{props.text}</span>
        <span className={styles.tickerSymbol}>{props.ticker}</span>
      </div>
      {/* nexus icon */}
      <div className={styles.icon}>
        <Image src={pngLogo} alt="icon"></Image>
      </div>
    </div>
  );
}
