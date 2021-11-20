import styles from './RTTRow.module.css';

function RTTRow(props) {
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
    <div className={styles.rttrow}>
      <div className={styles.rttrowName}>{operation}</div>
      <div className={styles.rttrowDetail}>
        {/* row top */}
        <div className={styles.rttrowTop}>
          <div className={styles.fromTag}>
            From: <span className={styles.tagText}>{fromId}</span>
          </div>
          <div className={styles.toTag}>
            To: <span className={styles.tagText}> {toId}</span>
          </div>
        </div>
        {/* row bottom */}
        <div className={styles.rttrowBottom}>
          <div className={styles.txnType}>
            {!!txType && (
              <>
                <div className={styles.txnTypeText}>{txType}</div>
                <div className={styles.lowerThirdText}>type</div>
              </>
            )}
          </div>
          <div className={styles.txnId}>
            {!!txnId && (
              <>
                <div className={styles.txnIdValue}>{txnId}</div>
                <div className={styles.lowerThirdText}>txn_id</div>
              </>
            )}
          </div>

          <div className={styles.txnAmount}>
            {!!amount && (
              <>
                <div className={styles.txnAmountText}>
                  {amount} {amountUnit}
                </div>
                <div className={styles.lowerThirdText}>amount</div>
              </>
            )}
          </div>
          <div className={styles.confirmations}>
            Confirmations: {confirmations}
          </div>
          <div className={styles.contracts}>Contracts: {contracts}</div>
        </div>
      </div>
    </div>
  );
}

export default RTTRow;
