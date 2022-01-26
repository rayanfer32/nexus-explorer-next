import Table from 'components/Table/Table';
import { useQuery } from 'react-query';
import axios from 'axios';
import styles from '../styles/richlist.module.scss';
import Loader from 'components/atoms/NE_Loader';
import { intlNum, middleElipsis } from 'utils/converter';

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
            // sort: 'total',
            // order: 'desc',
          },
        }
      );

      const trustResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/register/list/trust?where=object.token=0 AND object.balance>10000`,
        {
          params: {
            // limit: 100,
            // sort: 'trust',
            // order: 'desc',  
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
      Cell: (props) => <div>{middleElipsis(props.value, 50)}</div>
    },
    {
      Header: 'Balance',
      accessor: 'total',
      Cell: (props) => intlNum(props.value) + " NXS",
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
      total: item.total,
    }));

    const trustData = data.trust.result.map((item, index) => ({
      key: index,
      address: item.owner,
      total: item.total,
    }));

    const combinedData = [...accountData, ...trustData];

    // filter top 100 by total from combinedData
    const top100 = combinedData.sort((a, b) => b.total - a.total).slice(0, 100);

    return (
      <div className={styles.page} style={{ marginBottom: '1rem' }}>
        <Table columns={columns} data={top100} />
      </div>
    );
  }
}
