import React, { useCallback, useContext } from 'react';
import { Stack, PrimaryButton, Text, IStackTokens } from '@fluentui/react';
import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/router';

import {
  useSignInEmailPasswordMutation,
  SignInEmailPasswordRequest,
} from '../../../generated/graphql-client';
import { loginValidationSchema } from './validation';
import { FormikTextField } from '../../_formik/TextField';
import { AuthContext } from '../../contexts/AuthContext';

import styles from './index.module.scss';

const spacingToken: IStackTokens = {
  childrenGap: 's1',
  padding: 's1 0',
};

type SubmitFunction = (input: SignInEmailPasswordRequest) => void;
type LoginFormProps = {
  initialValues: SignInEmailPasswordRequest;
  onSubmit: SubmitFunction;
};

const LoginForm: React.FC<LoginFormProps> = ({ initialValues, onSubmit }) => (
  <Formik
    onSubmit={onSubmit}
    initialValues={initialValues}
    validationSchema={loginValidationSchema}
  >
    {({ isSubmitting, isValid }) => (
      <Form>
        <Stack>
          <Stack tokens={spacingToken}>
            <Field component={FormikTextField} name="email" label="email" placeholder="email" />
          </Stack>
          <Stack tokens={spacingToken}>
            <Field
              component={FormikTextField}
              name="password"
              type="password"
              label="password"
              placeholder="password"
            />
          </Stack>
          <Stack tokens={spacingToken}>
            <PrimaryButton type="submit" disabled={isSubmitting || !isValid}>
              ログイン
            </PrimaryButton>
          </Stack>
        </Stack>
      </Form>
    )}
  </Formik>
);

const Login = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [signInEmailPasswordMutation] = useSignInEmailPasswordMutation();

  const handleSubmit = useCallback<SubmitFunction>(
    async (input) => {
      try {
        await login(input);
        router.push('/todos');
      } catch (e) {
        console.error(e);
      }
    },
    [signInEmailPasswordMutation],
  );

  const initialValues = {
    email: '',
    password: '',
  };

  return (
    <Stack className={styles.wrap}>
      <Stack className={styles.main}>
        <Stack>
          <Text variant="xLarge">TodoApp</Text>
        </Stack>
        <Stack>
          <LoginForm initialValues={initialValues} onSubmit={handleSubmit} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;
