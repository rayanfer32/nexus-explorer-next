import Loader from 'components/common/NE_Loader';
import ErrorMessage from 'components/common/NE_ErrorMessage';
import Layout from 'components/Layout';
import { InvoiceWithData } from 'components/Views/Dao/InvoiceModal';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';

export default function Index() {
  const router = useRouter();
  const { network, getInvoice } = useNetwork();

  const { data, error, isLoading } = useQuery(
    ['invoice', network.name, router.query.invoice],
    () => getInvoice(router.query.invoice)
  );

  return (
    <Layout>
      {isLoading && (
        <div className={'center-loader'}>
          <Loader type="circle" size="5rem" />
        </div>
      )}
      {error?.response.data && (
        <ErrorMessage error={error.response.data.error} />
      )}
      {data && <InvoiceWithData data={data} onBack={router.back} isPage />}
    </Layout>
  );
}
