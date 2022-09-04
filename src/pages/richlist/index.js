import PageHeader from 'components/Header/PageHeader';
import Layout from 'components/Layout';
import Richlist from 'components/Views/Richlist';
import React from 'react';
import TYPES from 'types';

import { fetchRichlist } from 'utils/common/fetch';
export async function getStaticProps() {
  const richlistData = await fetchRichlist();
  return {
    props: {
      richlistData,
    },
    revalidate: TYPES.REFETCH_INTERVALS.REGENERATE_SSG_INTERVAL,
  };
}

function index(props) {
  return (
    <Layout>
      <PageHeader page="Richlist" />
      <Richlist data={props.richlistData} />
    </Layout>
  );
}

export default index;
