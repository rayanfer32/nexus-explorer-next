// import Table from 'components/atoms/Table';
import { Table, Tag, Space } from 'antd';
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
    },
  ];
  const newData = data.result.map((item, index) => ({
    key: index,
    ...item,
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
