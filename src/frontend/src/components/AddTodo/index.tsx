import * as React from 'react';
import { Stack, TextField, PrimaryButton } from '@fluentui/react';

export type AddTodoProps = {
  onSubmit: (title: string) => void;
};

const AddTodo: React.FC<AddTodoProps> = ({ onSubmit }) => (
  <Stack>
    <Stack horizontal>
      <Stack.Item grow>
        <TextField placeholder="Add new item" />
      </Stack.Item>
      <PrimaryButton onClick={() => onSubmit('added')}>Add</PrimaryButton>
    </Stack>
  </Stack>
);

export default AddTodo;
