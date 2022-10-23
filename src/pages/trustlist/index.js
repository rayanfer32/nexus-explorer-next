import PageHeader from 'components/Header/PageHeader';
import Layout from 'components/Layout';
import Trustlist from 'components/Views/Trustlist';

export default function index() {
  return (
    <Layout>
      <PageHeader page="Trustlist" />
      <Trustlist />
    </Layout>
  );
}
