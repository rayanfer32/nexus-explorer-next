import PageHeader from 'components/Header/PageHeader';
import Layout from 'components/Layout';
import TokensView from 'components/Views/Tokens';

export default function Tokens() {
  return (
    <Layout>
      <PageHeader page="Tokens" />
      <TokensView />
    </Layout>
  );
}
