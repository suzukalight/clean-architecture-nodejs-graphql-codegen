import * as React from 'react';
import { AppProps } from 'next/app';
import { createTheme, Customizer, Fabric, initializeIcons } from '@fluentui/react';

import { ResetStyle, GlobalStyle } from './styled';

initializeIcons();

// Go to aka.ms/themedesigner for more control over theme.
const theme = createTheme({
  palette: {
    themePrimary: '#0078d4',
  },
});

const App = ({ Component, pageProps }: AppProps) => (
  <Customizer settings={{ theme }}>
    <Fabric applyTheme>
      <ResetStyle />
      <GlobalStyle />
      <Component {...pageProps} />
    </Fabric>
  </Customizer>
);

export default App;
