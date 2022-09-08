import PageHeader from 'components/Header/PageHeader';
import Layout from 'components/Layout';
import BlocksView from 'components/Views/Blocks';

export default function Blocks() {
  return (
    <Layout>
      <PageHeader page="blocks" />
      <BlocksView />
    </Layout>
  );
}
