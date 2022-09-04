import Layout from 'components/Layout';
import InvoicesView from 'components/Views/Dao/InvoiceTable';
import { useRouter } from 'next/router';
import React from 'react';

export default function Invoices() {
  const router = useRouter();
  const { username } = router.query;

  return (
    <Layout>
      <InvoicesView username={username} />
    </Layout>
  );
}
