import React from 'react';
import { useQuery } from 'react-query';
import TYPES from 'types';
import { NE_CompactCard as SmallCard } from 'components/common/NE_Card/NE_CompactCard';
import styles from './styles.module.scss';
import { intlNum, toTitleCase } from 'utils/converter';
import Loader from 'components/common/NE_Loader';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import { METRICS_META } from 'types/StringsTypes';
import ErrorCard from 'components/common/NE_ErrorCard';

export default function Metrics() {
  //* fetchMetrics should be created from a custom hook which
  //* updates along with the change of network in appContext

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
        label={METRICS_META[type][k]?.label || toTitleCase(k)}
        sublabel={type && METRICS_META[type][k]?.sublabel}
        value={intlNum(v.toFixed(2))}
        unit={type && METRICS_META[type][k]?.ticker}
        icon={type && METRICS_META[type][k]?.icon}
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
    <div>
      <ErrorCard />
    </div>;
  }

  return (
    <>
      <div className={styles.container}>
        <h3>Registers</h3>
        <div className={styles.cardGroup}>
          <SmallCard
            label={METRICS_META.sig_chains.label}
            sublabel={METRICS_META.sig_chains.sublabel}
            value={intlNum(res.sig_chains)}
            icon={METRICS_META.sig_chains.icon}
          />
          <SmallCards type="registers" object={res.registers} />
        </div>

        <h3>Trust</h3>
        <div className={styles.cardGroup}>
          <SmallCard
            label={METRICS_META.trust.staked_percentage.label}
            unit={METRICS_META.trust.staked_percentage.ticker}
            value={((res.trust.stake / res.supply.total) * 100).toFixed(2)}
            icon={METRICS_META.trust.staked_percentage.icon}
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
    </>
  );
}
