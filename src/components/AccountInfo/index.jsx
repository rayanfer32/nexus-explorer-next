import styles from './AccountInfo.module.scss';
import SmallCard from 'components/atoms/SmallCard'
import React from 'react'

export default function AccountInfo({data}) {


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
      {/* {JSON.stringify(data, null, 2)} */}
    </div>
  )
}
