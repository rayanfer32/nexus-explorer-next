import styles from './Panel2.module.css';

import DetailCard from 'components/atoms/DetailCard';
import React, { useState, useEffect } from 'react';
import { abbreviateNumber, intlNum } from 'utils/converter';
import Rail from 'components/atoms/Rail';
import Shimmer from 'components/atoms/NE_Shimmer';
// import { useQuery } from 'react-query';
import { GiTwoCoins } from 'react-icons/gi';
import { BsFillCpuFill } from 'react-icons/bs';
import { AiFillBank } from 'react-icons/ai';
import { MdSpeed } from 'react-icons/md';
import { StringsTypes } from 'types/StringsTypes';
import { ConstantsTypes, NETWORKS } from 'types/ConstantsTypes';
import { useNetwork } from 'hooks/useNetwork/useNetwork';

function Panel2(props) {
  const { network } = useNetwork();
  const { metricsRQ, infoRQ, marketRQ, miningRQ } = props;

  const [state, setState] = useState({});

  const [cardRefreshTimeout, setCardRefreshTimeout] = useState(
    ConstantsTypes.REFETCH_INTERVALS.MINING / 1000
  );

  // * initialize state when RQ has data
  useEffect(() => {
    if (marketRQ.data) {
      setState((prev) => ({
        ...prev,
        price: {
          sublabel: marketRQ.data.data.market_data.current_price.btc,
          text: marketRQ.data.data?.market_data.current_price.usd.toFixed(2),
          reserve: marketRQ.data.data?.market_data.price_change_percentage_24h,
          reward: marketRQ.data.data?.market_data.total_volume.usd,
          footer: marketRQ.data.data?.market_data.market_cap.usd,
        },
      }));
    }

    if (miningRQ.data) {
      setState((prev) => ({
        ...prev,
        stake: {
          ...prev.stake,
          sublabel: miningRQ.data.data.result.stake.difficulty.toFixed(2),
          reserve: miningRQ.data.data.result.stake.height,
          footer: miningRQ.data.data.result.stake.fees.toFixed(2),
        },
      }));
    }

    if (metricsRQ.data) {
      setState((prev) => ({
        ...prev,
        stake: {
          ...prev.stake,
          text: metricsRQ.data.data.result.trust.stake,
          reward: metricsRQ.data.data.result.trust.total,
        },
      }));
    }

    if (miningRQ.data) {
      setState((prev) => ({
        ...prev,
        hash: {
          sublabel: miningRQ.data.data.result.hash.difficulty.toFixed(2),
          text: miningRQ.data.data.result.hash.hashes,
          reserve: miningRQ.data.data.result.hash.reserve.toFixed(2),
          reward: miningRQ.data.data.result.hash.reward.toFixed(2),
          footer: miningRQ.data.data.result.hash.fees.toFixed(2),
        },
      }));
    }

    if (miningRQ.data) {
      setState((prev) => ({
        ...prev,
        prime: {
          sublabel: miningRQ.data.data.result.prime.difficulty.toFixed(2),
          text: miningRQ.data.data.result.prime.primes,
          reserve: miningRQ.data.data.result.prime.reserve.toFixed(2),
          reward: miningRQ.data.data.result.prime.reward.toFixed(2),
          footer: miningRQ.data.data.result.prime.fees.toFixed(2),
        },
      }));
    }
  }, [marketRQ.data, miningRQ.data, metricsRQ.data]);

  // reset card refresh timeout when RQ gets updated
  useEffect(() => {
    if (metricsRQ.data) {
      setCardRefreshTimeout(ConstantsTypes.REFETCH_INTERVALS.MINING / 1000);
    }
  }, [metricsRQ.data]);

  // increment the card timeout evry second
  useEffect(() => {
    const interval = setInterval(() => {
      setCardRefreshTimeout((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  //  * majority of data is coming from metricsRQ , hence we use loader state of metrics for this panel
  if (miningRQ.isLoading)
    return (
      <Rail className={styles.panelTwoContainer}>
        {[...'four'].map((_, idx) => (
          <Shimmer key={idx} minWidth="17.5rem" height="10.75rem" />
        ))}
      </Rail>
    );

  if (marketRQ.isError) return <p>Error...</p>;

  if (marketRQ.error) {
    // console.log(marketRQ.error);
    return <pre>{JSON.stringify(marketRQ.error, null, 2)}</pre>;
  }

  return (
    <Rail className={styles.panelTwoContainer} scrollSpeed={1.8}>
      {network.name === NETWORKS.MAINNET.name && (
        <DetailCard
          type
          icon={<GiTwoCoins color="white" size="2.25rem" />}
          label="Price"
          sublabel={`${state.price?.sublabel} BTC`}
          text={`${state.price?.text} $`}
          reserveLabel="Change 24h"
          reserve={`${state.price?.reserve} %`}
          rewardLabel="Total Volume"
          reward={`${intlNum(state.price?.reward)} $`}
          footerLabel="Market Cap:"
          footerValue={`${intlNum(state.price?.footer)} $`}
          delayTime={`${cardRefreshTimeout}s`}
        />
      )}
      <DetailCard
        type
        icon={<AiFillBank color="white" size="2.25rem" />}
        label={StringsTypes.CHANNELS[0]}
        sublabel={`Difficulty : ${state.stake?.sublabel}`}
        text={`${intlNum(state.stake?.text)} NXS`}
        reserveLabel="Height"
        reserve={`${intlNum(state.stake?.reserve)}`}
        reward={`${state.stake?.reward}`}
        rewardLabel="Total"
        footerLabel="Fees"
        footerValue={`${intlNum(state.stake?.footer)} NXS`}
        delayTime={`${cardRefreshTimeout}s`}
      />

      <DetailCard
        type
        icon={<BsFillCpuFill color="white" size="2.25rem" />}
        label={StringsTypes.CHANNELS[1]}
        sublabel={`Difficulty : ${state.prime?.sublabel}`}
        text={`${abbreviateNumber(state.prime?.text)}P/s`}
        reserveLabel="Reserve"
        reserve={`${state.prime?.reserve} NXS`}
        rewardLabel="Reward"
        reward={`${state.prime?.reward} NXS`}
        footerLabel="Fees"
        footerValue={`${intlNum(state.prime?.footer)} NXS`}
        delayTime={`${cardRefreshTimeout}s`}
      />
      <DetailCard
        type
        icon={<MdSpeed color="white" size="2.5rem" />}
        label={StringsTypes.CHANNELS[2]}
        sublabel={`Difficulty : ${state.hash?.sublabel}`}
        text={`${abbreviateNumber(state.hash?.text)}H/s`}
        reserveLabel="Reserve"
        reserve={`${intlNum(state.hash?.reserve)} NXS`}
        rewardLabel="Reward"
        reward={`${state.hash?.reward} NXS`}
        footerLabel="Fees"
        footerValue={`${intlNum(state.hash?.footer)} NXS`}
        delayTime={`${cardRefreshTimeout}s`}
      />
    </Rail>
  );
}

export default Panel2;
