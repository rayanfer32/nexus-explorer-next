import Document, { Html, Head, Main, NextScript } from 'next/document';
import TYPES from 'types';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json"/>
          <link rel="icon" href="/nexus-nxs-logo.svg" />
          <meta name="theme-color" content={TYPES.COLORS.OCEAN_BLUE} />
        </Head>
        <body className={TYPES.THEME.LIGHT}>
          <Main />
          <div id="__portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
