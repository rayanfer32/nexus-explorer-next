import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';
import { ContextWrapper } from 'contexts/AppContext';

function MyApp({ Component, pageProps }) {
  return (
    <ContextWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ContextWrapper>
  );
}

export default MyApp;
