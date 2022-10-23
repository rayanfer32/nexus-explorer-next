import { useQuery } from 'react-query';
import Loader from 'components/common/NE_Loader';
import Table from 'components/Table';
import TYPES from 'types';
import { useState, useEffect } from 'react';
import { totalPages } from 'utils/helper';
import DynamicPagination from 'components/common/NE_Pagination';
import { useNetwork } from 'hooks';
import Logger from 'utils/customLog';

export default function Blocks() {
  // wrap these states in the specific network's state
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  // * api calls
  const { network, getBlocks } = useNetwork();
  const { isLoading, data, error } = useQuery(
    ['blocks', pageSize, pageIndex, network.name],
    getBlocks
  );

  const columns = [
    {
      Header: 'Block',
      accessor: 'height',
      Cell: (props) => <a href={`/scan/${props.value}`}>{props.value}</a>,
    },
    {
      Header: 'Timestamp',
      accessor: 'timestamp',
      Cell: (props) => new Date(props.value * 1000).toLocaleTimeString(),
    },
    {
      Header: 'Mint',
      accessor: 'mint',
      Cell: (props) => props.value.toFixed(2),
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

  // * reset all pagination props on network.name change
  useEffect(() => {
    setPageSize(10);
    setPageIndex(0);
    setPageCount(1);
    setTotalRows(0);
  }, [network.name]);

  // * calculate totalRows from blockHeight for pageCount
  useEffect(() => {
    if (data) {
      let height = data[0].height;
      if (height > totalRows) {
        setTotalRows(height);
      }
    }
  }, [data, pageSize]);

  // * set pagecount based on total rows
  useEffect(() => {
    Logger.log('setting total pages');
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
      handleStartOfPageClick: () => {
        setPageIndex(0);
      },
      handlePreviousPageClick: () => {
        setPageIndex(pageIndex - 1);
      },
      handleNextPageClick: () => {
        setPageIndex(pageIndex + 1);
      },
    };

    return (
      <div style={{ overflow: 'visible' }}>
        <Table columns={columns} data={data} paginate={false} />
        <div style={{ marginBottom: '1rem' }}>
          <DynamicPagination
            controls={dynamicPageControls}
            isStaticPanination={false}
          />
        </div>
      </div>
    );
  }
}
