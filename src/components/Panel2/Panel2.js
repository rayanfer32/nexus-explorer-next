import styles from './Panel2.module.css';

import DetailCard from 'components/atoms/DetailCard';
import React from 'react';

function Panel2() {
  return (
    <div className={styles.panelTwoContainer}>
      <DetailCard />
      <DetailCard />
      <DetailCard type />
      <DetailCard type />
    </div>
  );
}

export default Panel2;
