import Table from 'components/Table/Table';
import { useQuery } from 'react-query';
import styles from './trustlist.module.scss';
import Loader from 'components/common/NE_Loader';
import { intlNum } from 'utils/converter';
import CopyText from 'components/common/NE_CopyText/CopyText';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import ErrorCard from 'components/common/NE_ErrorCard';
import PageHeader from 'components/Header/PageHeader';
import DynamicPagination from 'components/common/NE_Pagination';
// import DynamicPagination from 'components/Table/DynamicPagination';
import { useState } from 'react';
import ErrorMessage from 'components/common/ErrorMessage';

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

  if (isLoading) {
    return (
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          minHeight: '200px',
          margin: 'auto',
        }}>
        <Loader type="circle" size="5rem" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <ErrorCard />
      </div>
    );
  }

  const newData = data.data?.result?.map((item, index) => ({
    key: index,
    ...item,
    stake: item.stake,
    balance: item.balance,
  }));

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
        <Table
          columns={columns}
          data={data.data?.error ? [] : newData}
          paginate={false}
        />
        <div style={{ marginBottom: '1rem' }}>
          <DynamicPagination
            controls={dynamicPageControls}
            isStaticPanination={false}
          />
        </div>
        {data.data?.error && <ErrorMessage error={data.data.error} />}
      </div>
    </>
  );
}
