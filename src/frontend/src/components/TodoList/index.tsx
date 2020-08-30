import * as React from 'react';
import { Stack, Label, Checkbox, List, ICheckboxProps } from '@fluentui/react';

import styles from './index.module.scss';

const LabelRenderer = (props?: ICheckboxProps) => (
  <Label className={styles.itemLabel}>{props?.label || ''}</Label>
);

export type TodoItemProps = {
  todo: string;
};

export const TodoItem = (item?: string): JSX.Element => (
  <Stack className={styles.itemCell}>
    <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
      <Checkbox label={item} onRenderLabel={LabelRenderer} />
    </Stack>
  </Stack>
);

export type TodoListProps = {
  todos: string[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <Stack>
    <List items={todos} onRenderCell={TodoItem} />
  </Stack>
);

export default TodoList;
