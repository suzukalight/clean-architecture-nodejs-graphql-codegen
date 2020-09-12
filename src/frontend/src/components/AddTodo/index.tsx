import * as React from 'react';
import { Stack, Checkbox, TextField } from '@fluentui/react';

import styles from './index.module.scss';

export type AddTodoProps = {
  onSubmit?: (title: string) => void;
};

const LabelRenderer = () => (
  <TextField className={styles.textField} borderless placeholder="Add new item" />
);

const AddTodo: React.FC<AddTodoProps> = () => (
  <Stack>
    <Stack className={styles.cell}>
      <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
        <Checkbox disabled onRenderLabel={LabelRenderer} />
      </Stack>
    </Stack>
  </Stack>
);

export default AddTodo;
