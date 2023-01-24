import styles from './Panel2.module.scss';

import DetailCard from 'components/common/NE_Card';
import React, { useState, useEffect } from 'react';
import { abbreviateNumber, intlNum } from 'utils/converter';
import { GiTwoCoins } from 'react-icons/gi';
import { BsFillCpuFill } from 'react-icons/bs';
import { AiFillBank } from 'react-icons/ai';
import { MdSpeed } from 'react-icons/md';
import { StringsTypes } from 'types/StringsTypes';
import { ConstantsTypes, NETWORKS } from 'types/ConstantsTypes';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import ErrorCard from 'components/common/NE_ErrorCard';

function Panel2(props) {
  const { network } = useNetwork();
  const { metricsRQ, marketRQ, miningRQ } = props;

  const [state, setState] = useState({});

  const [cardRefreshTimeout, setCardRefreshTimeout] = useState(
    ConstantsTypes.REFETCH_INTERVALS.MINING / 1000
  );

  const marketData = marketRQ.data?.data?.market_data;
  const miningData = miningRQ.data?.data?.result;
  const metricsData = metricsRQ.data?.data?.result;
  // * initialize state when RQ has data
  useEffect(() => {
    if (marketRQ.data) {
      setState((prev) => ({
        ...prev,
        price: {
          sublabel: marketData?.current_price.btc,
          text: marketData?.current_price.usd,
          reserve: marketData?.price_change_percentage_24h.toFixed(2),
          reward: marketData?.total_volume.usd,
          footer: (
            marketData?.current_price.usd * miningData?.supply.total
          ).toFixed(2),
        },
      }));
    }

    if (miningRQ.data) {
      setState((prev) => ({
        ...prev,
        stake: {
          ...prev.stake,
          sublabel: miningData?.stake.difficulty.toFixed(2),
          reserve: miningData?.stake.height,
          footer: miningData?.stake.fees.toFixed(2),
        },
      }));
    }

    if (metricsRQ.data) {
      setState((prev) => ({
        ...prev,
        stake: {
          ...prev.stake,
          text: metricsData.trust.stake,
          reward: metricsData.trust.total,
        },
      }));
    }

    if (miningRQ.data) {
      const miningData = miningRQ.data.data.result;
      setState((prev) => ({
        ...prev,
        hash: {
          sublabel: miningData.hash.difficulty.toFixed(2),
          text: miningData.hash.hashes,
          reserve: miningData.hash.reserve.toFixed(2),
          reward: miningData.hash.reward.toFixed(2),
          footer: miningData.hash.fees.toFixed(2),
        },
      }));
    }

    if (miningRQ.data) {
      setState((prev) => ({
        ...prev,
        prime: {
          sublabel: miningData.prime.difficulty.toFixed(2),
          text: miningData.prime.primes,
          reserve: miningData.prime.reserve.toFixed(2),
          reward: miningData.prime.reward.toFixed(2),
          footer: miningData.prime.fees.toFixed(2),
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
      setCardRefreshTimeout((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (marketRQ.isError)
    return (
      <p>
        <ErrorCard />
      </p>
    );

  return (
    <section className={styles.panelTwoContainer}>
      {network.name === NETWORKS.MAINNET.name && (
        <DetailCard
          type="market"
          icon={<GiTwoCoins color="white" size="2.25rem" />}
          label="Price"
          sublabel={`${state.price?.sublabel} BTC`}
          text={`${state.price?.text}`}
          unit={'$'}
          reserveLabel="Change 24h"
          reserve={`${state.price?.reserve} %`}
          rewardLabel="Total Volume"
          reward={`${intlNum(state.price?.reward)} $`}
          footerLabel="Market Cap "
          footerValue={`${intlNum(state.price?.footer)} $`}
          delayTime={`${cardRefreshTimeout}s`}
          isLoading={marketData.isLoading || !state.price?.text}
        />
      )}
      <DetailCard
        type="basic"
        icon={<AiFillBank color="white" size="2.25rem" />}
        label={StringsTypes.CHANNELS[0]}
        sublabel={`Difficulty : ${state.stake?.sublabel}`}
        text={`${intlNum(state.stake?.text)}`}
        unit="NXS"
        reserveLabel="Height"
        reserve={`${intlNum(state.stake?.reserve)}`}
        reward={`${state.stake?.reward}`}
        rewardLabel="Total"
        footerLabel="Fees "
        footerValue={`${intlNum(state.stake?.footer)} NXS`}
        delayTime={`${cardRefreshTimeout}s`}
        isLoading={miningRQ.isLoading || !state.stake?.text}
      />
      <DetailCard
        type="basic"
        icon={<BsFillCpuFill color="white" size="2.25rem" />}
        label={StringsTypes.CHANNELS[1]}
        sublabel={`Difficulty : ${state.prime?.sublabel}`}
        text={`${abbreviateNumber(state.prime?.text)}`}
        unit="P/s"
        reserveLabel="Reserve"
        reserve={`${state.prime?.reserve} NXS`}
        rewardLabel="Reward"
        reward={`${state.prime?.reward} NXS`}
        footerLabel="Fees"
        footerValue={`${intlNum(state.prime?.footer)} NXS`}
        delayTime={`${cardRefreshTimeout}s`}
        isLoading={!state.prime?.text}
      />
      <DetailCard
        type="basic"
        icon={<MdSpeed color="white" size="2.5rem" />}
        label={StringsTypes.CHANNELS[2]}
        sublabel={`Difficulty : ${state.hash?.sublabel}`}
        text={`${abbreviateNumber(state.hash?.text)}`}
        unit="H/s"
        reserveLabel="Reserve"
        reserve={`${intlNum(state.hash?.reserve)} NXS`}
        rewardLabel="Reward"
        reward={`${state.hash?.reward} NXS`}
        footerLabel="Fees"
        footerValue={`${intlNum(state.hash?.footer)} NXS`}
        delayTime={`${cardRefreshTimeout}s`}
        isLoading={!state.hash?.text}
      />
    </section>
  );
}

export default Panel2;
