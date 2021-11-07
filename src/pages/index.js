import Head from 'next/head';
import Panel1 from 'components/Panel1/Panel1';
import Panel2 from 'components/Panel2/Panel2';
export default function Home() {
  return (
    <div>
      <Head>
        <title> Nexus Explorer V2 </title>{' '}
        <meta name="description" content="Nexus Blockchain Statistics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Panel1 />
        <Panel2 />
      </main>
    </div>
  );
}
