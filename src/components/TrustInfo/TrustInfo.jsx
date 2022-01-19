import React,{useEffect} from 'react';
import SmallCard from 'components/atoms/SmallCard';
import styles from './TrustInfo.module.scss';
import { useQuery } from 'react-query';
import axios from 'axios';

export default function TrustInfo({ data }) {
  const trustTransactionsRQ = useQuery('trustTransactions', async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/finance/transactions/trust`,
      {
        params: {
          address: data?.address,
          limit: 100,
        },
      }
    );
    return res.data;
  });

  useEffect(() => {
    console.log(data.address);
    trustTransactionsRQ.refetch();
  },[data.address])
 

  return (
    <div>
      <h1>Trust Info</h1>
      <section className={styles.cardsContainer}>
        <SmallCard
          label="Balance"
          sublabel="Current"
          text={new Intl.NumberFormat('en-US').format(data?.balance)}
          ticker="NXS"
          // link={`/scan/${state.blocks}`}
          // icon={<GrStackOverflow />}
        />
        <SmallCard
          label="Stake"
          //   sublabel="in NXS"
          text={new Intl.NumberFormat('en-US').format(data?.stake || 0)}
          ticker="NXS"
          // icon={<FaCoins />}
        />
        <SmallCard
          label="Pending"
          sublabel=""
          text={new Intl.NumberFormat().format(data?.pending || 0)}
          ticker="NXS"
          // icon={<BsPersonCheckFill />}
        />
        <SmallCard
          label="Unconfirmed"
          sublabel=""
          text={data?.unconfirmed || 0}
          ticker="NXS"
          // icon={<AiOutlineStock />}
        />
      </section>
      <h1>Transaction Details</h1>
      <pre style={{height: "10rem", overflow: "scroll"}}>{JSON.stringify(trustTransactionsRQ.data, null , 2)}</pre>
    </div>
  );
}
