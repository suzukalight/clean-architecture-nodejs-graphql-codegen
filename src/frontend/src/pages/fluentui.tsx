import * as React from 'react';

import LeftNav from '../components/LeftNav';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

import styles from './fluentui.module.scss';

const LeftPane = () => (
  <div className={styles.left}>
    <LeftNav />
  </div>
);

const MainPane = () => (
  <div className={styles.main}>
    <div className={styles.wrap}>
      <TodoList todos={['todo #1', 'todo #2']} />
      <AddTodo onSubmit={(title) => alert(title)} />
    </div>
  </div>
);

const Index = () => (
  <div className="ms-Grid" dir="ltr">
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-sm3">
        <LeftPane />
      </div>
      <div className="ms-Grid-col ms-sm9">
        <MainPane />
      </div>
    </div>
  </div>
);

export default Index;
