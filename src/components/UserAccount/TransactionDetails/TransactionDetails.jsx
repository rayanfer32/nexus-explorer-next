import Table from 'components/Table/Table';
import styles from './TransactionDetails.module.scss';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import CopyText from 'components/common/NE_CopyText/CopyText';
import { useQuery } from 'react-query';
import TYPES from 'types';
import { useEffect, useState } from 'react';
import DynamicPagination from 'components/common/NE_Pagination';
import { intlNum, pathOr } from 'utils';
import PromiseLayout from 'components/HOC/PromiseLayout';

function getAmount(contracts) {
  // * return the first contract amount when there is only one contract
  if (contracts.length == 1) {
    return `${intlNum(contracts[0].amount || 0)} ${contracts[0].ticker || ''}`;
  }
  // * sum up all the contracts amount if op: credit
  let sum = 0;
  contracts.forEach((c) => {
    if (c.OP == 'CREDIT') {
      sum += c.amount;
    }
  });
  return `${intlNum(sum)} NXS`;
}

export const TransactionDetails = ({ type, data }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount] = useState(Infinity);

  const [tableData, setTableData] = useState([]);
  const { network, getAccountTransactions, getTrustTransactions } =
    useNetwork();

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
        return <CopyText link={`/scan/${props.value}`} value={props.value} />;
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
        let cellBgColor = 'var(--theme-page-background)';
        let sign = '+';
        if (
          ['CREDIT', 'CREATE', 'TRUST'].includes(props.row.values.operation)
        ) {
          cellBgColor = TYPES.COLORS.MARKET_GREEN;
        } else if (
          ['DEBIT', 'FEE', 'LEGACY'].includes(props.row.values.operation)
        ) {
          cellBgColor = TYPES.COLORS.MARKET_RED;
          sign = '-';
        }
        return (
          <div className={styles.amount} style={{ background: cellBgColor }}>
            {sign} {props.value}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (accountTransactionsRQ.data) {
      let _tableData = accountTransactionsRQ.data.result?.map((txn) => {
        return {
          txid: txn.txid,
          timestamp: txn.timestamp,
          operation: txn.contracts[0].OP,
          amount: getAmount(txn.contracts),
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

  return (
    <div className={styles.page} style={{ marginBottom: '1rem' }}>
      <PromiseLayout
        isLoading={pathOr(false, ['isLoading'], accountTransactionsRQ)}
        isError={pathOr(false, ['error'], accountTransactionsRQ)}
        error={pathOr(
          {},
          ['error', 'response', 'data', 'error'],
          accountTransactionsRQ
        )}>
        <Table
          columns={columns}
          data={accountTransactionsRQ.error ? [] : tableData}
          paginate={false}
        />
        <div style={{ marginBottom: '1rem' }}>
          <DynamicPagination
            controls={dynamicPageControls}
            isStaticPanination={false}
          />
        </div>
      </PromiseLayout>
    </div>
  );
};
