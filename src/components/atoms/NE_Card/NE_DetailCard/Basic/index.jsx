import PropTypes from 'prop-types';
import styles from './Basic.module.scss';
import { Card_Watermark } from '..';

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

/* Card body section */
const Card_Body = ({ text, reserveLabel, reserve, rewardLabel, reward }) => (
  <div className={[styles.body].join(' ')}>
    {/* Card main value */}
    <p className={styles.body__value}>{text}</p>
    <div className={styles.transectionBlock}>
      {/* Card bodt sub value with label */}
      <span className={styles.transectionUnit}>
        <div className={styles.transection}>{reserveLabel}</div>
        <div className={styles.transectionType}>{reserve}</div>
      </span>
      {/* Card bodt sub value with label */}
      <span className={styles.transectionUnit}>
        <div className={styles.transection}>{rewardLabel}</div>
        <div className={styles.transectionType}>{reward}</div>
      </span>
    </div>
  </div>
);

/* Card footer section */
const Card_Footer = ({ footerLabel, footerValue }) => (
  <div className={[styles.footer].join(' ')}>
    <label className={styles.footer__label}>{footerLabel}</label>
    <p className={styles.footer__value}>{footerValue}</p>
  </div>
);

export const Basic = ({
  label = '',
  sublabel = '',
  delayTime = '',
  text = '',
  reserve = '',
  reserveLabel = '',
  reward = '',
  rewardLabel = '',
  footerLabel = '',
  footerValue = '',
  ...props
}) => {
  return (
    <section className={styles.detailcard}>
      <Card_Watermark {...props} />
      <Card_Header
        label={label}
        sublabel={sublabel}
        ticker={delayTime}
        {...props}
      />
      <Card_Body
        text={text}
        reserve={reserve}
        reserveLabel={reserveLabel}
        reward={reward}
        rewardLabel={rewardLabel}
        {...props}
      />
      <Card_Footer
        footerLabel={footerLabel}
        footerValue={footerValue}
        {...props}
      />
    </section>
  );
};

export default Basic;

Basic.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  sublabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  //   unit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  delayTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  reserve: PropTypes.string,
  reserveLabel: PropTypes.string,
  reward: PropTypes.string,
  rewardLabel: PropTypes.string,
  footerLabel: PropTypes.string,
  footerValue: PropTypes.string,
};
