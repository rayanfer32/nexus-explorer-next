import PageHeader from 'components/Header/PageHeader';
import Layout from 'components/Layout';
import { DaoInfo } from 'components/Views/Dao';
import TYPES from 'types';

function EmbassyDAOPage({ daoObject }) {
  return (
    <Layout>
      <PageHeader title={TYPES.PAGEMETA.DAO.EMBASSY.TITLE} />
      <DaoInfo title={'Embassy DAO'} daoObject={daoObject} />
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_BASE_URL}/embassy.json`
  );
  const data = await resp.json();

  return {
    props: {
      daoObject: data,
    },
  };
};

export default EmbassyDAOPage;
