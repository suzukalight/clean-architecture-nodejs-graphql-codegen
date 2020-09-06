import * as React from 'react';
import { Stack, TextField, PrimaryButton, Text, IStackTokens } from '@fluentui/react';

import styles from './index.module.scss';

const spacingToken: IStackTokens = {
  childrenGap: 's1',
  padding: 's1 0',
};

const LoginForm = () => (
  <Stack>
    <Stack tokens={spacingToken}>
      <TextField label="email" placeholder="email" />
    </Stack>
    <Stack tokens={spacingToken}>
      <TextField type="password" label="password" placeholder="password" />
    </Stack>
    <Stack tokens={spacingToken}>
      <PrimaryButton>ログイン</PrimaryButton>
    </Stack>
  </Stack>
);

const Login = () => {
  return (
    <Stack className={styles.wrap}>
      <Stack className={styles.main}>
        <Stack>
          <Text variant="xLarge">TodoApp</Text>
        </Stack>
        <Stack>
          <LoginForm />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;
