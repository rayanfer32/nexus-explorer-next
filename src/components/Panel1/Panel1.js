import SmallCard from '../atoms/SmallCard';
import styles from 'components/Panel1/Panel1.module.css';
import ChartsApex from 'components/Chart/ChartsApex';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

function Panel1(props) {
  const { metricsRQ, infoRQ, marketRQ, miningRQ } = props;

  const [state, setState] = useState({});

  //  * majority of data is coming from metricsRQ , hence we use loader state of metrics for this panel
  if (metricsRQ.isLoading) return <p>Loading...</p>;

  if (metricsRQ.isError) return <p>Error...</p>;

  if (metricsRQ.error) {
    console.log(miningRQ.error);
    return <pre>{JSON.stringify(miningRQ.error, null, 2)}</pre>;
  }

  // if (infoRQ.data) {
  //   setState((prev) => ({
  //     ...prev,
  //     blocks: infoRQ.data.data.result.blocks,
  //   }));
  // }

  // debugger;
  const { isData } = metricsRQ;
  useEffect(() => {
    // console.log(metricsRQ.data);
  }, []);
  
  // if (metricsRQ.isData) {
  //   // debugger;
  //   console.log(metricsRQ.data);
  //   setState((prev) => ({
  //     ...prev,
  //     totalSupply: metricsRQ.data.data.result?.supply?.total?.toFixed(0),
  //     accountRegisters: metricsRQ.data.data.result?.registers?.account,
  //     inflationRate:
  //       metricsRQ.data.data.result?.supply?.inflationrate?.toFixed(2),
  //   }));
  // }

  if (metricsRQ.data) {
    return (
      <article className={styles.container}>
        <section className={styles.cardsContainer}>
          <SmallCard
            label="Chain Height"
            sublabel="Blocks"
            text={new Intl.NumberFormat('en-US').format(state.blocks)}
            ticker="^"
            link={`/scan/${state.blocks}`}
          />
          <SmallCard
            label="Total Supply"
            //   sublabel="in NXS"
            text={new Intl.NumberFormat('en-US').format(state.totalSupply)}
            ticker="NXS"
          />
          <SmallCard
            label="Account Registers"
            sublabel="Users"
            text={new Intl.NumberFormat().format(state.accountRegisters)}
            ticker=""
          />
          <SmallCard
            label="Inflation Rate"
            sublabel="Annual"
            text={state.inflationRate}
            ticker="%"
          />
        </section>
        <section className={styles.chartContainer}>
          <ChartsApex />
        </section>
      </article>
    );
  }
}

export default Panel1;
