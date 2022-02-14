import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document<{ locale?: string }> {
  render() {
    return (
      <Html lang={this.props.locale} data-theme='cyberpunk'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
