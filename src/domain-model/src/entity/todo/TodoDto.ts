import { IllegalArgumentError, PropertyRequiredError } from 'common';

import { TimeStampTypes, denyDoesNotHaveRequiredProperties } from '../utils';

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
} & TimeStampTypes;

const TodoStatusStrings = Object.values(TodoStatus) as string[];

export const denyIllegalTodoStatus = (status: string) => {
  if (!TodoStatusStrings.includes(status)) {
    return new IllegalArgumentError('不正なstatusが指定されています');
  }
};

export const denyIllegalTodoDto = (todo: TodoDto) => {
  if (!todo) throw new PropertyRequiredError('todo');
  denyDoesNotHaveRequiredProperties(todo, ['id', 'ownerId', 'title', 'status']);
  denyIllegalTodoStatus(todo.status);
};
