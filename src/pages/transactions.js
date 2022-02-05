import { toTitleCase, middleElipsis } from 'utils/converter';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Loader from 'components/atoms/NE_Loader';
import Table from 'components/Table/Table';
import { BiCopy } from 'react-icons/bi';
import { handleCopy, totalPages } from 'utils/helper';
import DynamicPagination from 'components/Table/DynamicPagination';
import CopyText from 'components/atoms/CopyText/CopyText';

export default function Transactions(props) {
  // const { data } = props;

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [rows, setRows] = useState([]);

  const { isLoading, data, error } = useQuery(
    ['transactions', pageIndex, pageSize],
    ({ queryKey }) =>
      axios.get(
        `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/ledger/list/blocks?verbose=summary&page=${queryKey[1]}&limit=${queryKey[2]}`
      )
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

  useEffect(() => {
    if (data) {
      // console.log(data)
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
        <CopyText value={props.value} link={`/scan/${props.value}`} ellipsisAfter={20} />
      ),
    },
    {
      Header: 'Contracts',
      accessor: 'contracts',
      Cell: (props) => <div>{props.value.length}</div>,
    },
    {
      Header: 'Type',
      accessor: 'type',
      Cell: (props) => <span>{toTitleCase(props.value)}</span>,
    },
    {
      Header: 'Confirmations',
      accessor: 'confirmations',
      // Cell: (props) => <div>{props.value}</div>,
    },
    {
      Header: 'Timestamp',
      accessor: 'timestamp',
      Cell: (props) => (
        <span>{new Date(props.value * 1000).toLocaleTimeString()}</span>
      ),
    },
    // {
    //   Header: 'Contracts',
    //   accessor: 'contracts',
    //   render: (contracts) => contracts?.length,
    // },
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
    };

    return (
      <div>
        <Table columns={columns} data={rows} paginate={false} />
        <div style={{ marginBottom: '1rem' }}>
          <DynamicPagination controls={dynamicPaginationControls} />
        </div>
      </div>
    );
  }
}

// export async function getServerSideProps() {
//   const resp = await fetch(
//     `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/ledger/list/blocks?limit=20&verbose=summary`
//   );
//   const data = await resp.json();

//   const txns = data.result.map((item) => item.tx);

//   return {
//     props: {
//       data: txns,
//     },
//   };
// }
