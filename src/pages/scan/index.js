import ErrorMessage from 'components/common/ErrorMessage';
import ErrorCard from 'components/common/NE_ErrorCard';
import Loader from 'components/common/NE_Loader';
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

  if (isLoading) {
    return (
      <div className="center-loader">
        <Loader type="circle" size="5rem" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ErrorCard />
      </div>
    );
  }

  if (data.error) {
    return <ErrorMessage error={data.error} />;
  }

  return (
    <Layout>
      <InvoiceWithData data={data} onBack={router.back} isPage />
    </Layout>
  );

  // return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
