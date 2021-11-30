import Head from 'next/head';
import Panel1 from 'components/Panel1/Panel1';
import Panel2 from 'components/Panel2/Panel2';
import Panel3 from 'components/Panel3/Panel3';
import { useEffect, useState } from 'react';

// fetch all the realtime data ( used also in getStaticProps)
async function fetchLatestData() {
  const [metricsRes, infoRes, marketRes, miningRes] = await Promise.all([
    // fetch(
    //   `${process.env.NEXT_PUBLIC_COINGECKO_BASE_URL}/coins/nexus/market_chart?vs_currency=usd&days=365`
    // ),
    fetch(`${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/system/get/metrics`),
    fetch(`${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/system/get/info`),
    fetch(`${process.env.NEXT_PUBLIC_COINGECKO_BASE_URL}/coins/nexus`),
    fetch(`${process.env.NEXT_PUBLIC_NEXUS_BASE_URL}/ledger/get/info`),
  ]);

  const [
    // chartDataJson,
    metricsDataJson,
    infoDataJson,
    marketDataJson,
    miningDataJson,
  ] = await Promise.all([
    // chartRes.json(),
    metricsRes.json(),
    infoRes.json(),
    marketRes.json(),
    miningRes.json(),
  ]);

  return {
    // chartData,
    metricsData: metricsDataJson.result,
    infoData: infoDataJson.result,
    marketData: marketDataJson,
    miningData: miningDataJson.result,
  };
}

export default function Home(props) {
  const { metricsData, infoData, marketData, miningData } = props;
  const [propState, setPropState] = useState({
    metricsData,
    infoData,
    marketData,
    miningData,
  });

  useEffect(() => {
    const fetchInterval = setInterval(async () => {
      const newProps = await fetchLatestData();
      setPropState({ ...newProps });
    }, 30 * 1000); //call every 30 sec
    return () => {
      clearInterval(fetchInterval);
    };
  }, []);

  return (
    <>
      <Head>
        <title> Nexus Explorer V2 </title>
        <meta name="description" content="Nexus Blockchain Statistics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Panel1
          chartData={propState?.chartData}
          metricsData={propState.metricsData}
          infoData={propState.infoData}
        // marketData={props.marketData}
        />
        <Panel2
          metricsData={propState.metricsData}
          miningData={propState.miningData}
          marketData={propState.marketData}
        />
        <Panel3 />
      </main>
    </>
  );
}

// export async function getStaticProps() //SSG
export async function getStaticProps() {
  const newProps = await fetchLatestData();
  return {
    props: {
      ...newProps,
    },
    revalidate: 30,
  };
}
