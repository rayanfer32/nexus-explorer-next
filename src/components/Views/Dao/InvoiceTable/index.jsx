import Table from 'components/Table/Table';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { columns } from './columns';
import { BsBoxArrowLeft } from 'react-icons/bs';
import { cls, pathOr } from 'utils';
import styles from './invoices.module.scss';
import { useRouter } from 'next/router';
import TYPES from 'types';
import NE_Pagination from 'components/common/NE_Pagination';
import { InvoiceModal } from '../InvoiceModal';
import { FiInfo } from 'react-icons/fi';
import PromiseLayout from 'components/HOC/PromiseLayout';

function InvoicesView({ username }) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount] = useState(Infinity);

  // * modal
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const { getInvoices } = useNetwork();
  const { isLoading, data, error, isError } = useQuery(
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
    <PromiseLayout
      isLoading={isLoading}
      isError={isError}
      error={pathOr({}, ['response', 'data', 'error'], error)}
      loaderType={TYPES.LOADER.DOT}
      loaderSize={'2.5rem'}>
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
    </PromiseLayout>
  );
}

export default InvoicesView;
