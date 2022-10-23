import CopyText from 'components/common/NE_CopyText/CopyText';
import Loader from 'components/common/NE_Loader';
import Table from 'components/Table/Table';
import { useQuery } from 'react-query';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import ErrorCard from 'components/common/NE_ErrorCard';

export default function GlobalNames() {
  const { network, getGlobalNames } = useNetwork();
  const { isLoading, data, error } = useQuery(
    ['global_namespaces', network.name],
    getGlobalNames
  );

  const columns = [
    {
      Header: '#ID',
      Cell: (props) => <div>{parseInt(props.cell.row.id) + 1}</div>,
    },
    {
      Header: 'Address',
      accessor: 'address',
      Cell: ({ value }) => <CopyText value={value} />,
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
    return (
      <div>
        <ErrorCard />
      </div>
    );
  }

  if (data) {
    return (
      <div>
        <Table columns={columns} data={data.result} />
      </div>
    );
  }
}
