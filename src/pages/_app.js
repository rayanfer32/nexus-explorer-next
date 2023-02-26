import 'styles/globals.scss';
import { ContextWrapper } from 'contexts/AppContext';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { IconContext } from 'react-icons';
import TYPES from 'types';
import { AnimatePresence } from 'framer-motion';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps, router }) {
  return (
    <ContextWrapper>
      <IconContext.Provider
        value={{
          color: TYPES.COLORS.NEXUS_BLUE,
          size: '1.5rem',
          style: { verticalAlign: 'middle' },
        }}>
        <QueryClientProvider client={queryClient}>
          <AnimatePresence
            mode="sync"
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}>
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
          <ReactQueryDevtools position="bottom-right" />
        </QueryClientProvider>
      </IconContext.Provider>
    </ContextWrapper>
  );
}

export default MyApp;
