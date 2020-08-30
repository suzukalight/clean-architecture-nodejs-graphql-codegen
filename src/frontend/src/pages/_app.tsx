import * as React from 'react';
import { AppProps } from 'next/app';
import { createTheme, Customizer, Fabric, initializeIcons } from '@fluentui/react';

import './styled.scss';
import '@fluentui/react/dist/css/fabric.css';
import styles from './_app.module.scss';

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
      <div className={styles.wrap}>
        <Component {...pageProps} />
      </div>
    </Fabric>
  </Customizer>
);

export default App;
