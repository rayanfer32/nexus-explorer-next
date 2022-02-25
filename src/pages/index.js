import Head from 'next/head';
import Panel1 from 'components/Panel1/Panel1';
import Panel2 from 'components/Panel2/Panel2';
import Panel3 from 'components/Panel3/Panel3';
import { useQuery } from 'react-query';
import TYPES from 'types';
import {
  fetchInfo,
  fetchMarket,
  fetchMetrics,
  fetchMining,
  fetchRecentBlocks,
} from 'utils/common/fetch';

import { useNetwork } from 'hooks/useNetwork/useNetwork';
import { Fragment } from 'react';

// * SSG with initial data
// * https://react-query.tanstack.com/guides/ssr

export async function getStaticProps() {
  const responses = await Promise.all([
    fetchMetrics(),
    fetchInfo(),
    fetchMining(),
    fetchMarket(),
    fetchRecentBlocks(2 * 60),
  ]);
  const metrics = responses[0];
  const info = responses[1];
  const mining = responses[2];
  const market = responses[3];
  const blocks = responses[4];

  return {
    props: {
      metrics: { data: metrics.data },
      info: { data: info.data },
      mining: { data: mining.data },
      market: { data: market.data },
      blocks,
    },

    revalidate: TYPES.REFETCH_INTERVALS.REGENERATE_SSG_INTERVAL,
  };
}

export default function Home(props) {
  // all the data will be available in the respective queries

  // const { appContext, setAppContext } = useAppContext();
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
    <>
      <Head>
        <title> Nexus Explorer V2 </title>
        <meta name="description" content="Nexus Blockchain Statistics" />
      </Head>
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
    </>
  );
}
