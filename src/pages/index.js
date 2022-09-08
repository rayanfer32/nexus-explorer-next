import TYPES from 'types';
import {
  fetchInfo,
  fetchMarket,
  fetchMetrics,
  fetchMining,
  fetchRecentBlocks,
} from 'utils/common/fetch';

import PageHeader from 'components/Header/PageHeader';
import HomeView from 'components/Views/Home';
import Layout from 'components/Layout';

// * SSG with initial data
// * https://react-query.tanstack.com/guides/ssr

export async function getStaticProps() {
  // eslint-disable-next-line no-undef
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
      market: { data: market?.data || null },
      blocks,
    },

    revalidate: TYPES.REFETCH_INTERVALS.REGENERATE_SSG_INTERVAL,
  };
}

export default function Home(props) {
  return (
    <Layout>
      <PageHeader title={TYPES.PAGEMETA.TITLE} />
      <HomeView {...props} />
    </Layout>
  );
}
