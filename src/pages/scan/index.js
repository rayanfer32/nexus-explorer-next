import Layout from 'components/Layout';
import { InvoiceWithData } from 'components/Views/Dao/InvoiceModal';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import PromiseLayout from 'components/HOC/PromiseLayout';
import { pathOr } from 'utils';
import TYPES from 'types';

export default function Index() {
  const router = useRouter();
  const { network, getInvoice } = useNetwork();

  const { data, error, isLoading, isError } = useQuery(
    ['invoice', network.name, router.query.invoice],
    () => getInvoice(router.query.invoice)
  );

  return (
    <Layout>
      <PromiseLayout
        isLoading={isLoading}
        loaderType={TYPES.LOADER.CIRCLE}
        isError={isError}
        error={pathOr({}, ['response', 'data', 'error'], error)}>
        {data && <InvoiceWithData data={data} onBack={router.back} isPage />}
      </PromiseLayout>
    </Layout>
  );
}
