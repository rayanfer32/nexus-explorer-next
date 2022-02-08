import Head from 'next/head';
import Panel1 from 'components/Panel1/Panel1';
import Panel2 from 'components/Panel2/Panel2';
import Panel3 from 'components/Panel3/Panel3';
import { useQuery } from 'react-query';
import axios from 'axios';
import { refetchIntervals } from 'types/constants';
import { useAppContext } from 'contexts/AppContext';
import { useEffect } from 'react';

import {
  fetchInfo,
  fetchMarket,
  fetchMetrics,
  fetchMining,
} from 'utils/common/fetch';

// * SSG with initial data
// * https://react-query.tanstack.com/guides/ssr

export async function getStaticProps() {
  const responses = await Promise.all([
    fetchMetrics(),
    fetchInfo(),
    fetchMining(),
    fetchMarket(),
  ]);
  const metrics = responses[0];
  const info = responses[1];
  const mining = responses[2];
  const market = responses[3];

  return {
    props: {
      metrics: { data: metrics.data },
      info: { data: info.data },
      mining: { data: mining.data },
      market: { data: market.data },
    },

    revalidate: refetchIntervals.regenerateSSG,
  };
}

export default function Home(props) {
  const { state, setState, setSharedState } = useAppContext();

  useEffect(() => {
    setState('metrics', props.metrics);
    setState('info', props.info);
    setState('mining', props.mining);
    setState('market', props.market);

    // setSharedState(prev=>({...prev, metrics: props.metrics}))
  }, []);

  const metricsRQ = useQuery('metrics', fetchMetrics, {
    initialData: props.metrics,
    refetchInterval: refetchIntervals.metrics,
  });

  const infoRQ = useQuery(
    'info',
    () => {
      return axios.get(
        `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/system/get/info`
      );
    },
    {
      refetchIntervals: refetchIntervals.info,
    }
  );

  const marketRQ = useQuery('market', fetchMarket, {
    initialData: props.market,
    refetchIntervals: refetchIntervals.market,
  });

  const miningRQ = useQuery('mining', fetchMining, {
    initialData: props.mining,
    refetchIntervals: refetchIntervals.mining,
  });

  return (
    <>
      <Head>
        <title> Nexus Explorer V2 </title>
        <meta name="description" content="Nexus Blockchain Statistics" />
      </Head>
      <main>
        <Panel1
          marketRQ={marketRQ}
          infoRQ={infoRQ}
          miningRQ={miningRQ}
          metricsRQ={metricsRQ}
        />
        <Panel2
          marketRQ={marketRQ}
          infoRQ={infoRQ}
          miningRQ={miningRQ}
          metricsRQ={metricsRQ}
        />
        <Panel3 />
      </main>
    </>
  );
}
