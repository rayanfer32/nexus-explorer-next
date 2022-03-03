import Table from 'components/Table/Table';
import { useQuery } from 'react-query';
import styles from './trustlist.module.scss';
import Loader from 'components/atoms/NE_Loader';
import { intlNum } from 'utils/converter';
import CopyText from 'components/atoms/NE_CopyText/CopyText';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import ErrorCard from 'components/atoms/NE_ErrorCard/ErrorCard';
import PageHeader from 'components/Header/PageHeader';

export default function Trustlist() {
  const { network, getTrustlist } = useNetwork();
  const { isLoading, data, error } = useQuery(
    ['trustlist', network.name],
    getTrustlist
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
      Header: 'Balance',
      accessor: 'balance',
      Cell: (props) => intlNum(props.value.toFixed(2)) + ' NXS',
    },
    {
      Header: 'Stake',
      accessor: 'stake',
      Cell: (props) => intlNum(props.value.toFixed(2)) + ' NXS',
    },
    {
      Header: 'Stake Rate',
      accessor: 'rate',
    },
    {
      Header: 'Trust',
      accessor: 'trust',
      Cell: (props) => intlNum(props.value),
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
    const newData = data.result.map((item, index) => ({
      key: index,
      ...item,
      stake: item.stake,
      balance: item.balance,
    }));
    return (
      <>
        <PageHeader page={'trustlist'} />
        <div className={styles.page} style={{ marginBottom: '1rem' }}>
          <Table columns={columns} data={newData} />
        </div>
      </>
    );
  }
}
