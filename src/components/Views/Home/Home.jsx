import Panel1 from 'components/Panel1';
import Panel2 from 'components/Panel2';
import Panel3 from 'components/Panel3';
import { useQuery } from 'react-query';
import TYPES from 'types';
import { fetchMarket } from 'utils/common/fetch';

import { useNetwork } from 'hooks/useNetwork/useNetwork';
import { Fragment } from 'react';

export default function Home(props) {
  // all the data will be available in the respective queries

  const { network, getMetrics, getInfo, getMining } = useNetwork();

  const metricsRQ = useQuery(['metrics', network.name], getMetrics, {
    initialData: props.metrics,
    refetchInterval: TYPES.REFETCH_INTERVALS.METRICS,
  });

  const infoRQ = useQuery(['info', network.name], getInfo, {
    refetchInterval: TYPES.REFETCH_INTERVALS.INFO,
  });

  const marketRQ = useQuery('market', fetchMarket, {
    initialData: props.market,
    refetchInterval: TYPES.REFETCH_INTERVALS.MARKET,
  });

  const miningRQ = useQuery(['mining', network.name], getMining, {
    initialData: props.mining,
    refetchInterval: TYPES.REFETCH_INTERVALS.MINING,
  });

  return (
    <Fragment>
      <Panel1
        marketRQ={marketRQ}
        infoRQ={infoRQ}
        miningRQ={miningRQ}
        metricsRQ={metricsRQ}
        blocks={props.blocks}
      />
      <Panel2
        marketRQ={marketRQ}
        infoRQ={infoRQ}
        miningRQ={miningRQ}
        metricsRQ={metricsRQ}
      />
      <Panel3 blocks={props.blocks} />
    </Fragment>
  );
}
