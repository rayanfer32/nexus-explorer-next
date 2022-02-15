import Layout from 'components/Layout/Layout';
import 'styles/globals.css';
import { ContextWrapper } from 'contexts/AppContext';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { IconContext } from 'react-icons';
import TYPES from 'types';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <ContextWrapper>
      <IconContext.Provider
        value={{
          color: TYPES.COLORS.NEXUS_BLUE,
          size: '1.5rem',
          style: { verticalAlign: 'middle' },
        }}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools position="bottom-right" />
        </QueryClientProvider>
      </IconContext.Provider>
    </ContextWrapper>
  );
}

export default MyApp;
