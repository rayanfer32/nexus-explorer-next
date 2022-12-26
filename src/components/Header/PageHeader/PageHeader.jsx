import Head from 'next/head';
import TYPES from 'types';

/**
 * PageHeader component
 * @param {string} page Name of the page
 * @param {string} title Title of the page
 * @param {string} description Description of the page
 * @param {string} ogImage Image url for the meta data
 */
const PageHeader = ({ page = 'HOME', title, description, ogImage }) => {
  const _title =
    title || TYPES.PAGEMETA[page.toUpperCase()]?.TITLE || TYPES.PAGEMETA.TITLE;
  const _description =
    description ||
    TYPES.PAGEMETA[page.toUpperCase()]?.DESCRIPTION ||
    TYPES.PAGEMETA.DESCRIPTION;
  const _explorer_domain = process.env.NEXT_PUBLIC_DOMAIN_BASE_URL || '';
  const _og_image_url = ogImage ?? `${_explorer_domain}/og_meta_image.jpg`;

  return (
    <Head>
      <title key="title">{_title}</title>
      <meta name="description" content={_description} />
      <link rel="canonical" href={_explorer_domain} />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta
        name="keywords"
        content="nexus, explorer, nxs, search, blockchain, nexplorer, quantum resistance"
      />

      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={_title} />
      <meta property="og:site_name" content="Nexus (NXS) Blockchain Explorer" />
      <meta property="og:description" content={_description} />
      <meta property="og:url" content={_explorer_domain} />
      <meta property="og:image" content={_og_image_url} />
      <meta property="og:image:url" content={_og_image_url} />
      <meta property="og:image:secure_url" content={_og_image_url} />
      <meta property="og:image:alt" content="Visit nexus.io" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={_description} />
      <meta name="twitter:title" content={_title} />
      <meta name="twitter:image" content={_og_image_url} />
    </Head>
  );
};

export default PageHeader;
