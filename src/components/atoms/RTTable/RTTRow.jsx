import styles from './RTTRow.module.css';

function RTTRow() {
  return (
    <div className={styles.rttrow}>
      <div className={styles.rttrowTop}>
        <div className={styles.fromTag}>
          <div className={styles.tagText}>From: 8Cn2cZfdffdfddfdfddfcgUz..</div>
        </div>
        <div className={styles.toTag}>
          <div className={styles.tagText}>To: 380ure9jh9f8jf</div>
        </div>
      </div>
      <div className={styles.rttrowBottom}>
        <div className={styles.rttrowName}>CREDIT</div>
        <div className={styles.txnType}>
          Tritium Base<div className={styles.lowerThirdText}>type</div>
        </div>
        <div className={styles.txnId}>
          <div className={styles.txnIdValue}>
            fsfa0f9a.....fjifdfdfdffdfaijaofjia
          </div>
          <div className={styles.lowerThirdText}>txn_id</div>
        </div>

        <div className={styles.txnAmount}>
          3366446464646.45NXS<div className={styles.lowerThirdText}>amount</div>
        </div>
        <div className={styles.confirmations}>Confirmations: 9</div>
        <div className={styles.contracts}>Contracts: 38</div>
      </div>
    </div>
  );
}

export default RTTRow;
