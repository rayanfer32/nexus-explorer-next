import styles from './AccountInfo.module.scss';
import SmallCard from 'components/atoms/SmallCard';
import React from 'react';

export default function AccountInfo({ data }) {
  return (
    <div>
      <h1>Account Info</h1>
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

      <h1>Account Details</h1>
      <div className={styles.details}>
        <section className={styles.details__text}>
          <div>Address: {data.address}</div>
          <div>Owner: {data.owner}</div>
          <div>
            Created On: {new Date(data.created * 1000).toLocaleString()}
          </div>
          <div>
            Last Modified: {new Date(data.modified * 1000).toLocaleString()}
          </div>
          <div>Name: {data.name}</div>
          <div>Token Name: {data.token}</div>
          <div>Ticker: {data.ticker}</div>
        </section>
        <section>
          <div className={styles.qrCode}>QR code</div>
        </section>
      </div>

      {/* {JSON.stringify(data, null, 2)} */}
    </div>
  );
}
