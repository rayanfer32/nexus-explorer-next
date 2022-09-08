import PageHeader from 'components/Header/PageHeader';
import Layout from 'components/Layout';
import NamespacesView from 'components/Views/Namespaces';

export default function Namespaces() {
  return (
    <Layout>
      <PageHeader page={'namespaces'} />
      <NamespacesView />
    </Layout>
  );
}
