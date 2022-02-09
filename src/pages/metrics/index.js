import React from 'react';
import { useAppContext } from 'contexts/AppContext';
import { fetchMetrics } from 'utils/common/fetch';
import { useQuery } from 'react-query';
import TYPES from 'types';

export default function Metrics() {
  // load data from sharedState
  const { state, setState } = useAppContext();

  const metricsRQ = useQuery('metrics', fetchMetrics, {
    initialData: state.metrics,
    refetchInterval: TYPES.REFETCH_INTERVALS.METRICS,
  });

  return <pre>{JSON.stringify(metricsRQ.data, null, 2)}</pre>;
}
