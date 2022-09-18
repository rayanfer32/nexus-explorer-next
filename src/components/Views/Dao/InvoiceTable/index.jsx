import Table from 'components/Table/Table';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { columns } from './columns';
import { BsBoxArrowLeft } from 'react-icons/bs';
import { cls } from 'utils';
import styles from './invoices.module.scss';
import { useRouter } from 'next/router';
import Loader from 'components/common/NE_Loader';
import TYPES from 'types';
import NE_Pagination from 'components/common/NE_Pagination';
import { InvoiceModal } from '../InvoiceModal';
import { FiInfo } from 'react-icons/fi';
import ErrorMessage from 'components/common/ErrorMessage';

function InvoicesView({ username }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount] = useState(Infinity);

  // * modal
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const { getInvoices } = useNetwork();
  const { isLoading, data, error } = useQuery(
    ['invoices', username, pageIndex, pageSize],
    () => getInvoices(username, pageIndex, pageSize)
  );
  const router = useRouter();
  const updatedColumn = [
    {
      Header: '',
      accessor: 'address',
      Cell: (props) => (
        <div
          className={styles.info_icon}
          onClick={() => handleModalOpen(props.row.original)}>
          <FiInfo />
        </div>
      ),
    },
    ...columns,
  ];

  if (isLoading) {
    return (
      <div className={'center-loader'}>
        <Loader type={TYPES.LOADER.DOT} />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage error={error.message}></ErrorMessage>;
  }

  const dynamicPageControls = {
    canPreviousPage: pageIndex > 0,
    canNextPage: pageIndex < pageCount - 1,
    pageCount: pageCount,
    pageIndex: pageIndex,
    pageSize: pageSize,
    gotoPage: (pageIndex) => {
      setPageIndex(pageIndex);
    },
    setPageSize: (pageSize) => {
      setPageIndex(0);
      setPageSize(pageSize);
    },
  };

  const handleModalOpen = (data) => {
    setModalData(data);
    setIsOpen(true);
    window &&
      window.history.replaceState(
        'InvoiceInfo',
        'Title',
        '/scan?invoice=' + data.address
      );
  };

  const handleModalClose = () => {
    setIsOpen(false);
    // TODO: need to restore prevoius url after modal close
  };

  return (
    <>
      <div className={cls(styles.header)}>
        <BsBoxArrowLeft className={styles.backIcon} onClick={router.back} />
        <p>
          Invoices {' > '} {username}
        </p>
      </div>
      <Table columns={updatedColumn} data={data} paginate={false} />
      <NE_Pagination controls={dynamicPageControls} />
      {isOpen && (
        <InvoiceModal
          data={modalData}
          onClose={handleModalClose}></InvoiceModal>
      )}
    </>
  );
}

export default InvoicesView;
