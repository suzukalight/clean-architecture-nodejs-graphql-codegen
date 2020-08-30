import * as React from 'react';
import { Stack, Label, Checkbox, List } from '@fluentui/react';

export type TodoItemProps = {
  todo: string;
};

const LabelRenderer = ({ label }) => <Label>{label}</Label>;

export const TodoItem = (item: string, index?: number): JSX.Element => (
  <Stack>
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
