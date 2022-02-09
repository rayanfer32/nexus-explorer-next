import React from 'react';
import { useAppContext } from 'contexts/AppContext';
import { fetchMetrics } from 'utils/common/fetch';
import { useQuery } from 'react-query';
import TYPES from 'types';
import { useEffect } from 'react';
import SmallCard from 'components/atoms/SmallCard';
import styles from './styles.module.scss';
import { toTitleCase } from 'utils/converter';
import Loader from 'components/atoms/NE_Loader';

export default function Metrics() {
  // load data from sharedState
  const { appContext, setAppContext } = useAppContext();

  const { isLoading, data, error } = useQuery('metrics', fetchMetrics, {
    initialData: appContext.metrics,
    refetchInterval: TYPES.REFETCH_INTERVALS.METRICS,
  });

  // * save data to context when it new data is fetched
  useEffect(() => {
    setAppContext('metrics', data);
  }, [data]);

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
