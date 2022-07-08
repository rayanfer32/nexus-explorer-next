import PageHeader from 'components/Header/PageHeader';
import React from 'react';
import TYPES from 'types';
import AmbassadorDao from 'components/Views/AmbassadorDao';

function AmbassadorDAOPage() {
  return (
    <>
      <PageHeader title={TYPES.PAGEMETA.AMBASSADOR_DAO.TITLE} />
      <AmbassadorDao />
    </>
  );
}

export default AmbassadorDAOPage;
