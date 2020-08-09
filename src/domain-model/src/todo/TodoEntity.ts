import { ID } from '../common/ID';
import { PropertyRequiredError } from 'common/error/PropertyRequired';
import { TodoStatus, Todo } from '../types';

export const isValidArguments = (todo: Todo) => {
  if (!todo) throw new PropertyRequiredError('user');
  if (!todo.id) throw new PropertyRequiredError('id');
  if (!todo.title) throw new PropertyRequiredError('title');
  if (!todo.status) throw new PropertyRequiredError('status');
  return true;
};

export class TodoEntity {
  private id: ID;
  private title: string;
  private status: TodoStatus;
  private dueDate: Date | null | undefined;

  constructor(todo: Todo) {
    isValidArguments(todo);
    this.id = new ID(todo.id);
    this.title = todo.title;
    this.status = todo.status;
    this.dueDate = todo.dueDate;
  }

  getID() {
    return this.id;
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

  setTitle(title: string) {
    this.title = title;
    this.isValid();
  }

  undone() {
    this.status = TodoStatus.Undone;
  }

  done() {
    this.status = TodoStatus.Done;
  }

  setDueDate(dueDate: Date) {
    this.dueDate = dueDate;
    this.isValid();
  }

  toJSON(): Todo {
    return {
      id: this.id.toString(),
      title: this.title,
      status: this.status,
      dueDate: this.dueDate,
    };
  }

  isValid() {
    return isValidArguments(this.toJSON());
  }
}
