import styles from './AccountInfo.module.scss';
import { NE_SmallCard as SmallCard } from 'components/common/NE_Card';
import { BsBank, BsFillClockFill } from 'react-icons/bs';
import { FaHandshake, FaUserClock } from 'react-icons/fa';
import { HiChartBar } from 'react-icons/hi';
import { useQuery } from 'react-query';
import { fetchMarket } from 'utils/common/fetch';

export function AccountInfo({ data }) {
  const isTrust = data?.rate === undefined ? false : true;

  const marketRQ = useQuery(['market'], fetchMarket);
  const marketData = marketRQ?.data?.data?.market_data;

  const preferredFiat = 'USD';

  const currentPrice = marketData?.current_price[preferredFiat.toLowerCase()];
  const balanceFiat = (data?.balance * currentPrice || 0).toFixed(2);
  const stakeFiat = (data?.stake * currentPrice || 0).toFixed(2);
  const pendingFiat = (data?.pending * currentPrice || 0).toFixed(2);
  const unconfirmedFiat = (data?.unconfirmed * currentPrice || 0).toFixed(2);

  // todo: dropdown to select preffered fiat conversion.
  function fiatValue(value) {
    return `${new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'USD',
    }).format(value)} USD`;
  }

  return (
    <>
      <section className={styles.cardsContainer}>
        <SmallCard
          label="Balance"
          sublabel={`${fiatValue(balanceFiat)}`}
          value={new Intl.NumberFormat('en-US').format(data?.balance || 0)}
          unit="NXS"
        />
        <SmallCard
          label="Stake"
          sublabel={`${fiatValue(stakeFiat)}`}
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
            sublabel={`${fiatValue(pendingFiat)}`}
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
            sublabel={`${fiatValue(unconfirmedFiat)}`}
            value={data?.unconfirmed || 0}
            unit="NXS"
            icon={<FaUserClock />}
          />
        )}
      </section>
    </>
  );
}
