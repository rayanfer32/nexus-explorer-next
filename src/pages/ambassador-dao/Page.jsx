import React from 'react';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import { useQuery } from 'react-query';
import TYPES from 'types';
import { DAO_KEYS } from 'types/DAOAccounts';

export default function Page() {
  const { getInvoices, getAccount } = useNetwork();
  console.log(DAO_KEYS);
  const accountRQ = useQuery([TYPES.QUERY_KEYS.ACCOUNT], () =>
    getAccount(DAO_KEYS[0])
  );
  const invoicesRQ = useQuery(['invoices'], () => getInvoices(DAO_KEYS[0]));

  return (
    <>
      <pre>{JSON.stringify(accountRQ.data, null, 2)}</pre>
      <pre>{JSON.stringify(invoicesRQ.data, null, 2)}</pre>
    </>
  );
}
