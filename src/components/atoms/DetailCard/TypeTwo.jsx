import styles from './DetailCard.module.scss';

export default function TypeTwo(props) {
  const {
    label = '',
    sublabel = '',
    delayTime = '',
    text = '',
    reserve = '',
    reserveLabel = '',
    reward = '',
    rewardLabel = '',
    footerLabel = '',
    footerValue = '',
  } = props;

  return (
    <>
      <div className={[styles.header, styles.two].join(' ')}>
        <span>
          {/* card name*/}
          <h3 className={styles.heading}>{label}</h3>
          {/* card sublabel */}
          <label className={styles.sublabel}>{sublabel}</label>
        </span>
        {/* delay timestamp */}
        {!!delayTime && <label className={styles.timerText}>{delayTime}</label>}
      </div>
      {/* Card body section */}
      <div className={[styles.body, styles.two].join(' ')}>
        {/* Card main value */}
        <p className={styles.bodyText}>{text}</p>
        <div className={styles.transectionBlock}>
          {/* Card bodt sub value with label */}
          <span className={styles.transectionUnit}>
            <div className={styles.transection}>{reserveLabel}</div>
            <div className={styles.transectionType}>
              {reserve}
              <div className={styles.txnIcon}>
                {/* If requried pass the props and icon will shown */}
                {/* <Image src={} alt="" /> */}
              </div>
            </div>
          </span>
          {/* Card bodt sub value with label */}
          <span className={styles.transectionUnit}>
            <div className={styles.transection}>{rewardLabel}</div>
            <div className={styles.transectionType}>
              {reward}
              <div className={styles.txnIcon}>
                {/* If requried pass the props and icon will shown */}
                {/* <Image src={} alt=""/> */}
              </div>
            </div>
          </span>
        </div>
      </div>
      {/* Card footer section */}
      <div className={[styles.footer, styles.two].join(' ')}>
        <label>{footerLabel}</label>
        <p>{footerValue}</p>
      </div>
    </>
  );
}
