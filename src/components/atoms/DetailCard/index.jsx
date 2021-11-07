import styles from './DetailCard.module.css';
import pngLogo from 'assets/icons/nexusWhite.png';
import Typeone from './TypeOne';
import TypeTwo from './TypeTwo';
import Image from 'next/image';

export default function DetailCard(props) {
  return (
    <div className={styles.detailcard}>
      <div className={styles.triangle}>
        <div className={styles.triangle1} />
        <div className={styles.triangle2} />
        <div className={styles.triangle3} />
        <div className={styles.logoIcon}>
          <Image src={pngLogo} alt="nexus logo" />
        </div>
      </div>
      {props?.type === 'secondary' || props?.type === true ? (
        <TypeTwo {...props} />
      ) : (
        <Typeone {...props} />
      )}
    </div>
  );
}
