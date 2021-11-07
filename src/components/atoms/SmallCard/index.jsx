import styles from './SmallCard.module.css';
// import svgLogo from "assets/icons/icon.svg"
import pngLogo from 'assets/icons/nexusblue.png';
import Image from 'next/dist/client/image';

export default function SmallCard(props) {
  // let theme = props.dark? "dark" : "light"
  return (
    <div>
      <div className={`${styles.smallcard}`}>
        <div className={styles.headerContainer}>
          <div className={styles.label}>{props.label}</div>
          <div className={styles.sublabel}>{props.sublabel}</div>
        </div>
        <div className={styles.bodyContainer}>
          <span className={styles.bodyText}>{props.text}</span>
          <span className={styles.tickerSymbol}>{props.ticker}</span>
        </div>
        <div className={styles.icon}>
          <Image src={pngLogo} alt="icon"></Image>
        </div>
      </div>
    </div>
  );
}
