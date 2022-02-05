import React, { useEffect, useState } from 'react';
import styles from './AccountInfo.module.scss';
import SmallCard from 'components/atoms/SmallCard';
import axios from 'axios';
import { useQuery } from 'react-query';
import Table from 'components/Table/Table';
import Button from 'components/atoms/NE_Button';
import Loader from 'components/atoms/NE_Loader';
import QRCode from 'react-qr-code';
import TYPES from 'types';
import CopyText from 'components/atoms/CopyText/CopyText';

export default function AccountInfo({ data }) {
  const [showRawTxns, setShowRawTxns] = useState(false);
  const [tableData, setTableData] = useState([]);

  const accountTransactionsRQ = useQuery(
    'accountTransactions',
    async () => {
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
          fontColor = TYPES.colors.marketGreen;
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

      {/* account detials */}
      <h1>Account Details</h1>
      <div className={styles.details}>
        <section className={styles.details__text}>
          <div>Address: <CopyText value={data.address} ellipsisAfter={99}/> </div>
          <div>Owner: <CopyText value={data.owner} ellipsisAfter={99} /></div>
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
              fgColor={TYPES.colors.nexusBlue}
              title={data.address}
              value={data.address || ''}
              level="L"
              size={200}
            />
          </div>
        </section>
      </div>

      <h1>Transaction Details</h1>
      {accountTransactionsRQ.isLoading ? (
        <LoaderDiv />
      ) : (
        <Table columns={columns} data={tableData || []} />
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
