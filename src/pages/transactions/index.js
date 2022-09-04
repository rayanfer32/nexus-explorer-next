import PageHeader from 'components/Header/PageHeader';
import Layout from 'components/Layout';
import TransactionsView from 'components/Views/Transactions';

export default function Transactions() {
  return (
    <Layout>
      <PageHeader page={'transactions'} />
      <TransactionsView />
    </Layout>
  );
}
