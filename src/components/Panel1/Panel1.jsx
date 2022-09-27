import { NE_SmallCard } from '../common/NE_Card/NE_SmallCard';
import styles from 'components/Panel1/Panel1.module.scss';
import ChartsApex from 'components/common/NE_Chart/ChartApexArea';
import { useState, useEffect } from 'react';
import Shimmer from 'components/common/NE_Shimmer';
import { GrStackOverflow } from 'react-icons/gr';
import { BsPersonCheckFill } from 'react-icons/bs';
import { AiOutlineStock } from 'react-icons/ai';
import { FaCoins } from 'react-icons/fa';
import { useRouter } from 'next/router';
import ErrorCard from 'components/common/NE_ErrorCard';
import { intlNum } from 'utils';

function Panel1(props) {
  const { metricsRQ, infoRQ, miningRQ } = props;
  const router = useRouter();
  const [state, setState] = useState({
    blocks: '',
    totalSupply: '',
    sigChains: '',
    inflationRate: '',
  });

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
        blocks: infoRQ.data.data.result?.blocks || 0,
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

  if (metricsRQ.isError)
    return (
      <p>
        <ErrorCard />
      </p>
    );

  return (
    <article className={styles.container}>
      <section
        title={'metrics cards container'}
        className={styles.cardsContainer}>
        <NE_SmallCard
          label="Chain Height"
          sublabel="Blocks"
          value={intlNum(state.blocks)}
          unit="^"
          onClick={() => {
            router.push(`/scan/${state.blocks}`);
          }}
          icon={<GrStackOverflow />}
        />
        <NE_SmallCard
          label="Total Supply"
          value={intlNum(state.totalSupply)}
          unit="NXS"
          icon={<FaCoins />}
        />
        <NE_SmallCard
          label="Signature Chains"
          sublabel="Users"
          value={intlNum(state.sigChains)}
          icon={<BsPersonCheckFill />}
        />
        <NE_SmallCard
          label="Inflation Rate"
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
