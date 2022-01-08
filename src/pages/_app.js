import Layout from 'components/Layout/Layout';
import 'styles/globals.css';
import 'styles/antdCustom.css';
import { ContextWrapper } from 'contexts/AppContext';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <ContextWrapper>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
    </ContextWrapper>
  );
}

export default MyApp;
