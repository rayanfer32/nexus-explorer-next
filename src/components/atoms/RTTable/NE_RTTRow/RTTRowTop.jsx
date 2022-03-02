import React from 'react';
import styles from './RTTRow.module.scss';

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
              {leftLabel}
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
              {rightLabel}
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
