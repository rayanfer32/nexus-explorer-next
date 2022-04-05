import Head from 'next/head';
import TYPES from 'types';

/**
 * PageHeader component
 * @param {string} page Name of the page
 * @param {string} title Title of the page
 * @param {string} description Description of the page
 */
const PageHeader = ({ page = 'HOME', title, description }) => {
  const _title =
    title || TYPES.PAGEMETA[page.toUpperCase()]?.TITLE || TYPES.PAGEMETA.TITLE;
  const _description =
    description ||
    TYPES.PAGEMETA[page.toUpperCase()]?.DESCRIPTION ||
    TYPES.PAGEMETA.DESCRIPTION;
  const _explorer_domain =
    process.env.NEXT_PUBLIC_DOMAIN_BASE_URL || 'https://explorer.nexus.io';

  return (
    <Head>
      <title key="title">{_title}</title>
      <meta name="description" content={_description} />
      <link rel="canonical" href={_explorer_domain} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={_description} />
      <meta property="og:url" content={_explorer_domain} />
      <meta
        property="og:image"
        content={
          `${_explorer_domain}/og_meta_image.jpg` ||
          'https://explorer.nexus.io/images/social/home.jpg'
        }
      />
      <meta
        property="og:image:secure_url"
        content={
          `${_explorer_domain}/og_meta_image.jpg` ||
          'https://explorer.nexus.io/images/social/home.jpg'
        }
      />
      <meta property="og:title" content={_title} />
      <meta property="og:site_name" content="Nexus" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:description" content={_description} />
      <meta name="twitter:title" content={_title} />
      <meta
        name="twitter:image"
        content={
          `${_explorer_domain}/og_meta_image.jpg` ||
          'https://explorer.nexus.io/images/social/home.jpg'
        }
      />
    </Head>
  );
};

export default PageHeader;
