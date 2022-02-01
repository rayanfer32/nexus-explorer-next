import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from 'components/atoms/NE_Loader';
import Table from 'components/Table/Table';
import TYPES from 'types';

export default function Blocks(props) {
  // const { data } = props;

  const columns = [
    {
      Header: 'Block',
      accessor: 'height',
      Cell: (props) => <a href={`/scan/${props.value}`}>{props.value}</a>,
    },
    {
      Header: 'Date',
      accessor: 'date',
      key: 'date',
      // render: (val) => new Date(val).toDateString,
    },
    {
      Header: 'Mint',
      accessor: 'mint',
    },
    // {
    //   Header: 'TXNs',
    //   accessor: 'tx',
    //   render: (tx) => tx.length,
    //   sorter: (a, b) => a.tx.length - b.tx.length,
    // },
    {
      Header: 'Channel',
      accessor: 'channel',
      key: 'channel',
      Cell: (props) => {
        return TYPES.channels[props.value];
      },
    },
  ];

  const { isLoading, data, error } = useQuery('blocks', async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/ledger/list/blocks?limit=50`
    );
    return res.data.result;
  });

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

  if (error) return <pre>{error}</pre>;

  // return <pre >{JSON.stringify(data, null, 2)}</pre>;

  return (
    <div style={{ overflow: 'visible' }}>
      <Table columns={columns} data={data} />
    </div>
  );
}

// export async function getServerSideProps() {
//   const resp = await fetch(
//     `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/ledger/list/blocks?limit=50`
//   );
//   const data = await resp.json();

//   return {
//     props: {
//       data: data.result,
//     },
//   };
// }
