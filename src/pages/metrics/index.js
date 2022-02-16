import React from 'react';
import { useQuery } from 'react-query';
import TYPES from 'types';
import SmallCard from 'components/atoms/SmallCard';
import styles from './styles.module.scss';
import { intlNum, toTitleCase } from 'utils/converter';
import Loader from 'components/atoms/NE_Loader';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import { metricsMeta } from 'types/StringsTypes';

export default function Metrics() {
  // fetchMetrics should be created from a custom hook which
  // updates along with the change of network in appContext

  const { network, getMetrics } = useNetwork();
  const { isLoading, data, error } = useQuery(
    ['metrics', network.name],
    getMetrics,
    {
      refetchInterval: TYPES.REFETCH_INTERVALS.METRICS,
    }
  );

  const res = data?.data.result;

  const SmallCards = ({ object, type }) => {
    return Object.entries(object).map(([k, v]) => (
      <SmallCard
        key={k}
        label={metricsMeta[type][k]?.label || toTitleCase(k)}
        sublabel={type && metricsMeta[type][k]?.sublabel}
        text={intlNum(v.toFixed(2))}
        ticker={type && metricsMeta[type][k]?.ticker}
      />
    ));
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          minHeight: '200px',
          margin: 'auto',
        }}>
        <Loader type="circle" size="5rem" />
      </div>
    );
  }

  if (error) {
    <div> Error </div>;
  }

  return (
    <div className={styles.container}>
      <h3>Registers</h3>
      <div className={styles.cardGroup}>
        <SmallCard
          label={metricsMeta.sig_chains.label}
          sublabel={metricsMeta.sig_chains.sublabel}
          text={data.data.result.sig_chains}
        />
        <SmallCards type="registers" object={res.registers} />
      </div>

      <h3>Trust</h3>
      <div className={styles.cardGroup}>
        <SmallCard
          label="Staked Percentage"
          ticker="%"
          text={((res.trust.stake / res.supply.total) * 100).toFixed(2)}
        />
        <SmallCards type="trust" object={res.trust} />
      </div>

     
      <h3>Supply</h3>
      <div className={styles.cardGroup}>
        <SmallCards type="supply" object={res.supply} />
      </div>

      <h3>Reserves</h3>
      <div className={styles.cardGroup}>
        <SmallCards type="reserves" object={res.reserves} />
      </div>

    </div>
  );
}
