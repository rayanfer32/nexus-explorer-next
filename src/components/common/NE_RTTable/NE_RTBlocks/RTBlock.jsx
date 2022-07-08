import styles from './RTBlock.module.scss';
import PropTypes from 'prop-types';
import { BlockData } from '../NE_BlockData';
import { DateTime } from '../NE_DateTime';
import { RTTRow, RTTRowTop } from '../NE_RTRow';

/**
 * RTT Table Row for Block data
 */
function RTTRowBlock(props) {
  const {
    block = '00',
    channel = '',
    time = '',
    date = '',
    timeUnit = 'UTC',
    mint = '0.00',
    mintUnit = 'mint',
    size = '0',
    sizeUnit = 'size',
    txns = '0',
    txnsUnit = 'txns',
    type = 'BLOCK',
    onClick,
  } = props;

  return (
    <RTTRow type={type}>
      <div className={styles.rttrowBlockDetail}>
        {/* row top */}
        <RTTRowTop rightLabel={channel} />
        {/* row bottom */}
        <div className={styles.rttBlockRowBottom}>
          <div title={block} className={styles.blockNumber} onClick={onClick}>
            {block}
          </div>
          {/* time */}
          <DateTime date={date} time={time} timeFormat={timeUnit} />
          {/* mint  */}
          <BlockData data={mint} dataUnit={mintUnit} />
          {/* size of txns */}
          <BlockData data={size} dataUnit={sizeUnit} />
          {/* txns */}
          <BlockData data={txns} dataUnit={txnsUnit} />
        </div>
        {/* end bottom container */}
      </div>
    </RTTRow>
    // </div>
  );
}

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
  onClick: PropTypes.func,
};

export default RTTRowBlock;
