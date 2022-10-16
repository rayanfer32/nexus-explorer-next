import Head from 'next/head';
import React from 'react';

export async function getServerSideProps({ query }) {
  const { txid, cid } = query ?? {};

  return {
    props: { txid: txid ?? '', cid: cid ?? 0 },
  };
}

export default function OG({ txid, cid }) {
  const imgUrl = `http://localhost:3000/api/static/og-alert?txid=${txid}&cid=${cid}`;

  return (
    <div>
      <Head>
        <title>{txid}</title>
        <meta property="og:image" content={imgUrl}></meta>
      </Head>
    </div>
  );
}
