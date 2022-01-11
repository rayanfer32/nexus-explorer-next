import { Table } from 'antd';
import { timeConverter, toTitleCase } from 'utils/converter';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Loader from 'components/atoms/NE_Loader';

export default function Transactions(props) {
  // const { data } = props;
  const [rows, setRows] = useState([]);

  const { isLoading, data, error } = useQuery('transactions', () =>
    axios.get(
      `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/ledger/list/blocks?limit=20&verbose=summary`
    )
  );

  // prepare rows when data gets fetched
  useEffect(() => {
    if (data) {
      const txns = data.data.result.map((item) => item.tx);
      let _rows = [];
      txns.forEach((item) => {
        item.forEach((i) => _rows.push(i));
      });
      setRows(_rows);
    }
  }, [data]);

  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'txid',
      key: 'txid',
      render: (txid) => `${txid.substring(0, 10)}...${txid.slice(-10)}`,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (text) => toTitleCase(text),
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (val) => timeConverter(val),
    },
    {
      title: 'Contracts',
      dataIndex: 'contracts',
      render: (contracts) => contracts?.length,
    },
  ];

  if (isLoading)
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

  return (
    <div style={{ overflow: 'scroll' }}>
      <Table columns={columns} dataSource={rows} />
    </div>
  );
}

// export async function getServerSideProps() {
//   const resp = await fetch(
//     `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/ledger/list/blocks?limit=20&verbose=summary`
//   );
//   const data = await resp.json();

//   const txns = data.result.map((item) => item.tx);

//   return {
//     props: {
//       data: txns,
//     },
//   };
// }
