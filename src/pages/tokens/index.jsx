import axios from 'axios';
import CopyText from 'components/atoms/NE_CopyText/CopyText';
import ErrorCard from 'components/atoms/NE_ErrorCard/ErrorCard';
import Loader from 'components/atoms/NE_Loader';
import Table from 'components/Table/Table';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import { useQuery } from 'react-query';
import { intlNum } from 'utils/converter';

export default function Tokens() {
  const { network, getTokens } = useNetwork();
  const { isLoading, data, error } = useQuery(
    ['tokens', network.name],
    getTokens
  );

  const columns = [
    {
      Header: '#ID',
      Cell: (props) => <div>{parseInt(props.cell.row.id) + 1}</div>,
    },
    {
      Header: 'Token Register Address',
      accessor: 'token',
      Cell: ({ value }) => <CopyText value={value} />,
    },
    {
      Header: 'Token Name',
      accessor: 'ticker',
    },
    {
      Header: 'Max Supply',
      accessor: 'maxsupply',
      Cell: ({ value }) => intlNum(value),
    },
    {
      Header: 'Current Supply',
      accessor: 'currentsupply',
      Cell: ({ value }) => intlNum(value),
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
    return <div><ErrorCard/></div>;
  }

  if (data) {
    return (
      <div>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <Table columns={columns} data={data.data.result} />
      </div>
    );
  }
}
