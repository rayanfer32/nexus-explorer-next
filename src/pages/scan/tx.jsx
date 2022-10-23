import InfoCard from 'components/common/InfoCard';
import PageHeader from 'components/Header/PageHeader';
import PromiseLayout from 'components/HOC/PromiseLayout';
import Layout from 'components/Layout';
import { useNetwork } from 'hooks';
import React from 'react';
import { useQuery } from 'react-query';
import { pathOr } from 'utils';

export async function getServerSideProps({ query }) {
  const { txid, cid } = query ?? {};

  return {
    props: { txid: txid ?? '', cid: cid ?? 0 },
  };
}

export default function OG({ txid, cid }) {
  const ogDomain = process.env.NEXT_PUBLIC_DOMAIN_BASE_URL;
  const imgUrl = `${ogDomain}/api/static/og-alert?txid=${txid}&cid=${cid}`;

  const { network, getScanResults } = useNetwork();
  const { isLoading, data, error, isError } = useQuery(
    ['scan', txid, network.name],
    async () => {
      return getScanResults('ledger/get/transaction', { hash: txid });
    }
  );
  const contracts = data?.result?.contracts ?? [];

  const _data = contracts.length && contracts[contracts.length - 1];
  const _title = `Transaction ID = ${txid}`;
  const _description = `
  Amount: ${_data?.amount} ${_data?.ticker}
  Operation Type: ${_data?.OP}
  Proof: ${_data?.proof}
  `;
  return (
    <Layout>
      <PageHeader title={_title} description={_description} ogImage={imgUrl} />
      <PromiseLayout
        isLoading={isLoading}
        isError={isError}
        error={pathOr({}, ['response', 'data', 'error'], error)}>
        {data?.result && <InfoCard type="transaction" data={data?.result} />}
      </PromiseLayout>
    </Layout>
  );
}
