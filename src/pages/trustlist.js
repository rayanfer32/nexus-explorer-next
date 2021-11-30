// import Table from 'components/atoms/Table';
import data from 'assets/data/trustlist.json';

const newData = data.result.map((item, index) => ({
  id: index,
  ...item,
  balance: `${item.balance.toFixed(2)} NXS`,
}));

function trustlist() {
  return (
    <div>
      <pre className="themeText">{JSON.stringify(data.result, null, 2)}</pre>
    </div>
  );
}

export default trustlist;
