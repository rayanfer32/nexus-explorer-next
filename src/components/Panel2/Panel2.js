import styles from './Panel2.module.css';

import DetailCard from 'components/atoms/DetailCard';
import React, { useState, useEffect } from 'react';
import { abbreviateNumber, intlNum } from 'utils/converter';
import Rail from 'components/atoms/Rail';
import { useQuery } from 'react-query';

function Panel2(props) {
  const { metricsRQ, infoRQ, marketRQ, miningRQ } = props;

  if (marketRQ.isLoading) return <p>Loading...</p>;
  if (marketRQ.isError) return <p>Error...</p>;
  if (marketRQ.data) {
    // console.log(marketRQ.data);
    return <pre>{JSON.stringify(marketRQ.data.data.result, null, 2)}</pre>;
  }
  if (marketRQ.error) {
    // console.log(marketRQ.error);
    return <pre>{JSON.stringify(marketRQ.error, null, 2)}</pre>;
  }

  return (
    <Rail className={styles.panelTwoContainer} scrollSpeed={1.8}>
      <DetailCard
        type
        label="Price"
        sublabel={`${marketData?.market_data.current_price.btc} BTC`}
        text={`${marketData?.market_data.current_price.usd.toFixed(2)} $`}
        reserveLabel="Change 24h"
        reserve={`${marketData?.market_data.price_change_percentage_24h} %`}
        rewardLabel="Total Volume"
        reward={`${intlNum(marketData?.market_data.total_volume.usd)} $`}
        footerLabel="Market Cap:"
        footerValue={`${intlNum(marketData?.market_data.market_cap.usd)} $`}
        delayTime={`${cardRefreshTimeout}s`}
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
        footerValue={`${intlNum(miningData.stake.fees.toFixed(2))} NXS`}
        delayTime={`${cardRefreshTimeout}s`}
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
        delayTime={`${cardRefreshTimeout}s`}
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
        delayTime={`${cardRefreshTimeout}s`}
      />
    </Rail>
  );
}

export default Panel2;
