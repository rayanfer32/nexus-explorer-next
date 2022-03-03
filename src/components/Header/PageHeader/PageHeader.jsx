import Head from 'next/head';
import TYPES from 'types';

const PageHeader = ({ page = 'HOME' }) => {
  const title =
    TYPES.PAGEMETA[page.toUpperCase()]?.TITLE || TYPES.PAGEMETA.TITLE;
  const description =
    TYPES.PAGEMETA[page.toUpperCase()]?.DESCRIPTION ||
    TYPES.PAGEMETA.DESCRIPTION;
  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default PageHeader;
