import styles from './RTTRowBlock.module.css';

function RTTRowBlock(props) {
  const { block, channel, utc, date, mint, size, txns } = props;
  return (
    <div className={styles.container}>
      <div className={styles.cardType}>BLOCK</div>
      <div className={styles.cardTag}>
        <div className={styles.carTagName}>{channel}</div>
      </div>
      <div className={styles.dataCotainer}>
        <div className={styles.blockNumber}>{block}</div>
        <div className={styles.time}>
          <div className={styles.timeInUTC}>
            <span className={styles.timeUnit}>UTC</span>
            <span>{utc}</span>
          </div>
          <div className={styles.date}>{date}</div>
        </div>
        <div className={styles.mint}>
          <span>{mint}</span>
          <div className={styles.labelUnit}>mint</div>
        </div>
        <div className={styles.size}>
          <span>{size}</span>
          <div className={styles.labelUnit}>size</div>
        </div>
        <div className={styles.txns}>
          <span>{txns}</span>
          <div className={styles.labelUnit}>txns</div>
        </div>
      </div>
    </div>
  );
}

export default RTTRowBlock;
