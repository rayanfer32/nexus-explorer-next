import Head from 'next/head';
import Panel1 from 'components/Panel1/Panel1';
import Panel2 from 'components/Panel2/Panel2';
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
      </main>
    </div>
  );
}

// export async function getStaticProps() //SSG
export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.COINGECKO_BASE_URL}/coins/nexus/market_chart?vs_currency=usd&days=365`
  );
  const chartDataJson = await res.json();

  const res2 = await fetch(`${process.env.NEXUS_BASE_URL}/system/get/metrics`);
  const metricsDataJson = await res2.json();

  const res3 = await fetch(`${process.env.NEXUS_BASE_URL}/system/get/info`);
  const infoDataJson = await res3.json();

  const res4 = await fetch(`${process.env.COINGECKO_BASE_URL}/coins/nexus`);
  const marketDataJson = await res4.json();

  const res5 = await fetch(`${process.env.NEXUS_BASE_URL}/ledger/get/info`);
  const miningDataJson = await res5.json();

  return {
    props: {
      chartData: chartDataJson,
      infoData: infoDataJson.result,
      metricsData: metricsDataJson.result,
      marketData: marketDataJson,
      miningData: miningDataJson.result,
    },
  };
}
