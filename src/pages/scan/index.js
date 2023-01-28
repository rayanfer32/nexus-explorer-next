import Layout from 'components/Layout';
import { InvoiceWithData } from 'components/Views/Dao/InvoiceModal';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import PromiseLayout from 'components/HOC/PromiseLayout';
import { pathOr } from 'utils';
import TYPES from 'types';
import InfoCard from 'components/common/InfoCard';

export default function Index() {
  const router = useRouter();
  const { network, getInvoice, getToken, getNamespace, getGlobalName } =
    useNetwork();

  const invoiceRQ = useQuery(
    ['invoice', network.name, router.query.invoice],
    () => getInvoice(router.query.invoice),
    {
      enabled: !!router.query.invoice,
    }
  );

  const tokenRQ = useQuery(
    ['token', network.name, router.query.token],
    () => getToken(router.query.token),
    {
      enabled: !!router.query.token,
    }
  );

  const namespaceRQ = useQuery(
    ['namespace', network.name, router.query.namespace],
    () => getNamespace(router.query.namespace),
    {
      enabled: !!router.query.namespace,
    }
  );

  const globalNameRQ = useQuery(
    ['globalname', network.name, router.query.globalname],
    () => getGlobalName(router.query.globalname),
    {
      enabled: !!router.query.globalname,
    }
  );

  return (
    <Layout>
      <PromiseLayout
        isLoading={invoiceRQ.isLoading}
        loaderType={TYPES.LOADER.CIRCLE}
        isError={invoiceRQ.isError}
        error={pathOr({}, ['response', 'data', 'error'], invoiceRQ.error)}>
        {invoiceRQ.data && (
          <InvoiceWithData data={invoiceRQ.data} onBack={router.back} isPage />
        )}
      </PromiseLayout>
      <PromiseLayout
        isLoading={tokenRQ.isLoading}
        loaderType={TYPES.LOADER.CIRCLE}
        isError={tokenRQ.isError}
        error={pathOr({}, ['response', 'data', 'error'], tokenRQ.error)}>
        {tokenRQ.data && <InfoCard type="token object" data={tokenRQ.data} />}
      </PromiseLayout>
      <PromiseLayout
        isLoading={namespaceRQ.isLoading}
        loaderType={TYPES.LOADER.CIRCLE}
        isError={namespaceRQ.isError}
        error={pathOr({}, ['response', 'data', 'error'], namespaceRQ.error)}>
        {namespaceRQ.data && (
          <InfoCard type="namespace object" data={namespaceRQ.data} />
        )}
      </PromiseLayout>
      <PromiseLayout
        isLoading={globalNameRQ.isLoading}
        loaderType={TYPES.LOADER.CIRCLE}
        isError={globalNameRQ.isError}
        error={pathOr({}, ['response', 'data', 'error'], globalNameRQ.error)}>
        {globalNameRQ.data && (
          <InfoCard type="global object" data={globalNameRQ.data} />
        )}
      </PromiseLayout>
    </Layout>
  );
}
