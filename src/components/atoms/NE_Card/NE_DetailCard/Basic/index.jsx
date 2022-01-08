import Card from '../..';
import Image from 'next/image';
import PropTypes from 'prop-types';
import classes from '../DetailCard.module.scss';
import styles from './Basic.module.scss';
import ASSESTS from 'assets';

export const Card_Header = ({ label = '', sublabel = '', ticker = '' }) => (
  <div className={styles.card_header}></div>
);
export const Card_Body_Title = ({ title = '', unit = '' }) => (
  <div className={styles.card_body}>
    <p>{title}</p>
    <label>{unit}</label>
  </div>
);

export const Basic = ({ ...props }) => {
  return (
    <section className={styles['basic']}>
      <div className={styles.imgBg}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Card_Header label="label" sublabel="sublabel" ticker="ticker" />
          </div>
          <div className={styles.body}>
            <Card_Body_Title title="title" unit="unit" />
          </div>
        </div>
      </div>
    </section>
  );
};

Basic.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  sublabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ticker: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
