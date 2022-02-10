import React from 'react';
import { fetchMetrics } from 'utils/common/fetch';
import { useQuery } from 'react-query';
import TYPES from 'types';
import SmallCard from 'components/atoms/SmallCard';
import styles from './styles.module.scss';
import { toTitleCase } from 'utils/converter';
import Loader from 'components/atoms/NE_Loader';

export default function Metrics() {

  const { isLoading, data, error } = useQuery('metrics', fetchMetrics, {
    refetchInterval: TYPES.REFETCH_INTERVALS.METRICS,
  });

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
  return (
  <div className={styles.container}>
      {Object.entries(data.data.result.registers).map(([k, v]) => (
        <SmallCard
          key={k}
          label={toTitleCase(k)}
          // sublabel="Annual"
          text={v}
          ticker=""
        />
      ))}
    </div>
  );
}
