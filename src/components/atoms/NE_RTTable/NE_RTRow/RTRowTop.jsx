import React from 'react';
import { middleElipsis } from 'utils';
import styles from './RTRow.module.scss';
import PropTypes from 'prop-types';

/**
 * RTTableRowTop component is used to render the top row of the RTTable.
 */
export const RTTRowTop = ({
  title,
  leftLabel,
  rightLabel,
  leftIcon,
  rightIcon,
}) => {
  return (
    <div className={styles.rttRowTop}>
      <div className={styles.rttRowTop__Left}>
        {leftLabel && (
          <div className={styles.rttRowTop__Left__Tag}>
            {leftIcon && (
              <div className={styles.rttRowTop__Left__Tag__Icon}>
                {leftIcon}
              </div>
            )}
            <div
              className={styles.rttRowTop__Left__Tag__Label}
              title={leftLabel}>
              {middleElipsis(leftLabel, 10)}
            </div>
          </div>
        )}
      </div>

      <label className={styles.rttRowTop__Center} title={title}>
        {title}
      </label>

      <div className={styles.rttRowTop__Right}>
        {rightLabel && (
          <div className={styles.rttRowTop__Right__Tag}>
            <div
              className={styles.rttRowTop__Right__Tag__Label}
              title={rightLabel}>
              {middleElipsis(rightLabel, 10)}
            </div>
            {rightIcon && (
              <div className={styles.rttRowTop__Right__Tag__Icon}>
                {rightIcon}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

RTTRowTop.propTypes = {
  title: PropTypes.string,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
};
