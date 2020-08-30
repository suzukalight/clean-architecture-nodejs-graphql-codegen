import { AppProps } from 'next/app';

import { ResetStyle, GlobalStyle } from './styled';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <ResetStyle />
    <GlobalStyle />
    <Component {...pageProps} />
  </>
);

export default App;
