import styles from './DetailCard.module.scss';
import pngLogo from 'assets/icons/nexusWhite.png';
import Typeone from './TypeOne';
import TypeTwo from './TypeTwo';
import Image from 'next/image';

import PropTypes from 'prop-types';

DetailCard.propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label: PropTypes.string,
  sublabel: PropTypes.string,
  delayTime: PropTypes.string,
  text: PropTypes.string,
  reserve: PropTypes.string,
  reserveLabel: PropTypes.string,
  reward: PropTypes.string,
  rewardLabel: PropTypes.string,
  footerLabel: PropTypes.string,
  footerValue: PropTypes.string,
};

export default function DetailCard(props) {
  return (
    <div className={styles.detailcard}>
      <div className={styles.triangle}>
        <div className={styles.triangle1} />
        <div className={styles.triangle2} />
        <div className={styles.triangle3} />
        <div className={styles.logoIcon}>
          {props.icon || <Image src={pngLogo} alt="nexus logo" />}
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
