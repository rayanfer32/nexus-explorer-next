import PageHeader from 'components/Header/PageHeader';
import { DaoInfo } from 'components/Views/Dao';
import React from 'react';
import TYPES from 'types';
import { DAO_DEVELOPERS } from 'types/DaoAccounts';

function DevloperDAOPage() {
  return (
    <>
      <PageHeader title={TYPES.PAGEMETA.DAO.DEVELOPER.TITLE} />
      <DaoInfo title={'Developer DAO'} daoObject={DAO_DEVELOPERS} />
    </>
  );
}

export default DevloperDAOPage;
