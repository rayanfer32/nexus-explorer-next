import axios from 'axios';
import { InfoCard } from 'components/atoms/InfoCard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QueryClient, useQuery } from 'react-query';
import Button from 'components/atoms/NE_Button';
import Loader from 'components/atoms/NE_Loader';
import ErrorMessage from 'components/atoms/ErrorMessage';
import AccountInfo from 'components/AccountInfo/AccountInfo';
import TrustInfo from 'components/TrustInfo/TrustInfo';
import Table from 'components/Table/Table';

function Scan({ addr }) {
  const queryClient = new QueryClient();
  // const router = useRouter();
  // const { addr } = router.query;
  const [showRawResponse, setShowRawResponse] = useState(false);
  // const [endpoint, setEndpoint] = useState('');
  // const [params, setParams] = useState({});
  const [cardType, setCardType] = useState();

  /**
   * identify the endpoint to use from the scan
   * @param {*} addr pass the address to scan
   * @returns {*} the {endpoint, params, type} to use
   */
  async function getAPI(addr) {
    let endpoint = '';
    let params = {};
    let type = '';

    if (addr.includes(':trust')) {
      endpoint = 'finance/get/trust';
      params = {
        name: addr,
      };
      type = 'trust';
    } else if (addr.includes(':')) {
      endpoint = 'finance/get/account';
      params = {
        name: addr,
      };
      type = 'user';
    } else if (addr.length === 51) {
      // might be trust acc or user acc address, so query for both and identify which one is correct
      endpoint = 'finance/get/account';
      params = { address: addr };
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/${endpoint}`,
        {
          params: params,
        }
      );
      if (res.data.error) {
        // console.log('its a trust acc');
        endpoint = 'finance/get/trust';
        type = 'trust';
      } else {
        type = 'user';
        // console.log('its a user acc');
      }
    } else if (addr.length === 128) {
      // console.log('its a transactions hash');
      endpoint = 'ledger/get/transaction';
      params = { hash: addr };
      type = 'transaction';
    } else if (addr.length === 256) {
      // console.log('its a blockhash');
      endpoint = 'ledger/get/block';
      params = { hash: addr, verbose: 'detail' };
      type = 'block';
    } else {
      // console.log('its a block height');
      endpoint = 'ledger/get/block';
      params = { height: addr, verbose: 'detail' };
      type = 'block';
    }
    return { endpoint, params, type };
  }

  const { isLoading, data, error, refetch } = useQuery(
    ['scan', addr],
    async () => {
      const { endpoint, params, type } = await getAPI(addr);
      console.log(endpoint, params, 'type:', type);
      setCardType(type);
      const url = `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/${endpoint}`;
      const res = await axios.get(url, {
        params: params,
      });
      return res.data;
    },
    {
      // refetchOnWindowFocus: true,
      // enabled: true,
    }
  );

  // // when the search query is changed, the query is refetched
  // useEffect(() => {
  //   // console.log("addr", addr);
  //   console.log('refetching');
  //   refetch();
  //   // queryClient.removeQueries('scan', { exact: true });
  // }, [addr]);

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

  if (data.error) {
    return <ErrorMessage error={data.error} />;
  }

  const rawInfo = (
    <div style={{ margin: '1rem' }}>
      <Button
        type="tertiary"
        onClick={() => setShowRawResponse((prev) => !prev)}>
        Show RAW Response
      </Button>
      {showRawResponse && (
        <pre style={{ overflow: 'scroll', color: 'var(--theme-page-text)' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );

  return (
    <div>
      {cardType === 'block' && <InfoCard type={cardType} data={data?.result} />}
      {cardType === 'user' && <AccountInfo type={cardType} data={data?.result} />}
      {cardType === 'trust' && <TrustInfo data={data?.result} />}
      {cardType === 'transaction' && (
        <InfoCard type={cardType} data={data?.result} />
      )}
      {rawInfo}
    </div>
  );
}

export default Scan;

export const getServerSideProps = async (context) => {
  let address = context.params.addr;
  return {
    props: {
      addr: address,
    },
  };
};
