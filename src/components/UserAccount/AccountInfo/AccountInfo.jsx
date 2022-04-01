import styles from './AccountInfo.module.scss';
import { NE_SmallCard as SmallCard } from 'components/atoms/NE_Card';
import { BsBank, BsFillClockFill } from 'react-icons/bs';
import { FaHandshake, FaUserClock } from 'react-icons/fa';
import { HiChartBar } from 'react-icons/hi';
import { intlNum } from 'utils';

export function AccountInfo({ data }) {
  const isTrust = data?.rate === null ? false : true;

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
        {isTrust ? (
          <SmallCard
            label="Stake Rate"
            sublabel=""
            value={data.rate || 0}
            unit="%"
            icon={<HiChartBar />}
          />
        ) : (
          <SmallCard
            label="Pending"
            sublabel=""
            value={new Intl.NumberFormat().format(data?.pending || 0)}
            unit="NXS"
            icon={<BsFillClockFill />}
          />
        )}
        {isTrust ? (
          <SmallCard
            label="Trust Score"
            sublabel=""
            value={data?.trust || 0}
            unit="+"
            icon={<FaHandshake />}
          />
        ) : (
          <SmallCard
            label="Unconfirmed"
            sublabel=""
            value={data?.unconfirmed || 0}
            unit="NXS"
            icon={<FaUserClock />}
          />
        )}
      </section>
    </>
  );
}
