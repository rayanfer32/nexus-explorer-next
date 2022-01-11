import styles from './RTTRowBlock.module.css';

import PropTypes from 'prop-types';

RTTRowBlock.propTypes = {
  block: PropTypes.string,
  channel: PropTypes.string,
  utc: PropTypes.string,
  date: PropTypes.string,
  mint: PropTypes.string,
  mintUnit: PropTypes.string,
  size: PropTypes.number,
  sizeUnit: PropTypes.string,
  txns: PropTypes.number,
  txnsUnit: PropTypes.string,
  type: PropTypes.string,
  timeUnit: PropTypes.string,
  link: PropTypes.string,
};

function RTTRowBlock(props) {
  const {
    block = '00',
    channel = '-',
    utc: time = '00:00:00',
    date = '00-00-0000',
    mint = '0.00',
    mintUnit = 'mint',
    size = '0',
    sizeUnit = 'size',
    txns = '0',
    txnsUnit = 'txns',
    type = 'BLOCK',
    timeUnit = 'UTC',
    link,
  } = props;

  return (
    <div className={styles.rttBlockRow}>
      <div className={styles.rttrowBlockName}>{type}</div>
      <div className={styles.rttrowBlockDetail}>
        {/* row top */}
        <div className={styles.rttBlockRowTop}>
          <div className={styles.cardTag}>
            <div className={styles.carTagName}>{channel}</div>
          </div>
        </div>
        {/* row bottom */}
        <div className={styles.rttBlockRowBottom}>
          <div className={styles.blockNumber}>
            <a href={link}>{block}</a>
          </div>
          {/* time */}
          <div className={styles.time}>
            <div className={styles.timeInUTC}>
              <span className={styles.timeUnit}>{timeUnit}</span>
              <span>{time != '00:00:0000' || time}</span>
            </div>
            <div className={styles.date}>{date}</div>
          </div>
          {/* mint section */}
          <div className={styles.mint}>
            <span className={styles.mintText}>{mint}</span>
            <div className={styles.lowerThirdText}>{mintUnit}</div>
          </div>
          {/* size of txns */}
          <div className={styles.size}>
            <span className={styles.sizeText}>{size}</span>
            <div className={styles.lowerThirdText}>{sizeUnit}</div>
          </div>
          {/* txns section */}
          <div className={styles.txns}>
            <span className={styles.txnsText}>{txns}</span>
            <div className={styles.lowerThirdText}>{txnsUnit}</div>
          </div>
        </div>
        {/* end bottom container */}
      </div>
    </div>
  );
}

export default RTTRowBlock;
