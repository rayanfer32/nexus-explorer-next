import { NE_SmallCard } from '../atoms/NE_Card/NE_SmallCard';
import styles from 'components/Panel1/Panel1.module.scss';
import ChartsApex from 'components/Chart/ChartsApex';
import { useState, useEffect } from 'react';
import Shimmer from 'components/atoms/NE_Shimmer';
import { GrStackOverflow } from 'react-icons/gr';
import { BsPersonCheckFill } from 'react-icons/bs';
import { AiOutlineStock } from 'react-icons/ai';
import { FaCoins } from 'react-icons/fa';
import { useRouter } from 'next/router';

function Panel1(props) {
  const { metricsRQ, infoRQ, miningRQ } = props;
  const router = useRouter();
  const [state, setState] = useState({});

  useEffect(() => {
    if (metricsRQ.data) {
      setState((prev) => ({
        ...prev,
        totalSupply: metricsRQ.data.data.result?.supply?.total?.toFixed(0),
        sigChains: metricsRQ.data.data.result?.sig_chains,
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
  if (miningRQ.isLoading)
    return (
      <article className={styles.container}>
        <section className={styles.cardsContainer}>
          {[...'four'].map((_, idx) => (
            <Shimmer key={idx} minWidth="14.5rem" minHeight="6.25rem" />
          ))}
        </section>
        <section className={styles.chartContainer}>
          <Shimmer height="12.4rem" />
        </section>
      </article>
    );

  if (metricsRQ.isError) return <p>Error...</p>;

  if (metricsRQ.error) {
    return <pre>{JSON.stringify(miningRQ.error, null, 2)}</pre>;
  }

  return (
    <article className={styles.container}>
      <section
        title={'metrics cards container'}
        className={styles.cardsContainer}>
        <NE_SmallCard
          label="Chain Height"
          sublabel="Blocks"
          value={new Intl.NumberFormat('en-US').format(state.blocks)}
          unit="^"
          onClick={() => {
            router.push(`/scan/${state.blocks}`);
          }}
          icon={<GrStackOverflow />}
        />
        <NE_SmallCard
          label="Total Supply"
          value={new Intl.NumberFormat('en-US').format(state.totalSupply)}
          unit="NXS"
          icon={<FaCoins />}
        />
        <NE_SmallCard
          label="Signature Chains"
          sublabel="Users"
          value={new Intl.NumberFormat().format(state.sigChains)}
          icon={<BsPersonCheckFill />}
        />
        <NE_SmallCard
          label="Inflation Rate"
          sublabel="Annual"
          value={state.inflationRate}
          unit="%"
          icon={<AiOutlineStock />}
        />
      </section>
      <section title="chart container" className={styles.chartContainer}>
        <ChartsApex initialData={props.blocks} />
      </section>
    </article>
  );
}

export default Panel1;
