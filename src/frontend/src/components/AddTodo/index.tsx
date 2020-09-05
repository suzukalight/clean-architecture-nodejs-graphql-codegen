import * as React from 'react';
import { Stack, Checkbox, ICheckboxProps, Text, TextField, PrimaryButton } from '@fluentui/react';

import styles from './index.module.scss';

export type AddTodoProps = {
  onSubmit: (title: string) => void;
};

const LabelRenderer = (props?: ICheckboxProps) => (
  <TextField className={styles.textField} borderless placeholder="Add new item" />
);

const AddTodo: React.FC<AddTodoProps> = ({ onSubmit }) => (
  <Stack>
    <Stack className={styles.cell}>
      <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
        <Checkbox disabled onRenderLabel={LabelRenderer} />
      </Stack>
    </Stack>
  </Stack>
);

export default AddTodo;
