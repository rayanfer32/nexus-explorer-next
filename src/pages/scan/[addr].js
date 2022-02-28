import axios from 'axios';
import { InfoCard } from 'components/atoms/InfoCard';
import Button from 'components/atoms/NE_Button';
import Loader from 'components/atoms/NE_Loader';
import ErrorMessage from 'components/atoms/ErrorMessage';
import UserAccount from 'components/UserAccount';
import { useNetwork } from 'hooks/useNetwork/useNetwork';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { isDev } from 'utils/middleware';

export const getServerSideProps = async (context) => {
  let address = context.params.addr;
  return {
    props: {
      addr: address,
    },
  };
};

function Scan({ addr }) {
  const [showRawResponse, setShowRawResponse] = useState(false);
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

  const { network, getScanResults } = useNetwork();
  const { isLoading, data, error } = useQuery(
    ['scan', addr, network.name],
    async () => {
      const { endpoint, params, type } = await getAPI(addr);
      isDev && console.log(endpoint, params, 'type:', type);
      setCardType(type);
      return getScanResults(endpoint, params);
    }
  );

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
      {cardType === 'user' && (
        <UserAccount type={cardType} data={data?.result} />
      )}
      {cardType === 'trust' && (
        <UserAccount type={cardType} data={data?.result} />
      )}
      {cardType === 'transaction' && (
        <InfoCard type={cardType} data={data?.result} />
      )}
      {isDev && rawInfo}
    </div>
  );
}

export default Scan;
