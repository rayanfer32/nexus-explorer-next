import styles from './RTTRowBlock.module.css';

function RTTRowBlock() {
  return (
    <div className={styles.container}>
      <div className={styles.cardType}>Block</div>
      <div className={styles.cardTag}>
        <div className={styles.carTagName}>Channel: Stake</div>
      </div>
      <div className={styles.dataCotainer}>
        <div className={styles.blockNumber}>123456754545890</div>
        <div className={styles.time}>
          <div className={styles.timeInUTC}>
            <span className={styles.timeUnit}>UTC</span>
            <span>10:26:69</span>
          </div>
          <div className={styles.date}>2021-10-21</div>
        </div>
        <div className={styles.mint}>
          <span>2.2654656535412354</span>
          <div className={styles.labelUnit}>mint</div>
        </div>
        <div className={styles.size}>
          <span>1410414155656546546</span>
          <div className={styles.labelUnit}>size</div>
        </div>
        <div className={styles.txns}>
          <span>1414142420542</span>
          <div className={styles.labelUnit}>txns</div>
        </div>
      </div>
    </div>
  );
}

export default RTTRowBlock;
