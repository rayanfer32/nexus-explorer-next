import styles from './RTTable.module.scss';
import PropTypes from 'prop-types';

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
      <div className={styles.rttDataList}> {props.children} </div>
    </div>
  );
}

RTTable.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  label: PropTypes.string,
  buttonLabel: PropTypes.string,
};

export default RTTable;
