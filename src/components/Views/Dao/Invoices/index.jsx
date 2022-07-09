import Table from 'components/Table/Table';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import React from 'react';
import { useQuery } from 'react-query';
import { columns } from './columns';
import { BsBoxArrowLeft } from 'react-icons/bs';
import { cls } from 'utils';
import styles from './invoices.module.scss';

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
  return (
    <>
      <div className={cls(styles.header)}>
        <BsBoxArrowLeft />
        <h1>Invoices {'>>'} US:Interactions</h1>
      </div>
      <Table columns={columns} data={data} paginate={true} />
    </>
  );
}

export default InvoicesView;
