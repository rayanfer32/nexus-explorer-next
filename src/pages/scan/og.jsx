import InfoCard from 'components/common/InfoCard';
import PageHeader from 'components/Header/PageHeader';
import PromiseLayout from 'components/HOC/PromiseLayout';
import Layout from 'components/Layout';
import { useNetwork } from 'hooks';
import React from 'react';
import { useQuery } from 'react-query';
import { pathOr } from 'utils';

export async function getServerSideProps({ query }) {
  const { block, tidx, cidx } = query ?? {};

  return {
    props: { block, tidx, cidx },
  };
}

export default function OG({ block, tidx, cidx }) {
  const ogDomain = process.env.NEXT_PUBLIC_DOMAIN_BASE_URL;
  const imgUrl = `${ogDomain}/api/static/og-alert?block=${block}&tidx=${tidx}&cidx=${cidx}`;

  const { network, getScanResults } = useNetwork();
  const { isLoading, data, error, isError } = useQuery(
    ['scantx', block, network.name],
    async () => {
      return getScanResults('ledger/get/block', {
        height: block,
        verbose: 'summary',
      });
    }
  );

  return (
    <Layout>
      <PageHeader ogImage={imgUrl} />
      <PromiseLayout
        isLoading={isLoading}
        isError={isError}
        error={pathOr({}, ['response', 'data', 'error'], error)}>
        {data?.result && <InfoCard type="block" data={data?.result} />}
      </PromiseLayout>
    </Layout>
  );
}
