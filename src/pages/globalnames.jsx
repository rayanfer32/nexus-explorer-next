import axios from 'axios';
import CopyText from 'components/atoms/CopyText/CopyText';
import Loader from 'components/atoms/NE_Loader';
import Table from 'components/Table/Table';
import { useQuery } from 'react-query';

export default function GlobalNames() {
  const { isLoading, data, error } = useQuery('global_namespaces', async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/register/list/names`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          where: 'object.namespace=*GLOBAL*',
          limit: 100,
          page: 0,
        }),
      }
    );
    return res.json();
  });

  const columns = [
    {
      Header: '#ID',
      Cell: (props) => <div>{parseInt(props.cell.row.id) + 1}</div>,
    },
    {
      Header: 'Address',
      accessor: 'address',
      Cell: ({ value }) => <CopyText value={value} ellipsisAfter={15}/>,
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Created',
      accessor: 'created',
      Cell: ({ value }) => new Date(value * 1000).toDateString(),
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
    return <div>Some Error Occured</div>;
  }

  if (data) {
    return (
      <div>
        <Table columns={columns} data={data.result} />
      </div>
    );
  }
}
