import React, { useContext } from 'react';

import LeftNav from '../../components/LeftNav';
import AddTodo from '../../components/AddTodo';
import TodoList from '../../components/TodoList';

import styles from './index.module.scss';
import { useGetUserTodosQuery, Todo } from '../../generated/graphql-client';
import MemberOnly from '../../components/contexts/AuthContext/MemberOnly';
import { AuthContext } from '../../components/contexts/AuthContext';

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

type IndexProps = {
  todos: Todo[];
};

const Index: React.FC<IndexProps> = ({ todos }) => (
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

const IndexPage: React.FC = () => {
  const { actor } = useContext(AuthContext);
  const id = actor?.id || '';

  const data = useGetUserTodosQuery({ variables: { id }, skip: !id });
  if (!data) return null;

  const { todos } = data?.data?.user || {};
  if (!todos) return null;

  const _todos = (todos || []).filter((t) => !!t) as Todo[];
  return <Index todos={_todos} />;
};

const IndexPageWrap: React.FC = () => (
  <MemberOnly>
    <IndexPage />
  </MemberOnly>
);

export default IndexPageWrap;
