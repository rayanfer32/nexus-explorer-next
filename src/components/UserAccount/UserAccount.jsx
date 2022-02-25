import { useEffect, useState } from 'react';
import styles from './UserAccount.module.scss';
import { useQuery } from 'react-query';
import Button from 'components/atoms/NE_Button';
import TYPES from 'types';
import CopyText from 'components/atoms/NE_CopyText';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import { AccountDetail } from './AccountDetail';
import { AccountInfo } from './AccountInfo';
import { TransactionDetails } from './TransactionDetails';

export default function UserAccount({ data }) {
  const [showRawTxns, setShowRawTxns] = useState(false);
  const [tableData, setTableData] = useState([]);

  const { network, getAccountTransactions } = useNetwork();
  const accountTransactionsRQ = useQuery(
    ['accountTransactions', network.name],
    () => getAccountTransactions(data),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enable: false,
    }
  );

  useEffect(() => {
    // temp fix for the issue where the query is not re-run when the component is re-rendered
    setTimeout(() => accountTransactionsRQ.refetch(), 2000);
  }, []);

  useEffect(() => {
    // temp fix for the issue where the query is not re-run when the component is re-rendered
    accountTransactionsRQ.refetch();
  }, [data.address]);

  // columns for the txns table
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
        return <CopyText value={props.value} ellipsisAfter={15} />;
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
        if (['CREDIT', 'CREATE'].includes(props.row.values.operation)) {
          fontColor = TYPES.COLORS.MARKET_GREEN;
          sign = '+';
        } else if (['DEBIT', 'FEE'].includes(props.row.values.operation)) {
          fontColor = 'red';
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
          amount: `${txn.contracts[0].amount || 0} NXS`,
        };
      });

      setTableData(_tableData);
    }
  }, [accountTransactionsRQ.data]);

  return (
    <div className={styles.page}>
      {/* Account info  */}
      <h2>Account Info</h2>
      <AccountInfo data={data} />

      {/* Account detials */}
      <h2>Account Details</h2>
      <AccountDetail data={data} />

      {/* Transection detail table */}
      <h2>Transaction Details</h2>
      <TransactionDetails
        isLoading={accountTransactionsRQ.isLoading}
        columns={columns}
        data={tableData || []}
      />

      <Button type="tertiary" onClick={() => setShowRawTxns((prev) => !prev)}>
        Show RAW Transactions
      </Button>
      {showRawTxns && (
        <pre style={{ height: '10rem', overflow: 'scroll' }}>
          {JSON.stringify(accountTransactionsRQ.data, null, 2)}
        </pre>
      )}
    </div>
  );
}
