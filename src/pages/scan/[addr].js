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
import { Log } from 'utils/customLog';
import ErrorCard from 'components/atoms/NE_ErrorCard/ErrorCard';
import PageHeader from 'components/Header/PageHeader';
import { CARD_TYPES } from 'types/ConstantsTypes';

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
  const { network, getScanResults } = useNetwork();

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
      // ? might be trust acc or user acc address, so query for both and identify which one is correct
      endpoint = 'finance/get/account';
      params = { address: addr };
      const res = await axios.get(`${network.url}/${endpoint}`, {
        params: params,
      });
      if (res.data.error) {
        endpoint = 'finance/get/trust';
        type = 'trust';
      } else {
        type = 'user';
      }
    } else if (addr.length === 128) {
      endpoint = 'ledger/get/transaction';
      params = { hash: addr };
      type = 'transaction';
    } else if (addr.length === 256) {
      endpoint = 'ledger/get/block';
      params = { hash: addr, verbose: 'detail' };
      type = 'block';
    } else {
      endpoint = 'ledger/get/block';
      params = { height: addr, verbose: 'detail' };
      type = 'block';
    }
    return { endpoint, params, type };
  }

  const { isLoading, data, error } = useQuery(
    ['scan', addr, network.name],
    async () => {
      const { endpoint, params, type } = await getAPI(addr);
      Log(endpoint, params, 'type:', type);
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
    return (
      <div>
        <ErrorCard />
      </div>
    );
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
    <>
      <PageHeader page={cardType} />
      <div>
        {[CARD_TYPES.BLOCK, CARD_TYPES.TRANSACTION].includes(cardType) && (
          <InfoCard type={cardType} data={data?.result} />
        )}
        {[CARD_TYPES.TRUST, CARD_TYPES.USER].includes(cardType) && (
          <UserAccount type={cardType} data={data?.result} />
        )}
        {isDev && rawInfo}
      </div>
    </>
  );
}

export default Scan;
