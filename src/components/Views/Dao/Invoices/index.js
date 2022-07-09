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

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (data) {
      setTableData(
        data.map((invoice) => ({
          modified: invoice.modified,
          amount: invoice.json.amount,
          ticker: invoice.json.token,
          status: invoice.json.status,
          account: invoice.json.account,
          recipient: invoice.json.recipient,
          description: invoice.json.description,
          sender_detail: invoice.json.sender_detail,
        }))
      );
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // return <pre>{JSON.stringify(tableData, null, 2)}</pre>;
  return <Table columns={columns} data={tableData} paginate={true} />;
}

export default InvoicesView;
