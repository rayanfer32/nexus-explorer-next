import Document, { Html, Head, Main, NextScript } from 'next/document';
import TYPES from 'types';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body className={TYPES.theme.light}>
          <Main />
          <div id='__portal' />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
