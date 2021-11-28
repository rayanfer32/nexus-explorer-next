import SmallCard from '../atoms/SmallCard';
import styles from 'components/Panel1/Panel1.module.css';
import ChartsApex from 'components/Chart/ChartsApex';
function Panel1({ chartData, metricsData, infoData }) {
  //   console.log(infoData);
  return (
    <article className={styles.container}>
      <section className={styles.cardsContainer}>
        <SmallCard
          label="Chain Height"
          sublabel="Blocks"
          text={new Intl.NumberFormat('en-US').format(infoData.blocks)}
          ticker="^"
        />
        <SmallCard
          label="Total Supply"
          //   sublabel="in NXS"
          text={new Intl.NumberFormat('en-US').format(
            metricsData.supply.total.toFixed(0)
          )}
          ticker="NXS"
        />
        <SmallCard
          label="Account Registers"
          sublabel="Users"
          text={new Intl.NumberFormat().format(metricsData.registers.account)}
          ticker=""
        />
        <SmallCard
          label="Inflation Rate"
          sublabel="Annual"
          text={`${metricsData.supply.inflationrate.toFixed(2)}`}
          ticker="%"
        />
      </section>
      <section className={styles.chartContainer}>
        <ChartsApex />
      </section>
    </article>
  );
}

export default Panel1;
