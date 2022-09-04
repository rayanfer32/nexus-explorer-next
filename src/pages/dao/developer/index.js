import PageHeader from 'components/Header/PageHeader';
import Layout from 'components/Layout';
import { DaoInfo } from 'components/Views/Dao';
import React from 'react';
import TYPES from 'types';
import { DAO_DEVELOPERS } from 'types/DaoAccounts';

function DevloperDAOPage() {
  return (
    <Layout>
      <PageHeader title={TYPES.PAGEMETA.DAO.DEVELOPER.TITLE} />
      <DaoInfo title={'Developer DAO'} daoObject={DAO_DEVELOPERS} />
    </Layout>
  );
}

export default DevloperDAOPage;
