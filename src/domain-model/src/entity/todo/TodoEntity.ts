import { ConflictError } from 'common';

import { TodoDto, TodoStatus, denyIllegalTodoDto } from './TodoDto';
import { ID } from '../common/ID';

export class TodoEntity {
  private id: ID;
  private ownerId: ID;
  private title: string;
  private status: TodoStatus;
  private dueDate: Date | null | undefined;

  constructor(todo: TodoDto) {
    denyIllegalTodoDto(todo);
    this.id = new ID(todo.id);
    this.ownerId = new ID(todo.ownerId);
    this.title = todo.title;
    this.status = todo.status as TodoStatus;
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

  toDto(): TodoDto {
    return {
      id: this.id.toString(),
      ownerId: this.ownerId.toString(),
      title: this.title,
      status: this.status,
      dueDate: this.dueDate,
    };
  }

  isValid() {
    try {
      denyIllegalTodoDto(this.toDto());
    } catch (e) {
      return false;
    }
    return true;
  }
}
