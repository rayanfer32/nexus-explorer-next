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
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.svg" />
          <meta name="theme-color" content={TYPES.COLORS.NEXUS_BLUE} />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content={TYPES.COLORS.NEXUS_BLUE}
          />
          <meta
            name="msapplication-navbutton-color"
            content={TYPES.COLORS.NEXUS_BLUE}
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="application-name" content="Nexplorer" />
          <meta name="apple-mobile-web-app-title" content="Nexplorer" />
          <meta name="msapplication-starturl" content="/" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/icon-192x192.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="192x192"
            href="/icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="256x256"
            href="/icon-256x256.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="256x256"
            href="/icon-256x256.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="384x384"
            href="/icon-384x384.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="384x384"
            href="/icon-384x384.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/icon-512x512.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="512x512"
            href="/icon-512x512.png"
          />
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
