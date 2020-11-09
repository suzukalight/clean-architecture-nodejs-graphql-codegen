import React, { useCallback } from 'react';
import { Stack, PrimaryButton, Text, IStackTokens } from '@fluentui/react';
import { useRouter } from 'next/router';

import { useSignInEmailPasswordMutation } from '../../../generated/graphql-client';
// import { AuthContext } from '../../contexts/AuthContext';

import styles from './index.module.scss';

const spacingToken: IStackTokens = {
  childrenGap: 's1',
  padding: 's1 0',
};

type SubmitFunction = () => void;
type LoginFormProps = {
  onSubmit: SubmitFunction;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => (
  <Stack>
    <Stack tokens={spacingToken}>
      <PrimaryButton type="submit" onClick={() => onSubmit()}>
        ログイン
      </PrimaryButton>
    </Stack>
  </Stack>
);

const Login = () => {
  const router = useRouter();
  // const { login } = useContext(AuthContext);
  const [signInEmailPasswordMutation] = useSignInEmailPasswordMutation();

  const handleSubmit = useCallback<SubmitFunction>(async () => {
    try {
      // await login(input);
      router.push('/todos');
    } catch (e) {
      console.error(e);
    }
  }, [signInEmailPasswordMutation]);

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
