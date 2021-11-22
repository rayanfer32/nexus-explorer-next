import styles from './RTTable.module.css';

function RTTable(props) {
  const { label = 'Latest Blocks', buttonLabel: btnTxt = 'View All' } = props;
  return (
    <div className={styles.rttable}>
      <div className={styles.header}>
        <div className={styles.label}>{label}</div>
        <button className={styles.button} onClick={props?.onClick}>
          {btnTxt}
        </button>
      </div>
      <div className={styles.rttDataList}>{props.children}</div>
    </div>
  );
}

export default RTTable;
