import PropTypes from 'prop-types';
import styles from './Basic.module.scss';
import { Card_Watermark, Card_Header, Card_Footer, ValueUnit } from '..';
import { cls } from 'utils';

/* Card body section */
const Card_Body = ({
  text,
  reserveLabel,
  reserve,
  rewardLabel,
  reward,
  unit,
}) => (
  <div className={cls(styles.body)}>
    {/* Card main value */}
    <div className={styles.body__text}>
      <ValueUnit value={text} unit={unit} />
    </div>
    <div className={styles.txn__block}>
      <span className={styles.txn__block__type}>
        <label className={styles.txn__block__type__label} title={reserveLabel}>
          {reserveLabel}
        </label>
        <p className={styles.txn__block__type__value} title={reserve}>
          {reserve}
        </p>
      </span>
      <span className={styles.txn__block__type}>
        <label className={styles.txn__block__type__label} title={rewardLabel}>
          {rewardLabel}
        </label>
        <p className={styles.txn__block__type__value} title={reward}>
          {reward}
        </p>
      </span>
    </div>
  </div>
);

export const Basic = ({
  label = '',
  sublabel = '',
  delayTime = '',
  text = '',
  unit = '',
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
        unit={unit}
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
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  delayTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  reserve: PropTypes.string,
  reserveLabel: PropTypes.string,
  reward: PropTypes.string,
  rewardLabel: PropTypes.string,
  footerLabel: PropTypes.string,
  footerValue: PropTypes.string,
  icon: PropTypes.element,
};
