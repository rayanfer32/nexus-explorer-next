import PageHeader from 'components/Header/PageHeader';
import Richlist from 'components/Richlist/Richlist';
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
    <>
      <PageHeader page="Richlist" />
      <Richlist data={props.richlistData} />
    </>
  );
}

export default index;
