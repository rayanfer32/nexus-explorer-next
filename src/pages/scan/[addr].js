import axios from 'axios';
import { InfoCard } from 'components/atoms/InfoCard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Button from 'components/atoms/NE_Button';

function Scan(props) {
  const router = useRouter();
  const { addr } = router.query;
  const [showRawResponse, setShowRawResponse] = useState(false);

  function inferCardType() {
    const method = props.response.info.method;
    console.log('method', method);
    if (method?.includes('block')) {
      return 'block';
    } else if (method?.includes('transaction')) {
      return 'tx';
    }
    return 'block';
  }

  const cardType = inferCardType();

  return (
    <div>
      <InfoCard type={cardType} data={props.response.result} />
      <div style={{ margin: '1rem' }}>
        <Button type="tertiary" onClick={() => setShowRawResponse((prev) => !prev)}>
          Show RAW Response
        </Button>
        {showRawResponse && (
          <div style={{ overflow: 'scroll' }}>
            <pre
              style={{ overflow: 'scroll', color: 'var(--theme-page-text)' }}>
              {JSON.stringify(props.response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default Scan;

export const getServerSideProps = async (context) => {
  // fetch transaction from hash
  let endpoint = '';
  let params = {};
  let address = context.params.addr;

  if (address.length === 128) {
    // console.log('its a transactions hash');
    endpoint = 'ledger/get/transaction';
    params = { hash: address };
  } else if (address.length === 256) {
    // console.log('its a blockhash');
    endpoint = 'ledger/get/block';
    params = { hash: address, verbose: 'detail' };
  } else {
    // console.log('its a block');
    endpoint = 'ledger/get/block';
    params = { height: address, verbose: 'detail' };
  }

  console.log(endpoint, params);
  const res = await axios.get(`${process.env.NEXUS_BASE_URL}/${endpoint}`, {
    params: params,
  });
  const data = await res.data;

  if (!data) {
    return {
      notFound: true,
    };
  }
  //   console.log(data);
  return {
    props: {
      response: data,
    },
  };
};
