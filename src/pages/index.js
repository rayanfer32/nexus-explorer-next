import Head from 'next/head';
import Panel1 from 'components/Panel1/Panel1';
import Panel2 from 'components/Panel2/Panel2';
import Panel3 from 'components/Panel3/Panel3';
import { useQuery } from 'react-query';
import axios from 'axios';
import { refetchIntervals } from 'types/constants';

// * SSG with initial data
// * https://react-query.tanstack.com/guides/ssr

function fetchMetrics() {
  return axios.get(
    `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/system/get/metrics`
  );
}

function fetchInfo() {
  return axios.get(`${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/system/get/info`);
}

function fetchMining() {
  return axios.get(`${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/ledger/get/info`);
}

function fetchMarket() {
  return axios.get(`${process.env.NEXT_PUBLIC_COINGECKO_BASE_URL}/coins/nexus`);
}

export async function getStaticProps() {
  const metrics = await fetchMetrics();
  const info = await fetchInfo();
  const mining = await fetchMining();
  const market = await fetchMarket();

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
