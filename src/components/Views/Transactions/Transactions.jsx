import { toTitleCase } from 'utils/converter';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Loader from 'components/common/NE_Loader';
import Table from 'components/Table/Table';
import { totalPages } from 'utils/helper';
import DynamicPagination from 'components/common/NE_Pagination';
import CopyText from 'components/common/NE_CopyText';
import { useNetwork } from 'hooks';

export default function Transactions() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [rows, setRows] = useState([]);

  const { network, getTransactions } = useNetwork();
  const { isLoading, data, error } = useQuery(
    ['transactions', pageIndex, pageSize, network.name],
    getTransactions
  );

  // prepare rows when data gets fetched
  useEffect(() => {
    if (data) {
      const txns = data.data.result.map((item) => item.tx);
      let _rows = [];
      txns.forEach((item) => {
        item.forEach((i) => _rows.push(i));
      });
      setRows(_rows);
    }
  }, [data]);

  // reset all pagination props on network.name change
  useEffect(() => {
    setPageSize(10);
    setPageIndex(0);
    setPageCount(1);
    setTotalRows(0);
  }, [network.name]);

  useEffect(() => {
    if (data) {
      let height = data.data.result[0].height;
      if (height > totalRows) {
        setTotalRows(height);
      }
    }
  }, [data, pageSize]);

  useEffect(() => {
    setPageCount(totalPages(totalRows, pageSize));
  }, [totalRows, pageSize]);

  const columns = [
    {
      Header: 'Transaction ID',
      accessor: 'txid',
      Cell: (props) => (
        <CopyText value={props.value} link={`/scan/${props.value}`} />
      ),
    },
    {
      Header: 'Contracts',
      accessor: 'contracts',
      Cell: (props) => <div>{props.value?.length || 0}</div>,
    },
    {
      Header: 'Type',
      accessor: 'type',
      Cell: (props) => <span>{toTitleCase(props.value)}</span>,
    },
    {
      Header: 'Confirmations',
      accessor: 'confirmations',
    },
    {
      Header: 'Timestamp',
      accessor: 'timestamp',
      Cell: (props) => (
        <span>{new Date(props.value * 1000).toLocaleTimeString()}</span>
      ),
    },
  ];

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

  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }

  if (data) {
    const dynamicPaginationControls = {
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
      <div>
        <Table columns={columns} data={rows} paginate={false} />
        <div style={{ marginBottom: '1rem' }}>
          <DynamicPagination
            controls={dynamicPaginationControls}
            isStaticPanination={false}
          />
        </div>
      </div>
    );
  }
}
