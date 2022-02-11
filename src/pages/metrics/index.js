import React from 'react';
import { fetchMetrics } from 'utils/common/fetch';
import { useQuery } from 'react-query';
import TYPES from 'types';
import SmallCard from 'components/atoms/SmallCard';
import styles from './styles.module.scss';
import { intlNum, toTitleCase } from 'utils/converter';
import Loader from 'components/atoms/NE_Loader';

export default function Metrics() {

  // fetchMetrics should be created from a custom hook which 
  // updates along with the change of network in appContext

  const { isLoading, data, error } = useQuery('metrics', fetchMetrics, {
    refetchInterval: TYPES.REFETCH_INTERVALS.METRICS,
  });

  const SmallCards = ({object}) => {
    return Object.entries(object).map(([k, v]) => (
      <SmallCard
        key={k}
        label={toTitleCase(k)}
        // sublabel="Annual"
        text={intlNum(v.toFixed(2))}
        ticker=""
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
      <SmallCard label="Signature Chains" text={data.data.result.sig_chains} />
        <SmallCards object={data.data.result.registers} />
      </div>

      <h3>Reserves</h3>
      <div className={styles.cardGroup}>
      <SmallCards object={data.data.result.reserves} />
      </div>

      <h3>Supply</h3>
      <div className={styles.cardGroup}>
      <SmallCards object={data.data.result.supply} />
      </div>

      <h3>Trust</h3>
      <div className={styles.cardGroup}>
      <SmallCards object={data.data.result.trust} />
      </div>


    </div>
  );
}

// {
//   Object.entries(value).map(([k, v]) => (
//    <SmallCard
//      key={k}
//      label={toTitleCase(k)}
//      // sublabel="Annual"
//      text={v}
//      ticker=""
//    />
//  ))}
