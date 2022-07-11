import PageHeader from 'components/Header/PageHeader';
import { DaoInfo } from 'components/Views/Dao';
import React from 'react';
import TYPES from 'types';
import { DAO_AMBASSADORS } from 'types/DaoAccounts';

function AmbassadorDAOPage() {
  return (
    <>
      <PageHeader title={TYPES.PAGEMETA.DAO.AMBASSADOR.TITLE} />
      <DaoInfo title={'Ambassador DAO'} daoObject={DAO_AMBASSADORS} />
    </>
  );
}

export default AmbassadorDAOPage;
