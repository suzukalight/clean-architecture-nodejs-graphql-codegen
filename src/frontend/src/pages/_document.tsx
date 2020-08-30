import { GetServerSideProps } from 'next';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { Stylesheet, InjectionMode, resetIds } from '@fluentui/react';

type Props = {
  styleTags: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const stylesheet = Stylesheet.getInstance();
  stylesheet.setConfig({
    injectionMode: InjectionMode.none,
    namespace: 'server',
  });
  stylesheet.reset();
  resetIds();

  return { props: { styleTags: stylesheet.getRules(true) } };
};

class Document extends NextDocument<Props> {
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
