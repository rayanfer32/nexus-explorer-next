import { timeConverter, toTitleCase } from 'utils/converter';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Loader from 'components/atoms/NE_Loader';
import Table from 'components/Table/Table';

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
      Header: 'Transaction ID',
      accessor: 'txid',
      // key: 'txid',
      // render: (txid) => `${txid.substring(0, 10)}...${txid.slice(-10)}`,
    },
    {
      Header: 'Type',
      accessor: 'type',
      render: (text) => toTitleCase(text),
    },
    {
      Header: 'Timestamp',
      accessor: 'timestamp',
      render: (val) => timeConverter(val),
    },
    // {
    //   Header: 'Contracts',
    //   accessor: 'contracts',
    //   render: (contracts) => contracts?.length,
    // },
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

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  return (
    <div>
      <Table columns={columns} data={rows} />
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
