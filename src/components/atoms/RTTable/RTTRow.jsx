import styles from './RTTRow.module.css';

function RTTRow(props) {
  const {
    fromId,
    toId,
    txnId,
    operation,
    txType,
    amount,
    confirmations,
    contracts,
  } = props;

  return (
    <div className={styles.rttrow}>
      <div className={styles.rttrowTop}>
        <div className={styles.fromTag}>
          <div className={styles.tagText}>From:{fromId}</div>
        </div>
        <div className={styles.toTag}>
          <div className={styles.tagText}>To: {toId}</div>
        </div>
      </div>
      <div className={styles.rttrowBottom}>
        <div className={styles.rttrowName}>{operation}</div>
        <div className={styles.txnType}>
          {txType}
          <div className={styles.lowerThirdText}>type</div>
        </div>
        <div className={styles.txnId}>
          <div className={styles.txnIdValue}>{txnId}</div>
          <div className={styles.lowerThirdText}>txn_id</div>
        </div>

        <div className={styles.txnAmount}>
          {amount} NXS<div className={styles.lowerThirdText}>amount</div>
        </div>
        <div className={styles.confirmations}>
          Confirmations: {confirmations}
        </div>
        <div className={styles.contracts}>Contracts: {contracts}</div>
      </div>
    </div>
  );
}

export default RTTRow;
