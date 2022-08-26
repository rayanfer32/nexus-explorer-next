import styles from './RTTransaction.module.scss';
import { middleElipsis } from 'utils/converter';
import PropTypes from 'prop-types';
import { BlockData } from '../NE_BlockData';
import { RTTRow, RTTRowTop } from '../NE_RTRow';
import PushLink from 'components/common/NE_Link';

/**
 * RTT Table Row for Transaction data
 */
function RTTransaction(props) {
  const {
    fromId = '',
    toId = '',
    txnId = '',
    operation = '',
    txType = '',
    amount = '',
    amountUnit = 'NXS',
    confirmations = '',
    contracts = '',
  } = props;

  return (
    <RTTRow type={operation} animationDirection={'right'}>
      <div className={styles.rttrowDetail}>
        {/* row top */}
        <RTTRowTop
          leftLabel={fromId && `From: ${fromId}`}
          rightLabel={toId && `To: ${toId}`}
        />
        {/* row bottom */}
        <div className={styles.rttrowBottom}>
          <BlockData data={`${txType}`} dataUnit={'type'} />
          <PushLink
            href={`/scan/${txnId}`}
            className={styles.amountValue}
            title={`${amount || 0} ${amountUnit}`}>{`${
            amount || 0
          } ${amountUnit}`}</PushLink>
          <BlockData
            href={`/scan/${txnId}`}
            data={`${middleElipsis(txnId, 10)}`}
            dataUnit="txid"
          />
        </div>
        <div className={styles.tertiaryData}>
          <span
            className={styles.dataValue}
            title={`Confirmations: ${confirmations}`}>
            Confirmations: {confirmations}
          </span>
          <span className={styles.dataValue} title={`Contracts: ${contracts}`}>
            Contracts: {contracts}
          </span>
        </div>
      </div>
    </RTTRow>
  );
}

RTTransaction.propTypes = {
  fromId: PropTypes.string,
  toId: PropTypes.string,
  txnId: PropTypes.string,
  operation: PropTypes.string,
  txType: PropTypes.string,
  amount: PropTypes.string,
  amountUnit: PropTypes.string,
  confirmations: PropTypes.number,
  contracts: PropTypes.number,
};

export default RTTransaction;
