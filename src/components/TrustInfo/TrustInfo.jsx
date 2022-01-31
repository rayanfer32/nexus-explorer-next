import React, { useEffect, useState } from 'react';
import SmallCard from 'components/atoms/SmallCard';
import styles from '../AccountInfo/AccountInfo.module.scss';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from 'components/atoms/NE_Loader';
import Button from 'components/atoms/NE_Button';
import Table from 'components/Table/Table';
import { middleElipsis } from 'utils/converter';
import QRCode from 'react-qr-code';

export default function TrustInfo({ data }) {
  const [showRawResponse, setShowRawResponse] = useState(false);
  const [tableData, setTableData] = useState([]);

  const trustTransactionsRQ = useQuery(
    'trustTransactions',
    async () => {
      console.log('running trust transactions query');
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/finance/transactions/trust`,
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
    console.log(data.address);
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
      <h1>Trust Info</h1>
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

      {/* account details */}
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
          <div className={styles.qrCode}>
            <QRCode
              fgColor="#0ca4fb"
              title={data.address}
              value={data.address}
              level="L"
              size={200}
            />
          </div>
        </section>
      </div>

      <h1>Transaction Details</h1>
      {trustTransactionsRQ.isLoading ? (
        <LoaderDiv />
      ) : (
        <Table columns={columns} data={tableData || []} />
      )}
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
