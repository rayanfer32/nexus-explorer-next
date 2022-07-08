import PageHeader from 'components/Header/PageHeader';
import React from 'react';
import TYPES from 'types';
import { DeveloperDao } from 'components/Views/Dao/DeveloperDao';

function DevloperDAOPage() {
  return (
    <>
      <PageHeader title={TYPES.PAGEMETA.DAO.DEVELOPER.TITLE} />
      <DeveloperDao />
    </>
  );
}

export default DevloperDAOPage;
