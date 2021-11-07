import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Panel1 from '../components/Panel1/Panel1';

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
      </main>
    </div>
  );
}
