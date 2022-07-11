import styles from './RTRow.module.scss';
import PropTypes from 'prop-types';

/**
 * RTTRow Component for Block/Transactions data
 *
 * @param {string} type Row type/ Channel name
 * @param {node} children React children node
 * @returns {JSX.Element}
 */
export const RTTRow = ({ children, type, animationDirection = 'left' }) => {
  const style = {
    ['--local-animation-direction']: animationDirection === 'left' ? -1 : 1,
  };
  return (
    <div className={styles.rttRow} style={style}>
      {type && <div className={styles.rttRowType}>{type}</div>}
      {children}
    </div>
  );
};

RTTRow.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  animationDirection: PropTypes.oneOf(['left', 'right']),
};
