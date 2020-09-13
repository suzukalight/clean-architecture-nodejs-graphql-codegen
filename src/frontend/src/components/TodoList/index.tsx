import React, { FC, useCallback } from 'react';
import { Stack, Text, Checkbox, List, ICheckboxProps } from '@fluentui/react';

import {
  Todo,
  TodoStatus,
  useDoneTodoMutation,
  useUndoneTodoMutation,
  DoneTodoRequest,
  UndoneTodoRequest,
} from '../../generated/graphql-client';

import styles from './index.module.scss';

const LabelRenderer = (props?: ICheckboxProps) => (
  <Text className={styles.label} variant="mediumPlus">
    {props?.label || ''}
  </Text>
);

const isDone = (todo?: Todo) => todo && todo.status === TodoStatus.Done;

type DoneFunction = (input: DoneTodoRequest) => void;
type UndoneFunction = (input: UndoneTodoRequest) => void;

type TodoItemProps = {
  todo: Todo;
  onClickDone: DoneFunction;
  onClickUndone: UndoneFunction;
};

export const TodoItem: FC<TodoItemProps> = ({ todo, onClickDone, onClickUndone }) => {
  const handleChange = useCallback(() => {
    if (isDone(todo)) {
      onClickUndone({ id: todo.id });
    } else {
      onClickDone({ id: todo.id });
    }
  }, [todo, onClickDone, onClickUndone]);

  return (
    <Stack className={styles.cell}>
      <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
        <Checkbox
          checked={isDone(todo)}
          label={todo?.title}
          onRenderLabel={LabelRenderer}
          onChange={handleChange}
        />
      </Stack>
    </Stack>
  );
};

type TodoListProps = {
  todos: Todo[];
  onClickDone: DoneFunction;
  onClickUndone: UndoneFunction;
};

const TodoList: FC<TodoListProps> = ({ todos, onClickDone, onClickUndone }) => (
  <Stack>
    <Stack>
      <Text variant="xLarge">Tasks</Text>
    </Stack>

    <Stack className={styles.list}>
      <List
        items={todos}
        onRenderCell={(item) =>
          !item ? null : (
            <TodoItem todo={item} onClickDone={onClickDone} onClickUndone={onClickUndone} />
          )
        }
      />
    </Stack>
  </Stack>
);

type TodoListContainerProps = {
  todos: Todo[];
};

const TodoListContainer: FC<TodoListContainerProps> = ({ todos }) => {
  const [doneTodo] = useDoneTodoMutation();
  const [undoneTodo] = useUndoneTodoMutation();

  const handleDone = useCallback<DoneFunction>(
    async (input) => {
      try {
        await doneTodo({ variables: { input } });
      } catch (e) {
        console.error(e);
      }
    },
    [doneTodo],
  );

  const handleUndone = useCallback<UndoneFunction>(
    async (input) => {
      try {
        await undoneTodo({ variables: { input } });
      } catch (e) {
        console.error(e);
      }
    },
    [doneTodo],
  );

  return <TodoList todos={todos} onClickDone={handleDone} onClickUndone={handleUndone} />;
};

export default TodoListContainer;
