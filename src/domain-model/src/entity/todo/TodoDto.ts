import { IllegalArgumentError, PropertyRequiredError } from 'common';

export enum TodoStatus {
  Undone = 'UNDONE',
  Done = 'DONE',
}

export type TodoDto = {
  id: string;
  ownerId: string;
  title: string;
  status: TodoStatus;
  dueDate?: Date | null;
};

const TodoStatusStrings = Object.values(TodoStatus) as string[];

export const denyIllegalTodoStatus = (status: string) => {
  if (!TodoStatusStrings.includes(status)) {
    return new IllegalArgumentError('不正なstatusが指定されています');
  }
};

export const denyIllegalTodoDto = (todo: TodoDto) => {
  if (!todo) throw new PropertyRequiredError('todo');
  if (!todo.id) throw new PropertyRequiredError('id');
  if (!todo.ownerId) throw new PropertyRequiredError('ownerId');
  if (!todo.title) throw new PropertyRequiredError('title');
  if (!todo.status) throw new PropertyRequiredError('status');
  denyIllegalTodoStatus(todo.status);
};
