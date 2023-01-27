import { NE_SmallCard } from '../common/NE_Card/NE_SmallCard';
import styles from 'components/Panel1/Panel1.module.scss';
import ChartsApex from 'components/common/NE_Chart/ChartApexArea';
import { useState, useEffect } from 'react';
import { GrStackOverflow } from 'react-icons/gr';
import { BsPersonCheckFill } from 'react-icons/bs';
import { AiOutlineStock } from 'react-icons/ai';
import { FaCoins } from 'react-icons/fa';
import { useRouter } from 'next/router';
import ErrorCard from 'components/common/NE_ErrorCard';

function isInvalid(value) {
  return value == null || value == '';
}

function Panel1(props) {
  const { metricsRQ, infoRQ, miningRQ } = props;
  const router = useRouter();
  const [state, setState] = useState({});

  useEffect(() => {
    if (miningRQ.data) {
      setState((prev) => ({
        ...prev,
        totalSupply: miningRQ.data.data.result?.supply?.total?.toFixed(0),
        sigChains: metricsRQ.data.data.result?.sigchains,
        inflationRate: miningRQ.data.data.result?.supply?.inflation?.toFixed(2),
      }));
    }

    if (infoRQ.data) {
      setState((prev) => ({
        ...prev,
        blocks: infoRQ.data.data.result?.blocks || 0,
      }));
    }
  }, [metricsRQ.data, infoRQ.data]);

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
          value={new Intl.NumberFormat('en-US').format(state.blocks)}
          unit="^"
          onClick={() => {
            router.push(`/scan/${state.blocks}`);
          }}
          icon={<GrStackOverflow />}
          isLoading={isInvalid(state.blocks)}
        />
        <NE_SmallCard
          label="Total Supply"
          value={new Intl.NumberFormat('en-US').format(state.totalSupply)}
          unit="NXS"
          icon={<FaCoins />}
          isLoading={isInvalid(state.blocks)}
        />
        <NE_SmallCard
          label="Signature Chains"
          sublabel="Users"
          value={new Intl.NumberFormat().format(state.sigChains)}
          icon={<BsPersonCheckFill />}
          isLoading={isInvalid(state.blocks)}
        />
        <NE_SmallCard
          label="Inflation Rate"
          sublabel="Annual"
          value={state.inflationRate}
          unit="%"
          icon={<AiOutlineStock />}
          isLoading={isInvalid(state.blocks)}
        />
      </section>
      <section title="chart container" className={styles.chartContainer}>
        <ChartsApex initialData={props.blocks} />
      </section>
    </article>
  );
}

export default Panel1;
