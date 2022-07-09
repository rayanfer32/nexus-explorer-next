import Table from 'components/Table/Table';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { columns } from './columns';

function InvoicesView({ username }) {
  const { getInvoices } = useNetwork();
  const { isLoading, data, error } = useQuery(['invoices', username], () =>
    getInvoices(username)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <Table columns={columns} data={data} paginate={true} />;
}

export default InvoicesView;
