import PropTypes from 'prop-types';
import classes from '../Basic/Basic.module.scss';
import styles from './Market.module.scss';
import { Card_Watermark, Card_Header, Card_Footer, ValueUnit } from '..';
import { AiOutlineFall, AiOutlineRise } from 'react-icons/ai';
import TYPES from 'types';
import { cls } from 'utils';

const MarketIconValue = ({ label, value }) => {
  if (value)
    return (
      <span className={cls(styles.market__price)}>
        {value.match(/[-]/g) != '-' ? (
          <AiOutlineRise
            className={styles.market__price__icon}
            title={label}
            color={TYPES.COLORS.MARKET_GREEN}
          />
        ) : (
          <AiOutlineFall
            className={styles.market__price__icon}
            title={label}
            color={TYPES.COLORS.MARKET_RED}
          />
        )}
        <p
          data-state={`${value.match(/[-]/g) != '-'}`}
          className={cls(styles.market__price__value)}
          title={value}>
          {value}
        </p>
      </span>
    );
  return null;
};

const Card_Body = ({
  text,
  reserveLabel,
  reserve,
  rewardLabel,
  reward,
  unit,
}) => (
  <div className={cls(classes.body)}>
    {/* Card main value */}
    <div className={classes.body__text}>
      <ValueUnit value={'1'} unit={'NXS'} />
      <ValueUnit value={' = '} />
      <ValueUnit value={text} unit={unit} />
      {reserve && <MarketIconValue label={reserveLabel} value={reserve} />}{' '}
    </div>
    <div className={classes.txn__block}>
      <span className={classes.txn__block__type}>
        <label className={classes.txn__block__type__label} title={rewardLabel}>
          {rewardLabel}
        </label>
        <p className={classes.txn__block__type__value} title={reward}>
          {reward}
        </p>
      </span>
    </div>
  </div>
);

export const Market = ({
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
    <section className={classes.detailcard}>
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

export default Market;

Market.propTypes = {
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
