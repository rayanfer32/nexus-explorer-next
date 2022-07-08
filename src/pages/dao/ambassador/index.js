import PageHeader from 'components/Header/PageHeader';
import { AmbassadorDao } from 'components/Views/Dao/AmbassadorDao';
import React from 'react';
import TYPES from 'types';

function AmbassadorDAOPage() {
  return (
    <>
      <PageHeader title={TYPES.PAGEMETA.DAO.AMBASSADOR.TITLE} />
      <AmbassadorDao />
    </>
  );
}

export default AmbassadorDAOPage;
