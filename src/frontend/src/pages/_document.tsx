import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { Stylesheet, InjectionMode, resetIds } from '@fluentui/react';

type Props = {
  styleTags: string;
};

class Document extends NextDocument<Props> {
  static async getInitialProps(ctx: DocumentContext) {
    // Fluent UI
    const stylesheet = Stylesheet.getInstance();
    stylesheet.setConfig({
      injectionMode: InjectionMode.none,
      namespace: 'server',
    });
    stylesheet.reset();
    resetIds();

    const page = ctx.renderPage((App) => (props) => <App {...props} />);

    return { ...page, styleTags: stylesheet.getRules(true) };
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <style type="text/css" dangerouslySetInnerHTML={{ __html: this.props.styleTags }} />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
