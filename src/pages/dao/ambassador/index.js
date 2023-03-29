import PageHeader from 'components/Header/PageHeader';
import Layout from 'components/Layout';
import { DaoInfo } from 'components/Views/Dao';
import React from 'react';
import TYPES from 'types';

function AmbassadorDAOPage({ daoObject }) {
  return (
    <Layout>
      <PageHeader title={TYPES.PAGEMETA.DAO.AMBASSADOR.TITLE} />
      <DaoInfo title={'Ambassador DAO'} daoObject={daoObject} />
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_BASE_URL}/ambassadors.json`
  );
  const data = await resp.json();

  return {
    props: {
      daoObject: data,
    },
  };
};

export default AmbassadorDAOPage;
