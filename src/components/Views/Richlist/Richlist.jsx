import Table from 'components/Table/Table';
import { useQuery } from 'react-query';
import styles from './richlist.module.scss';
import Loader from 'components/common/NE_Loader';
import { intlNum } from 'utils/converter';
import ApexPie from 'components/common/NE_Chart/ChartApexPie';
import TYPES from 'types';
import CopyText from 'components/common/NE_CopyText';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import { useEffect, useState } from 'react';
import Pagination from 'components/common/NE_Pagination';
import { NETWORKS } from 'types/ConstantsTypes';
import ErrorMessage from 'components/common/ErrorMessage';

export default function Richlist(props) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [pageCount] = useState(Infinity);

  const [pieData, setPieData] = useState();

  // * api calls
  const { network, getRichlist, getMetrics } = useNetwork();
  const isMainnet = network.name === NETWORKS.MAINNET.name;
  const { isLoading, data, error } = useQuery(
    ['richlist', pageIndex, pageSize, network.name],
    () => getRichlist(pageIndex, pageSize),
    {
      placeholderData:
        pageIndex == 0
          ? isMainnet
            ? { data: props.data.data.slice(0, pageSize) }
            : undefined
          : undefined, // * for testnet we don't have data in the props
      staleTime: 1000 * 60, // * 1 min
    }
  );

  // * data for pieChart
  const richlist111 = useQuery(
    ['richlist', network.name],
    isMainnet ? () => props.data : () => getRichlist(0, 111),
    {
      initialData: isMainnet ? props.data : undefined, // * for testnet we don't have data in the props
    }
  );

  const metricsRQ = useQuery(['metrics', network.name], getMetrics);
  const totalSupply = metricsRQ?.data?.result?.supply?.total;
  const PIE_LABELS = ['Top 1', 'Top 10', 'Top 100', 'Others'];

  const columns = [
    {
      Header: '#ID',
      Cell: (props) => (
        <div>{parseInt(props.cell.row.id) + 1 + pageIndex * pageSize}</div>
      ),
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

  const dynamicPageControls = {
    canPreviousPage: pageIndex > 0,
    canNextPage: pageIndex < pageCount - 1,
    pageCount: pageCount,
    pageIndex: pageIndex,
    pageSize: pageSize,
    gotoPage: (pageIndex) => {
      setPageIndex(pageIndex);
    },
    setPageSize: (pageSize) => {
      setPageIndex(0);
      setPageSize(pageSize);
    },
  };

  // * effect to calculate and load piechart data when the richlist111 data is loaded
  useEffect(() => {
    if (richlist111.data) {
      const sortedData = richlist111.data.data;
      const top1 = sortedData.slice(0, 1);
      const top10 = sortedData.slice(1, 11);
      const top100 = sortedData.slice(11, 111);
      const sumTop1 = top1.reduce((acc, cur) => acc + cur.total, 0);
      const sumTop10 = top10.reduce((acc, cur) => acc + cur.total, 0);
      const sumTop100 = top100.reduce((acc, cur) => acc + cur.total, 0);

      setPieData([
        sumTop1,
        sumTop10,
        sumTop100,
        (totalSupply || TYPES.MAX_SUPPLY.VALUE) -
          (sumTop100 + sumTop10 + sumTop1),
      ]);
    }
  }, [richlist111.data]);

  if (error) {
    return <ErrorMessage error={error?.message} />;
  }

  return (
    <>
      <div className={styles.page} style={{ marginBottom: '1rem' }}>
        {/* // * Pie chart */}
        <div className={styles.chartContainer}>
          <h3>NXS Distrubution</h3>
          {pieData && <ApexPie series={pieData} labels={PIE_LABELS} />}
        </div>

        {/* // * Table with dual pagination */}
        {isLoading ? (
          <div
            style={{
              display: 'grid',
              placeItems: 'center',
              minHeight: '200px',
              margin: 'auto',
            }}>
            <Loader type="circle" size="5rem" />
          </div>
        ) : (
          <div>
            <div className={styles.top_pagination}>
              {pageSize > 10 && <Pagination controls={dynamicPageControls} />}
            </div>
            <Table columns={columns} data={data.data || []} paginate={false} />
            <Pagination controls={dynamicPageControls} />
          </div>
        )}
      </div>
    </>
  );
}
