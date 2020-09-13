import React, { FC, useCallback, useContext } from 'react';
import { Stack, Checkbox } from '@fluentui/react';
import { Formik, Form, Field, FormikHelpers } from 'formik';

import { useCreateTodoMutation, CreateTodoRequest } from '../../generated/graphql-client';
import { FormikTextField } from '../../components/_formik/TextField';
import { createTodoValidationSchema } from './validation';

import styles from './index.module.scss';
import { AuthContext } from '../contexts/AuthContext';

type CreateTodoFunction = (
  input: CreateTodoRequest,
  formikHelpers: FormikHelpers<CreateTodoRequest>,
) => void;
type CreateTodoFormProps = {
  initialValues: CreateTodoRequest;
  onSubmit: CreateTodoFunction;
};

const LabelRenderer: FC<CreateTodoFormProps> = ({ onSubmit, initialValues }) => (
  <Formik
    onSubmit={onSubmit}
    initialValues={initialValues}
    validationSchema={createTodoValidationSchema}
  >
    {() => (
      <Form>
        <Field
          component={FormikTextField}
          className={styles.textField}
          name="title"
          placeholder="Add new item"
          borderless
        />
      </Form>
    )}
  </Formik>
);

type AddTodoProps = {
  initialValues: CreateTodoRequest;
  onSubmit: CreateTodoFunction;
};

const AddTodo: FC<AddTodoProps> = ({ initialValues, onSubmit }) => (
  <Stack>
    <Stack className={styles.cell}>
      <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
        <Checkbox
          disabled
          onRenderLabel={() => <LabelRenderer initialValues={initialValues} onSubmit={onSubmit} />}
        />
      </Stack>
    </Stack>
  </Stack>
);

const AddTodoContainer: FC = () => {
  const { actor } = useContext(AuthContext);
  const [createTodo] = useCreateTodoMutation({
    refetchQueries: ['GetUserTodos'],
  });

  const handleSubmit = useCallback<CreateTodoFunction>(
    async (input, { resetForm }) => {
      try {
        await createTodo({ variables: { input } });
        resetForm();
      } catch (e) {
        console.error(e);
      }
    },
    [createTodo],
  );

  const initialValues = {
    ownerId: actor?.id || '',
    title: '',
  };

  return <AddTodo initialValues={initialValues} onSubmit={handleSubmit} />;
};

export default AddTodoContainer;
