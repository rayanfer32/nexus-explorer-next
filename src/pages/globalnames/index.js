import GlobalNamesView from 'components/Views/GlobalNames';
import PageHeader from 'components/Header/PageHeader';
import Layout from 'components/Layout';

export default function GlobalNames() {
  return (
    <Layout>
      <PageHeader page={'GLOBALNAMES'} />
      <GlobalNamesView />
    </Layout>
  );
}
