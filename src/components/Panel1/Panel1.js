import SmallCard from '../atoms/SmallCard';
import Charts3 from 'components/Chart/Charts3';
import styles from 'components/Panel1/Panel1.module.css';

function Panel1({ chartData, metricsData, infoData }) {
  //   console.log(infoData);
  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        <SmallCard
          label="ChainHeight"
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
          text={new Intl.NumberFormat().format(metricsData.registers.total)}
          ticker=""
        />
        <SmallCard
          label="Inflation Rate"
          sublabel="Annual"
          text={`${metricsData.supply.inflationrate.toFixed(2)}`}
          ticker="%"
        />
      </div>
      <Charts3 chartData={chartData} />
    </div>
  );
}

export default Panel1;
