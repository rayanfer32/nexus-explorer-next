import Head from 'next/head';
import Panel1 from 'components/Panel1/Panel1';
import Panel2 from 'components/Panel2/Panel2';
import Panel3 from 'components/Panel3/Panel3';

export default function Home(props) {
  const { chartData, metricsData, infoData, marketData, miningData } = props;
  return (
    <div>
      <Head>
        <title> Nexus Explorer V2 </title>{' '}
        <meta name="description" content="Nexus Blockchain Statistics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Panel1
          chartData={chartData}
          metricsData={metricsData}
          infoData={infoData}
          // marketData={props.marketData}
        />
        <Panel2
          metricsData={metricsData}
          miningData={miningData}
          marketData={marketData}
        />
        <Panel3 />
      </main>
    </div>
  );
}

// export async function getStaticProps() //SSG
export async function getStaticProps() {
  const [chartRes, metricsRes, infoRes, marketRes, miningRes] =
    await Promise.all([
      fetch(
        `${process.env.COINGECKO_BASE_URL}/coins/nexus/market_chart?vs_currency=usd&days=365`
      ),
      fetch(`${process.env.NEXUS_BASE_URL}/system/get/metrics`),
      fetch(`${process.env.NEXUS_BASE_URL}/system/get/info`),
      fetch(`${process.env.COINGECKO_BASE_URL}/coins/nexus`),
      fetch(`${process.env.NEXUS_BASE_URL}/ledger/get/info`),
    ]);

  const [
    chartDataJson,
    metricsDataJson,
    infoDataJson,
    marketDataJson,
    miningDataJson,
  ] = await Promise.all([
    chartRes.json(),
    metricsRes.json(),
    infoRes.json(),
    marketRes.json(),
    miningRes.json(),
  ]);

  return {
    props: {
      chartData: chartDataJson,
      infoData: infoDataJson.result,
      metricsData: metricsDataJson.result,
      marketData: marketDataJson,
      miningData: miningDataJson.result,
    },
    revalidate: 60,
  };
}
