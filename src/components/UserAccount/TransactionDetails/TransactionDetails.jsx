import Table from 'components/Table/Table';
import styles from './TransactionDetails.module.scss';
import Loader from 'components/common/NE_Loader';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import CopyText from 'components/common/NE_CopyText/CopyText';
import { useQuery } from 'react-query';
import TYPES from 'types';
import { useEffect, useState } from 'react';
import DynamicPagination from 'components/common/NE_Pagination';
import ErrorMessage from 'components/common/ErrorMessage';
import { intlNum } from 'utils';

export const TransactionDetails = ({ type, data }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount] = useState(Infinity);

  const [tableData, setTableData] = useState([]);
  const { network, getAccountTransactions, getTrustTransactions } =
    useNetwork();

  const LoaderDiv = () => (
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

  const accountTransactionsRQ = useQuery(
    [
      'accountTransactions',
      type,
      data.address,
      pageIndex,
      pageSize,
      network.name,
    ],
    () =>
      type == 'user'
        ? getAccountTransactions(data.address, pageIndex, pageSize)
        : getTrustTransactions(data.address, pageIndex, pageSize),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enable: false,
    }
  );

  // * columns for the txns table
  const columns = [
    {
      Header: 'Time',
      accessor: 'timestamp',
      Cell: (props) => {
        return <div>{new Date(props.value * 1000).toLocaleString()}</div>;
      },
    },
    {
      Header: 'TXID',
      accessor: 'txid',
      Cell: (props) => {
        return <CopyText value={props.value} />;
      },
    },
    {
      Header: 'Operation',
      accessor: 'operation',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
      Cell: (props) => {
        let cellColor = 'var(--theme-page-text)';
        let sign = '+';
        if (
          ['CREDIT', 'CREATE', 'TRUST'].includes(props.row.values.operation)
        ) {
          cellColor = TYPES.COLORS.MARKET_GREEN;
          sign = '+';
        } else if (['DEBIT', 'FEE'].includes(props.row.values.operation)) {
          cellColor = TYPES.COLORS.MARKET_RED;
          sign = '-';
        }
        return (
          <div className={styles.amount} style={{ background: cellColor }}>
            {sign} {props.value}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (accountTransactionsRQ.data) {
      let _tableData = accountTransactionsRQ.data?.result?.map((txn) => {
        return {
          txid: txn.txid,
          timestamp: txn.timestamp,
          operation: txn.contracts[0].OP,
          amount: `${intlNum(txn.contracts[0].amount || 0)} ${
            txn.contracts[0].ticker || ''
          }`,
        };
      });

      setTableData(_tableData);
    }
  }, [accountTransactionsRQ.data]);

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

  if (accountTransactionsRQ.isLoading) {
    return <LoaderDiv />;
  }

  return (
    <div className={styles.page} style={{ marginBottom: '1rem' }}>
      <Table
        columns={columns}
        data={accountTransactionsRQ.data?.error ? [] : tableData}
        paginate={false}
      />
      <div style={{ marginBottom: '1rem' }}>
        <DynamicPagination
          controls={dynamicPageControls}
          isStaticPanination={false}
        />
      </div>
      {accountTransactionsRQ.data?.error && (
        <ErrorMessage error={accountTransactionsRQ.data.error} />
      )}
    </div>
  );
};
