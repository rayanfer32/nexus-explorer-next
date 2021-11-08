import styles from './Panel2.module.css';

import DetailCard from 'components/atoms/DetailCard';
import React, { useState, useEffect } from 'react';
import { abbreviateNumber, intlNum } from 'utils/converter';

function Panel2(props) {
  const { marketData, metricsData, miningData } = props;
  const [cardRefreshTimeout, setCardRefreshTimeout] = useState(50);

  //   useEffect(() => {
  //     const t1 = setIn(set);
  //     return () => {
  //       cleanup;
  //     };
  //   }, [input]);
  console.log(props);
  return (
    <div className={styles.panelTwoContainer}>
      <DetailCard
        type
        label="Price"
        text={`${marketData.market_data.current_price.usd.toFixed(2)} $`}
        delayTime="60s"
      />
      <DetailCard
        type
        label="Stake"
        sublabel={`Difficulty : ${miningData.stake.difficulty.toFixed(2)}`}
        text={`${intlNum(metricsData.trust.stake)} NXS`}
        reserveLabel="Height"
        reserve={`${intlNum(miningData.stake.height)}`}
        reward={`${metricsData.trust.total}`}
        rewardLabel="Total"
        footerLabel="Fees"
        footerValue={`${miningData.stake.fees.toFixed(2)} NXS`}
        delayTime="60s"
      />
      <DetailCard
        type
        label="Hash"
        sublabel={`Difficulty : ${miningData.hash.difficulty.toFixed(2)}`}
        text={`${abbreviateNumber(miningData.hash.hashes)}H/s`}
        reserveLabel="Reserve"
        reserve={`${intlNum(miningData.hash.reserve.toFixed(2))} NXS`}
        rewardLabel="Reward"
        reward={`${miningData.hash.reward.toFixed(2)} NXS`}
        footerLabel="Fees"
        footerValue={`${intlNum(miningData.hash.fees.toFixed(2))} NXS`}
        delayTime="60s"
      />
      <DetailCard
        type
        label="Prime"
        sublabel={`Difficulty : ${miningData.prime.difficulty.toFixed(2)}`}
        text={`${abbreviateNumber(miningData.prime.primes)}P/s`}
        reserveLabel="Reserve"
        reserve={`${miningData.prime.reserve.toFixed(2)} NXS`}
        rewardLabel="Reward"
        reward={`${miningData.prime.reward.toFixed(2)} NXS`}
        footerLabel="Fees"
        footerValue={`${intlNum(miningData.prime.fees.toFixed(2))} NXS`}
        delayTime="60s"
      />
    </div>
  );
}

export default Panel2;
