import Table from 'components/Table/Table';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import React from 'react';
import { useQuery } from 'react-query';
import { columns } from './columns';
import { BsBoxArrowLeft } from 'react-icons/bs';
import { cls } from 'utils';
import styles from './invoices.module.scss';
import { useRouter } from 'next/router';
import Loader from 'components/common/NE_Loader';
import TYPES from 'types';

function InvoicesView({ username }) {
  const { getInvoices } = useNetwork();
  const { isLoading, data, error } = useQuery(['invoices', username], () =>
    getInvoices(username)
  );
  const router = useRouter();

  if (isLoading) {
    return (
      <div className={'dot-loader'}>
        <Loader type={TYPES.LOADER.DOT} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <div className={cls(styles.header)}>
        <BsBoxArrowLeft className={styles.backIcon} onClick={router.back} />
        <p>
          Invoices {'>>'} {username}
        </p>
      </div>
      <Table columns={columns} data={data} paginate={true} />
    </>
  );
}

export default InvoicesView;
