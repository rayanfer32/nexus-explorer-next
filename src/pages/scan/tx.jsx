import Head from 'next/head';
import React from 'react';
import { Log } from 'utils';

export async function getServerSideProps({ query }) {
  Log('[query]', query);
  const { txid, cid } = query ?? {};

  return {
    props: { txid: txid ?? '', cid: cid ?? 0 },
  };
}

export default function OG({ txid, cid }) {
  const imgUrl = `http://localhost:3000/api/alert-bot-og?txid=${txid}&cid=${cid}`;

  return (
    <div>
      <Head>
        <title>{txid}</title>
        <meta property="og:image" content={imgUrl}></meta>
      </Head>
    </div>
  );
}
