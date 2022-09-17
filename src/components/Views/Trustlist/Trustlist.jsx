import Table from 'components/Table/Table';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styles from './trustlist.module.scss';
import Loader from 'components/common/NE_Loader';
import { intlNum } from 'utils/converter';
import CopyText from 'components/common/NE_CopyText/CopyText';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import PageHeader from 'components/Header/PageHeader';
import DynamicPagination from 'components/common/NE_Pagination';
import ErrorMessage from 'components/common/NE_ErrorMessage';

export default function Trustlist() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount] = useState(Infinity);

  const { network, getTrustlist } = useNetwork();
  const { isLoading, data, error } = useQuery(
    ['trustlist', pageIndex, pageSize, network.name],
    getTrustlist
  );

  const columns = [
    {
      Header: '#ID',
      Cell: (props) => (
        <div>{parseInt(props.cell.row.id) + 1 + pageIndex * pageSize}</div>
      ),
    },
    {
      Header: 'Address',
      accessor: 'address',
      Cell: ({ value }) => <CopyText value={value} />,
    },
    {
      Header: 'Balance',
      accessor: 'balance',
      Cell: (props) => intlNum(props.value.toFixed(2)) + ' NXS',
    },
    {
      Header: 'Stake',
      accessor: 'stake',
      Cell: (props) => intlNum(props.value.toFixed(2)) + ' NXS',
    },
    {
      Header: 'Stake Rate',
      accessor: 'rate',
    },
    {
      Header: 'Trust',
      accessor: 'trust',
      Cell: (props) => intlNum(props.value),
    },
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
    handleStartOfPageClick: () => {
      setPageIndex(0);
    },
    handlePreviousPageClick: () => {
      setPageIndex(pageIndex - 1);
    },
    handleNextPageClick: () => {
      setPageIndex(pageIndex + 1);
    },
  };

  return (
    <>
      <PageHeader page={'trustlist'} />
      <div className={styles.page} style={{ marginBottom: '1rem' }}>
        {isLoading && (
          <div className={'center-loader'}>
            <Loader type="circle" size="5rem" />
          </div>
        )}
        {data && (
          <Table
            columns={columns}
            data={error?.response?.data ? [] : data?.result}
            paginate={false}
          />
        )}
        <div style={{ marginBottom: '1rem' }}>
          <DynamicPagination
            controls={dynamicPageControls}
            isStaticPanination={false}
          />
        </div>
        {error?.response?.data && (
          <ErrorMessage error={error.response.data.error} />
        )}
      </div>
    </>
  );
}
