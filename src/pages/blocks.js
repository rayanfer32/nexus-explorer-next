import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from 'components/atoms/NE_Loader';
import Table from 'components/Table/Table';
import TYPES from 'types';
import { useState } from 'react';
import { totalPages } from 'utils/helper';
import DynamicPagination from 'components/Table/DynamicPagination';
import { useEffect } from 'react';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import { NETWORKS } from 'types/ConstantsTypes';

export default function Blocks(props) {
  // wrap these states in the specific network's state
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const [mainnetPage, setMainnetPage] = useState({
    pageSize: 10,
    pageIndex: 0,
    pageCount: 1,
    totalRows: 0,
  });

  const [testnetPage, setTestnetPage] = useState({
    pageSize: 10,
    pageIndex: 0,
    pageCount: 1,
    totalRows: 0,
  });

  const columns = [
    {
      Header: 'Block',
      accessor: 'height',
      Cell: (props) => <a href={`/scan/${props.value}`}>{props.value}</a>,
    },
    {
      Header: 'Date',
      accessor: 'date',
      key: 'date',
      // render: (val) => new Date(val).toDateString,
    },
    {
      Header: 'Mint',
      accessor: 'mint',
    },
    {
      Header: 'TXNs',
      accessor: 'tx',
      Cell: ({ value }) => value.length,
    },
    {
      Header: 'Channel',
      accessor: 'channel',
      key: 'channel',
      Cell: (props) => {
        return TYPES.CHANNELS[props.value];
      },
    },
  ];

  const { network, getBlocks } = useNetwork();
  const { isLoading, data, error } = useQuery(
    ['blocks', pageSize, pageIndex, network.name],
    getBlocks
  );

  useEffect(() => {
    if (data) {
      let height = data[0].height;
      if (network == NETWORKS.MAINNET) {
        if (height > totalRows) {
          setTotalRows(height);
        }
      } else if (network == NETWORKS.TESTNET) {
        setTotalRows(height); // temp fix , need to get the total rows from the testnet
      }
    }
  }, [data, pageSize, network]);

  useEffect(() => {
    setPageCount(totalPages(totalRows, pageSize));
  }, [totalRows, pageSize, network]);

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

  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  // return <pre >{JSON.stringify(data, null, 2)}</pre>;

  if (data) {
    const dynamicPageControls = {
      canPreviousPage: pageIndex > 0,
      canNextPage: pageIndex < pageCount - 1,
      pageCount: pageCount,
      gotoPage: (pageIndex) => {
        setPageIndex(pageIndex);
      },
      setPageSize: (pageSize) => {
        setPageIndex(0);
        setPageSize(pageSize);
      },
      pageIndex: pageIndex,
      pageSize: pageSize,
    };

    return (
      <div style={{ overflow: 'visible' }}>
        <Table columns={columns} data={data} paginate={false} />
        <div style={{ marginBottom: '1rem' }}>
          <DynamicPagination controls={dynamicPageControls} />
        </div>
      </div>
    );
  }
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
