import SmallCard from '../atoms/SmallCard';
import Charts3 from 'components/Chart/Charts3';
import styles from 'components/Panel1/Panel1.module.css';

function Panel1() {
  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        <SmallCard
          label="ChainHeight"
          sublabel="(Blocks)"
          text="0.72"
          ticker="$"
        />
        <SmallCard
          label="Total Supply"
          sublabel="in NXS"
          text="561525"
          ticker="$"
        />
        <SmallCard
          label="Max Supply"
          sublabel="0.0000032BTC"
          text="74254654"
          ticker="NXS"
        />
        <SmallCard
          label="Total Ciculation"
          sublabel="0.0000032BTC"
          text="76546498"
          ticker="NXS"
        />
      </div>
      <Charts3 />
    </div>
  );
}

export default Panel1;
