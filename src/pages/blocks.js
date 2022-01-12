import { Table } from 'antd';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from 'components/atoms/NE_Loader';

export default function Blocks(props) {
  // const { data } = props;

  const columns = [
    {
      title: 'Block',
      dataIndex: 'height',
      key: 'height',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      // render: (val) => new Date(val).toDateString,
    },
    {
      title: 'Mint',
      dataIndex: 'mint',
      key: 'mint',
      sorter: (a, b) => a.mint - b.mint,
    },
    {
      title: 'TXNs',
      dataIndex: 'tx',
      render: (tx) => tx.length,
      sorter: (a, b) => a.tx.length - b.tx.length,
    },
    {
      title: 'Channel',
      dataIndex: 'channel',
      key: 'channel',
      render: (chanId) => {
        const CHANNELS = { 0: 'Stake', 1: 'Prime', 2: 'Hash' };
        return CHANNELS[chanId];
      },
      sorter: (a, b) => a.channel - b.channel,
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

  return (
    <div style={{ overflow: 'scroll' }}>
      <Table columns={columns} dataSource={data} />
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
