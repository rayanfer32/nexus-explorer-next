import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Scan(props) {
  const router = useRouter();
  const { addr } = router.query;

  return (
    <div>
      <pre style={{ marginLeft: 800 }}>
        {JSON.stringify(props.response, null, 2)}
      </pre>
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
    params = { hash: address };
  } else {
    // console.log('its a block');
    endpoint = 'ledger/get/block';
    params = { height: address };
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
