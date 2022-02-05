import styles from './DetailCard.module.scss';

export default function Typeone(props) {
  const {
    label = '',
    sublabel = '',
    delayTime = '',
    text = '',
    textUnit = '',
  } = props;
  return (
    <>
      <div className={[styles.header, styles.one].join(' ')}>
        <span>
          <h3 className={styles.heading}>{label}</h3>
          <label className={styles.sublabel}>{sublabel}</label>
        </span>
        {delayTime && <label className={styles.timerText}>{delayTime}</label>}
      </div>
      <div className={[styles.body, styles.one].join(' ')}>
        <p className={styles.bodyText}>{text}</p>
        <label className={styles.bodyTextUnit}>{textUnit}</label>
      </div>
    </>
  );
}
