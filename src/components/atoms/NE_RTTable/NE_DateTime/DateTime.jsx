import styles from './DateTime.module.scss';
import PropTypes from 'prop-types';

/**
 * Component DateTime
 *
 * @param {string} date date
 * @param {string} time time
 * @param {string} timeFormat time format (UTC, Local)
 * @returns {JSX.Element}
 */
export const DateTime = ({ date, time, timeFormat }) => {
  return (
    <div title={`${timeFormat}-${time};${date}`} className={styles.datetime}>
      <div className={styles.time}>
        <small className={styles.timeFormat}>{timeFormat}</small>
        <span>{time}</span>
      </div>
      <div className={styles.date}>{date}</div>
    </div>
  );
};

DateTime.propTypes = {
  date: PropTypes.string,
  time: PropTypes.string,
  timeUnit: PropTypes.string,
};
