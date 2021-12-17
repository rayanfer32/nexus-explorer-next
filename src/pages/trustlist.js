// import Table from 'components/atoms/Table';
import { Table } from 'antd';
import data from 'assets/data/trustlist.json';

function trustlist() {
  const columns = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      // defaultSortOrder: "descend",
      sorter: (a, b) => parseFloat(a.balance) - parseFloat(b.balance),
    },
    {
      title: 'Stake',
      dataIndex: 'stake',
      key: 'stake',
      defaultSortOrder: 'descend',
      sorter: (a, b) => parseFloat(a.stake) - parseFloat(b.stake),
    },
    {
      title: 'Stake Rate',
      dataIndex: 'stakerate',
      key: 'stakerate',
      sorter: (a, b) => parseFloat(a.stakerate) - parseFloat(b.stakerate),
    },
  ];
  const newData = data.result.map((item, index) => ({
    key: index,
    ...item,
    stake: `${item.stake.toFixed(2)} NXS`,
    balance: `${item.balance.toFixed(2)} NXS`,
  }));

  return (
    <div style={{ overflow: 'scroll' }}>
      {/* <pre className="themeText">{JSON.stringify(data.result, null, 2)}</pre> */}
      <Table columns={columns} dataSource={newData} />
    </div>
  );
}

export default trustlist;
