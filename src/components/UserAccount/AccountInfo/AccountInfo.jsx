import styles from './AccountInfo.module.scss';
import { NE_SmallCard as SmallCard } from 'components/atoms/NE_Card';
import { BsBank, BsFillClockFill } from 'react-icons/bs';
import { FaUserClock } from 'react-icons/fa';

export function AccountInfo({ data }) {
  return (
    <>
      <section className={styles.cardsContainer}>
        <SmallCard
          label="Balance"
          sublabel="Current"
          value={new Intl.NumberFormat('en-US').format(data?.balance)}
          unit="NXS"
        />
        <SmallCard
          label="Stake"
          sublabel=""
          value={new Intl.NumberFormat('en-US').format(data?.stake || 0)}
          unit="NXS"
          icon={<BsBank />}
        />
        <SmallCard
          label="Pending"
          sublabel=""
          value={new Intl.NumberFormat().format(data?.pending || 0)}
          unit="NXS"
          icon={<BsFillClockFill />}
        />
        <SmallCard
          label="Unconfirmed"
          sublabel=""
          value={data?.unconfirmed || 0}
          unit="NXS"
          icon={<FaUserClock />}
        />
      </section>
    </>
  );
}
