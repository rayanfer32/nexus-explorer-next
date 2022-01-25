import React, { useEffect, useState } from 'react';
import styles from './AccountInfo.module.scss';
import SmallCard from 'components/atoms/SmallCard';
import axios from 'axios';
import { useQuery } from 'react-query';
import Table from 'components/Table/Table';
import Button from 'components/atoms/NE_Button';
import { middleElipsis } from 'utils/converter';
import Loader from 'components/atoms/NE_Loader';

export default function AccountInfo({ data }) {
  const [showRawTxns, setShowRawTxns] = useState(false);
  const [tableData, setTableData] = useState([]);

  const accountTransactionsRQ = useQuery(
    'accountTransactions',
    async () => {
      console.log('running account transactions query');
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/finance/transactions/account`,
        {
          params: {
            address: data?.address,
            limit: 100,
          },
        }
      );
      return res.data;
    },
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
    if (accountTransactionsRQ.data) {
      let _tableData = accountTransactionsRQ.data?.result?.map((txn) => {
        return {
          txid: txn.txid,
          timestamp: txn.timestamp,
          amount: txn.contracts[0].amount,
        };
      });

      setTableData(_tableData);
    }
  }, [accountTransactionsRQ.data]);

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

  return (
    <div className={styles.page}>
      <h1>Account Info</h1>
      <section className={styles.cardsContainer}>
        <SmallCard
          label="Balance"
          sublabel="Current"
          text={new Intl.NumberFormat('en-US').format(data?.balance)}
          ticker="NXS"
          // link={`/scan/${state.blocks}`}
          // icon={<GrStackOverflow />}
        />
        <SmallCard
          label="Stake"
          //   sublabel="in NXS"
          text={new Intl.NumberFormat('en-US').format(data?.stake || 0)}
          ticker="NXS"
          // icon={<FaCoins />}
        />
        <SmallCard
          label="Pending"
          sublabel=""
          text={new Intl.NumberFormat().format(data?.pending || 0)}
          ticker="NXS"
          // icon={<BsPersonCheckFill />}
        />
        <SmallCard
          label="Unconfirmed"
          sublabel=""
          text={data?.unconfirmed || 0}
          ticker="NXS"
          // icon={<AiOutlineStock />}
        />
      </section>

      <h1>Account Details</h1>
      <div className={styles.details}>
        <section className={styles.details__text}>
          <div>Address: {data.address}</div>
          <div>Owner: {data.owner}</div>
          <div>
            Created On: {new Date(data.created * 1000).toLocaleString()}
          </div>
          <div>
            Last Modified: {new Date(data.modified * 1000).toLocaleString()}
          </div>
          <div>Name: {data.name}</div>
          <div>Token Name: {data.token}</div>
          <div>Ticker: {data.ticker}</div>
        </section>
        <section>
          <div className={styles.qrCode}>QR code</div>
        </section>
      </div>

      <h1>Transaction Details</h1>
      {accountTransactionsRQ.isLoading ? (
        <LoaderDiv />
      ) : (
        <Table columns={columns} data={tableData} />
      )}
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
