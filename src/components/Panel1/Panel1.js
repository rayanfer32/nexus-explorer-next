import SmallCard from '../atoms/SmallCard';
import styles from 'components/Panel1/Panel1.module.css';
import ChartsApex from 'components/Chart/ChartsApex';
import { useState, useEffect } from 'react';
import Loader from 'components/atoms/NE_Loader';
// import { useQuery } from 'react-query';
// import axios from 'axios';
import {GrStackOverflow} from 'react-icons/gr';
import {BsPersonCheckFill} from 'react-icons/bs';
import {AiOutlineStock} from 'react-icons/ai';
import {FaCoins} from 'react-icons/fa';

function Panel1(props) {
  const { metricsRQ, infoRQ, marketRQ, miningRQ } = props;

  const [state, setState] = useState({});

  useEffect(() => {
    console.log('isData=', metricsRQ.isData);
    if (metricsRQ.data) {
      console.log('=-======', metricsRQ.data);
      setState((prev) => ({
        ...prev,
        totalSupply: metricsRQ.data.data.result?.supply?.total?.toFixed(0),
        accountRegisters: metricsRQ.data.data.result?.registers?.account,
        inflationRate:
          metricsRQ.data.data.result?.supply?.inflationrate?.toFixed(2),
      }));
    }

    if (infoRQ.data) {
      setState((prev) => ({
        ...prev,
        blocks: infoRQ.data.data.result?.blocks,
      }));
    }
  }, [metricsRQ.data, infoRQ.data]);

  //  * majority of data is coming from metricsRQ , hence we use loader state of metrics for this panel
  if (metricsRQ.isLoading)
    return (
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          minHeight: '200px',
          margin: 'auto',
        }}>
        <Loader type="circle" size="5rem" />
      </div>
    );

  if (metricsRQ.isError) return <p>Error...</p>;

  if (metricsRQ.error) {
    console.log(miningRQ.error);
    return <pre>{JSON.stringify(miningRQ.error, null, 2)}</pre>;
  }

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
            icon={<GrStackOverflow/>}
          />
          <SmallCard
            label="Total Supply"
            //   sublabel="in NXS"
            text={new Intl.NumberFormat('en-US').format(state.totalSupply)}
            ticker="NXS"
            icon={<FaCoins/>}
          />
          <SmallCard
            label="Account Registers"
            sublabel="Users"
            text={new Intl.NumberFormat().format(state.accountRegisters)}
            ticker=""
            icon={<BsPersonCheckFill/>}
          />
          <SmallCard
            label="Inflation Rate"
            sublabel="Annual"
            text={state.inflationRate}
            ticker="%"
            icon={<AiOutlineStock/>}
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
