import Table from 'components/Table/Table';
// import { Table, Tag, Space } from 'antd';
import data from 'assets/data/richlist.json';

function richlist() {
  const newData = data.map((item, index) => ({
    key: index,
    address: item[0],
    balance: `${parseFloat(item[1]).toFixed(2)} NXS`,
  }));

  const columns = [
    {
      Header: 'Address',
      accessor: 'address',
    },
    {
      Header: 'Balance',
      accessor: 'balance',
    },
  ];

  return (
    <div style={{marginBottom: "1rem"}}>
      <Table columns={columns} data={newData} />
    </div>
  );
}

export default richlist;
