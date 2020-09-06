import React, { useCallback } from 'react';
import { Stack, TextField, PrimaryButton, Text, IStackTokens } from '@fluentui/react';

import {
  useSignInEmailPasswordMutation,
  SignInEmailPasswordRequest,
} from '../../generated/graphql-client';

import styles from './index.module.scss';

const spacingToken: IStackTokens = {
  childrenGap: 's1',
  padding: 's1 0',
};

type SubmitFunction = (input: SignInEmailPasswordRequest) => void;
type LoginFormProps = {
  onSubmit: SubmitFunction;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => (
  <Stack>
    <Stack tokens={spacingToken}>
      <TextField label="email" placeholder="email" />
    </Stack>
    <Stack tokens={spacingToken}>
      <TextField type="password" label="password" placeholder="password" />
    </Stack>
    <Stack tokens={spacingToken}>
      <PrimaryButton
        onClick={() => onSubmit({ email: 'admin@email.com', password: 'password1234' })}
      >
        ログイン
      </PrimaryButton>
    </Stack>
  </Stack>
);

const Login = () => {
  const [signInEmailPasswordMutation, { data, loading, error }] = useSignInEmailPasswordMutation();

  const handleSubmit = useCallback<SubmitFunction>(
    async (input) => {
      console.log(input);
      const result = await signInEmailPasswordMutation({ variables: { input } }).catch(() => {});
      console.log(result);
    },
    [signInEmailPasswordMutation],
  );

  return (
    <Stack className={styles.wrap}>
      <Stack className={styles.main}>
        <Stack>
          <Text variant="xLarge">TodoApp</Text>
        </Stack>
        <Stack>
          <LoginForm onSubmit={handleSubmit} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;
