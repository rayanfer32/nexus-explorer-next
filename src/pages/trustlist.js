import Table from 'components/Table/Table';
// import { Table } from 'antd';
import data from 'assets/data/trustlist.json';

function trustlist() {
  const columns = [
    {
      Header: 'Address',
      accessor: 'address',
    },
    {
      Header: 'Balance',
      accessor: 'balance',
    },
    {
      Header: 'Stake',
      accessor: 'stake',
    },
    {
      Header: 'Stake Rate',
      accessor: 'stakerate',
    },
  ];

  const newData = data.result.map((item, index) => ({
    key: index,
    ...item,
    stake: `${item.stake.toFixed(2)} NXS`,
    balance: `${item.balance.toFixed(2)} NXS`,
  }));

  return (
    <div style={{marginBottom: "1rem"}}>
      <Table columns={columns} data={newData} />
    </div>
  );
}

export default trustlist;
