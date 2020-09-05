import * as React from 'react';
import { Stack, Text, Checkbox, List, ICheckboxProps } from '@fluentui/react';

import styles from './index.module.scss';

const LabelRenderer = (props?: ICheckboxProps) => (
  <Text className={styles.label} variant="mediumPlus">
    {props?.label || ''}
  </Text>
);

export type TodoItemProps = {
  todo: string;
};

export const TodoItem = (item?: string): JSX.Element => (
  <Stack className={styles.cell}>
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
    <Stack>
      <Text variant="xLarge">Tasks</Text>
    </Stack>

    <Stack className={styles.list}>
      <List items={todos} onRenderCell={TodoItem} />
    </Stack>
  </Stack>
);

export default TodoList;
