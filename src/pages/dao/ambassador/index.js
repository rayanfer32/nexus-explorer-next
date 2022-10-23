import PageHeader from 'components/Header/PageHeader';
import Layout from 'components/Layout';
import { DaoInfo } from 'components/Views/Dao';
import React from 'react';
import TYPES from 'types';
import { DAO_AMBASSADORS } from 'types/DaoAccounts';

function AmbassadorDAOPage() {
  return (
    <Layout>
      <PageHeader title={TYPES.PAGEMETA.DAO.AMBASSADOR.TITLE} />
      <DaoInfo title={'Ambassador DAO'} daoObject={DAO_AMBASSADORS} />
    </Layout>
  );
}

export default AmbassadorDAOPage;
