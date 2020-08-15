import { TodoStatus, Todo } from 'schema/types';
import { PropertyRequiredError } from 'common/error/PropertyRequired';
import { ConflictError } from 'common/error/Conflict';

import { ID } from '../common/ID';

export const isValidArguments = (todo: Todo) => {
  if (!todo) throw new PropertyRequiredError('todo');
  if (!todo.id) throw new PropertyRequiredError('id');
  if (!todo.ownerId) throw new PropertyRequiredError('ownerId');
  if (!todo.title) throw new PropertyRequiredError('title');
  if (!todo.status) throw new PropertyRequiredError('status');
  return true;
};

export class TodoEntity {
  private id: ID;
  private ownerId: ID;
  private title: string;
  private status: TodoStatus;
  private dueDate: Date | null | undefined;

  constructor(todo: Todo) {
    isValidArguments(todo);
    this.id = new ID(todo.id);
    this.ownerId = new ID(todo.ownerId);
    this.title = todo.title;
    this.status = todo.status;
    this.dueDate = todo.dueDate;
  }

  getId() {
    return this.id;
  }

  getOwnerId() {
    return this.ownerId;
  }

  getTitle() {
    return this.title;
  }

  getStatus() {
    return this.status;
  }

  getDueDate() {
    return this.dueDate;
  }

  setId(id: ID) {
    this.id = id;
    this.isValid();
  }

  setOwnerId(ownerId: ID) {
    this.ownerId = ownerId;
    this.isValid();
  }

  setTitle(title: string) {
    this.title = title;
    this.isValid();
  }

  undone() {
    if (this.getStatus() === TodoStatus.Undone) throw new ConflictError('すでに未完了状態です');
    this.status = TodoStatus.Undone;
  }

  done() {
    if (this.getStatus() === TodoStatus.Done) throw new ConflictError('すでに完了済みです');
    this.status = TodoStatus.Done;
  }

  setDueDate(dueDate: Date) {
    this.dueDate = dueDate;
    this.isValid();
  }

  toJSON(): Todo {
    return {
      id: this.id.toString(),
      ownerId: this.ownerId.toString(),
      title: this.title,
      status: this.status,
      dueDate: this.dueDate,
    };
  }

  isValid() {
    return isValidArguments(this.toJSON());
  }
}
