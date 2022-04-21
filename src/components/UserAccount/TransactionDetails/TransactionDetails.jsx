import Table from 'components/Table/Table';
import styles from './TransactionDetails.module.scss';
import Loader from 'components/atoms/NE_Loader';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import CopyText from 'components/atoms/NE_CopyText/CopyText';
import { useQuery } from 'react-query';
import TYPES from 'types';
import { useEffect, useState } from 'react';

export const TransactionDetails = ({ type, data }) => {

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
    ['accountTransactions', network.name, type],
    () =>
      type == 'user'
        ? getAccountTransactions(data)
        : getTrustTransactions(data),
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
        let fontColor = 'var(--theme-page-text)';
        let sign = '+';
        if (
          ['CREDIT', 'CREATE', 'TRUST'].includes(props.row.values.operation)
        ) {
          fontColor = TYPES.COLORS.MARKET_GREEN;
          sign = '+';
        } else if (['DEBIT', 'FEE'].includes(props.row.values.operation)) {
          fontColor = TYPES.COLORS.MARKET_RED;
          sign = '-';
        }
        return (
          <div className={styles.amount} style={{ background: fontColor }}>
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
          amount: `${txn.contracts[0].amount || 0} ${txn.contracts[0].ticker}`,
        };
      });

      setTableData(_tableData);
    }
  }, [accountTransactionsRQ.data]);


  return (
    <>
      {accountTransactionsRQ.isFetching ? (
        <LoaderDiv />
      ) : (
        <Table columns={columns} data={tableData || []} />
      )}
    </>
  );
};
