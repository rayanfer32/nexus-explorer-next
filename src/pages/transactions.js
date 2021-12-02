import { Table } from 'antd';
import { timeConverter, toTitleCase } from 'utils/converter';

export default function transactions(props) {
  const { data } = props;

  // console.log(data);

  let rows = [];
  data.forEach((item) => {
    item.forEach((i) => rows.push(i));
  });

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

  return (
    <div style={{ overflow: 'scroll' }}>
      <Table columns={columns} dataSource={rows} />
    </div>
  );
}

export async function getServerSideProps() {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/ledger/list/blocks?limit=20&verbose=summary`
  );
  const data = await resp.json();

  const txns = data.result.map((item) => item.tx);

  return {
    props: {
      data: txns,
    },
  };
}
