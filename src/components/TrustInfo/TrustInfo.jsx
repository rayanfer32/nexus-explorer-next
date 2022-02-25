import { useEffect, useState } from 'react';
import styles from '../UserAccount/UserAccount.module.scss';
import { useQuery } from 'react-query';
import Button from 'components/atoms/NE_Button';
import { middleElipsis } from 'utils/converter';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import { AccountInfo } from 'components/UserAccount/AccountInfo';
import { AccountDetail } from 'components/UserAccount/AccountDetail';
import { TransactionDetails } from 'components/UserAccount/TransactionDetails';

export default function TrustInfo({ data }) {
  const [showRawResponse, setShowRawResponse] = useState(false);
  const [tableData, setTableData] = useState([]);

  const { network, getTrustTransactions } = useNetwork();
  const trustTransactionsRQ = useQuery(
    ['trustTransactions', network.name],
    () => getTrustTransactions(data),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enable: false,
    }
  );

  useEffect(() => {
    // temp fix for bug that causes old address to be queried
    setTimeout(() => trustTransactionsRQ.refetch(), 2000);
  }, []);

  useEffect(() => {
    // temp fix for the issue where the query is not re-run when the component is re-rendered
    trustTransactionsRQ.refetch();
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
        return <div>{middleElipsis(props.value, 15)}</div>;
      },
    },
    {
      Header: 'Amount',
      accessor: 'amount',
    },
  ];

  useEffect(() => {
    if (trustTransactionsRQ.data) {
      let _tableData = trustTransactionsRQ.data?.result?.map((txn) => {
        return {
          txid: txn.txid,
          timestamp: txn.timestamp,
          amount: `${txn.contracts[0].amount || 0} NXS`,
        };
      });

      setTableData(_tableData);
    }
  }, [trustTransactionsRQ.data]);

  return (
    <div className={styles.page}>
      <h2>Trust Info</h2>
      <AccountInfo data={data} />

      {/* account details */}
      <h2>Account Details</h2>
      <AccountDetail data={data} />

      <h1>Transaction Details</h1>
      <TransactionDetails
        isLoading={trustTransactionsRQ.isLoading}
        columns={columns}
        data={tableData || []}
      />

      <Button
        type="tertiary"
        onClick={() => setShowRawResponse((prev) => !prev)}>
        Show RAW Transactions
      </Button>
      {showRawResponse && (
        <pre style={{ height: '10rem', overflow: 'scroll' }}>
          {JSON.stringify(trustTransactionsRQ.data, null, 2)}
        </pre>
      )}
    </div>
  );
}
