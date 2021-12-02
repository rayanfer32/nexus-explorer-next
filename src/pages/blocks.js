import { Table } from 'antd';

export default function Blocks(props) {
  const { data } = props;

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
    },
    {
      title: 'TXNs',
      dataIndex: 'tx',
      render: (tx) => tx.length,
    },
    {
      title: 'Channel',
      dataIndex: 'channel',
      key: 'channel',
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export async function getServerSideProps() {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/ledger/list/blocks?limit=50`
  );
  const data = await resp.json();

  return {
    props: {
      data: data.result,
    },
  };
}
