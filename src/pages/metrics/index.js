import React from 'react';
import { useAppContext } from 'contexts/AppContext';
import { fetchMetrics } from 'utils/common/fetch';
import { refetchIntervals } from 'types/constants';
import { useQuery } from 'react-query';

export default function Metrics() {
  // load data from sharedState
  const { state, setState } = useAppContext();

  const metricsRQ = useQuery('metrics', fetchMetrics, {
    initialData: state.metrics,
    refetchInterval: refetchIntervals.metrics,
  });

  return <pre>{JSON.stringify(metricsRQ.data, null, 2)}</pre>;
}
