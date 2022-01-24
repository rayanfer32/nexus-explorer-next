import Table from 'components/Table/Table';
import { useQuery } from 'react-query';
import axios from 'axios';
import styles from '../styles/richlist.module.scss';
import Loader from 'components/atoms/NE_Loader';

export default function Richlist() {
  const { isLoading, data, error } = useQuery(
    'richlist',
    async () => {
      // * to consider the users who have moved their balance to trust
      // * combine the result of the two queries
      // {{NEXUSTPP}}/register/list/trust?where=object.token=0 AND object.trust>10000

      const accountsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/register/list/accounts?where=object.token=0 AND object.balance>10000`,
        {
          params: {
            // limit: 100,
            // sort: 'desc',
          },
        }
      );

      const trustResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/register/list/trust?where=object.token=0 AND object.trust>10000`,
        {
          params: {
            // limit: 100,
            // sort: 'desc',
          },
        }
      );

      return {
        accounts: accountsResponse.data,
        trust: trustResponse.data,
      };
    },
    {
      // refetchOnWindowFocus: false,
      // enable: false,
    }
  );

  const columns = [
    {
      Header: 'Owner',
      accessor: 'address',
    },
    {
      Header: 'Balance',
      accessor: 'balance',
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
    // return <pre className={styles.page}>{JSON.stringify(data, null, 2)}</pre>;

    const accountData = data.accounts.result.map((item, index) => ({
      key: index,
      address: item.owner,
      balance: `${parseFloat(item.total).toFixed(2)} ${item.ticker}`,
    }));

    const trustData = data.trust.result.map((item, index) => ({
      key: index,
      address: item.owner,
      balance: `${parseFloat(item.total).toFixed(2)} ${item.ticker}`,
    }));

    const combinedData = [...accountData, ...trustData];

    return (
      <div className={styles.page} style={{ marginBottom: '1rem' }}>
        <Table columns={columns} data={combinedData} />
      </div>
    );
  }
}
