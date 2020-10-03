import React, { useContext } from 'react';

import LeftNav from '../../organisms/LeftNav';
import AddTodo from '../../organisms/AddTodo';
import TodoList from '../../organisms/TodoList';
import MemberOnly from '../../contexts/AuthContext/MemberOnly';
import { AuthContext } from '../../contexts/AuthContext';

import { useGetUserTodosQuery, Todo } from '../../../generated/graphql-client';

import styles from './index.module.scss';

const LeftPane = () => (
  <div className={styles.left}>
    <LeftNav />
  </div>
);

type MainPaneProps = {
  todos: Todo[];
};

const MainPane: React.FC<MainPaneProps> = ({ todos }) => (
  <div className={styles.main}>
    <div className={styles.wrap}>
      <TodoList todos={todos} />
      <AddTodo />
    </div>
  </div>
);

type TodosProps = {
  todos: Todo[];
};

const Todos: React.FC<TodosProps> = ({ todos }) => (
  <div className="ms-Grid" dir="ltr">
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm3">
        <LeftPane />
      </div>
      <div className="ms-Grid-col ms-sm9">
        <MainPane todos={todos} />
      </div>
    </div>
  </div>
);

const TodosPageContainer: React.FC = () => {
  const { actor } = useContext(AuthContext);
  const id = actor?.id || '';

  const data = useGetUserTodosQuery({ variables: { id }, skip: !id });
  if (!data) return null;

  const { todos } = data?.data?.user || {};
  if (!todos) return null;

  const _todos = (todos || []).filter((t) => !!t) as Todo[];
  return <Todos todos={_todos} />;
};

export const TodosPage: React.FC = () => (
  <MemberOnly>
    <TodosPageContainer />
  </MemberOnly>
);
