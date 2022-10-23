import PageHeader from 'components/Header/PageHeader';
import Layout from 'components/Layout';
import Metrics from 'components/Views/Metrics';

export default function index() {
  return (
    <Layout>
      <PageHeader page={'metrics'}></PageHeader>
      <Metrics />
    </Layout>
  );
}
