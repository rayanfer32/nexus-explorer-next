import InvoicesView from 'components/Views/Dao/Invoices';
import { useRouter } from 'next/router';
import React from 'react';

export default function Invoices() {
  const router = useRouter();
  const { username } = router.query;

  return <InvoicesView username={username} />;
}
