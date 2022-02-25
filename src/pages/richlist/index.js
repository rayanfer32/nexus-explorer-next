import Table from 'components/Table/Table';
import { useQuery } from 'react-query';
import axios from 'axios';
import styles from './richlist.module.scss';
import Loader from 'components/atoms/NE_Loader';
import { intlNum } from 'utils/converter';
import ApexPie from 'components/Chart/ApexPie';
import TYPES from 'types';
import CopyText from 'components/atoms/NE_CopyText/CopyText';
import { fetchMetrics } from 'utils/common/fetch';
import { useNetwork } from 'hooks/useNetwork/useNetwork';

export default function Richlist() {
  const metricsRQ = useQuery('metrics', fetchMetrics);

  const totalSupply = metricsRQ?.data?.result?.supply?.total;

  const { network, getRichlist } = useNetwork();
  const { isLoading, data, error } = useQuery(
    ['richlist', network.name],
    getRichlist,
    {
      // refetchOnWindowFocus: false,
      // enable: false,
    }
  );

  const columns = [
    {
      Header: '#ID',
      Cell: (props) => <div>{parseInt(props.cell.row.id) + 1}</div>,
    },
    {
      Header: 'Address',
      accessor: 'address',
      Cell: ({ value }) => (value ? <CopyText value={value} /> : '-'),
    },
    {
      Header: 'Balance',
      accessor: 'total',
      Cell: ({ value }) => (value ? intlNum(value.toFixed(2)) + ' NXS' : '-'),
    },
    {
      Header: 'Trust',
      accessor: 'trust',
      Cell: ({ value }) => (value ? intlNum(value) + '' : '-'),
    },
    {
      Header: 'Stake Rate',
      accessor: 'rate',
      Cell: ({ value }) => (value ? intlNum(value.toFixed(2)) + '' : '-'),
    },
  ];

  if (isLoading) {
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
  }

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  if (data) {
    const sortedData = data.data;
    const top1 = sortedData.slice(0, 1);
    const top10 = sortedData.slice(1, 11);
    const top100 = sortedData.slice(11, 111);

    const sumTop1 = top1.reduce((acc, cur) => acc + cur.total, 0);
    const sumTop10 = top10.reduce((acc, cur) => acc + cur.total, 0);
    const sumTop100 = top100.reduce((acc, cur) => acc + cur.total, 0);

    const labels = ['Top 1', 'Top 10', 'Top 100', 'Others'];
    const pieData = [
      sumTop1,
      sumTop10,
      sumTop100,
      (totalSupply || TYPES.MAX_SUPPLY.VALUE) -
        (sumTop100 + sumTop10 + sumTop1),
    ];

    return (
      <div className={styles.page} style={{ marginBottom: '1rem' }}>
        <div className={styles.chartContainer}>
          <h3>NXS Distrubution</h3>
          <ApexPie series={pieData} labels={labels} />
        </div>
        <Table columns={columns} data={data.data} />
      </div>
    );
  }
}
