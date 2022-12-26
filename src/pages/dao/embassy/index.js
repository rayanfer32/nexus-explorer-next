import PageHeader from 'components/Header/PageHeader';
import Layout from 'components/Layout';
import { DaoInfo } from 'components/Views/Dao';
import React from 'react';
import TYPES from 'types';
import { DAO_EMBASSY } from 'types/DaoAccounts';

function EmbassyDAOPage() {
  return (
    <Layout>
      <PageHeader title={TYPES.PAGEMETA.DAO.EMBASSY.TITLE} />
      <DaoInfo title={'Embassy DAO'} daoObject={DAO_EMBASSY} />
    </Layout>
  );
}

export default EmbassyDAOPage;
