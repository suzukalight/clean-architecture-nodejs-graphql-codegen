import * as React from 'react';
import { AppProps } from 'next/app';
import { createTheme, Customizer, Fabric, initializeIcons } from '@fluentui/react';

import './styled.scss';
import '@fluentui/react/dist/css/fabric.css';
import styles from './_app.module.scss';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '../components/contexts/AuthContext';
import { client } from '../libraries/apollo-client';

initializeIcons();

// Go to aka.ms/themedesigner for more control over theme.
const theme = createTheme({
  palette: {
    themePrimary: '#323130',
    themeLighterAlt: '#e7e6e5',
    themeLighter: '#d0cfce',
    themeLight: '#bab8b7',
    themeTertiary: '#a3a2a0',
    themeSecondary: '#8d8b8a',
    themeDarkAlt: '#767573',
    themeDark: '#605e5d',
    themeDarker: '#494847',
  },
});

const App = ({ Component, pageProps }: AppProps) => (
  <Customizer settings={{ theme }}>
    <Fabric applyTheme>
      <ApolloProvider client={client}>
        <AuthProvider>
          <div className={styles.wrap}>
            <Component {...pageProps} />
          </div>
        </AuthProvider>
      </ApolloProvider>
    </Fabric>
  </Customizer>
);

export default App;
