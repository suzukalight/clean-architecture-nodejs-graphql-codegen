import { PropertyRequiredError, ConflictError, ID } from 'common';

import { TodoDto, TodoStatus } from '../TodoDto';
import { TodoEntity } from '../TodoEntity';

describe('TodoEntity', () => {
  describe('constructor', () => {
    const todoDto = { id: '1', ownerId: '1', title: 'TODO #1', status: TodoStatus.Undone };

    test('OK: エンティティを生成できた', () => {
      const todo1 = new TodoEntity(todoDto);
      expect(todo1.getId().toString()).toBe(todoDto.id);
      expect(todo1.getTitle().toString()).toBe(todoDto.title);
    });

    test('OK: dueDate込みでエンティティを生成できた', () => {
      const todo1 = new TodoEntity({ ...todoDto, dueDate: new Date('2020-01-01T00:00Z') });
      expect(todo1.getId().toString()).toBe(todoDto.id);
      expect(todo1.getTitle().toString()).toBe(todoDto.title);
    });

    test('NG: idが不足しているため、失敗した', () => {
      const { ownerId, title, status } = todoDto;
      const invalidTodoDto = { ownerId, title, status };
      expect(() => new TodoEntity((invalidTodoDto as unknown) as TodoDto)).toThrow(
        PropertyRequiredError,
      );
    });

    test('NG: ownerIdが不足しているため、失敗した', () => {
      const { id, title, status } = todoDto;
      const invalidTodoDto = { id, title, status };
      expect(() => new TodoEntity((invalidTodoDto as unknown) as TodoDto)).toThrow(
        PropertyRequiredError,
      );
    });

    test('NG: titleが不足しているため、失敗した', () => {
      const { id, ownerId, status } = todoDto;
      const invalidTodoDto = { id, ownerId, status };
      expect(() => new TodoEntity((invalidTodoDto as unknown) as TodoDto)).toThrow(
        PropertyRequiredError,
      );
    });

    test('NG: statusが不足しているため、失敗した', () => {
      const { id, ownerId, title } = todoDto;
      const invalidTodoDto = { id, ownerId, title };
      expect(() => new TodoEntity((invalidTodoDto as unknown) as TodoDto)).toThrow(
        PropertyRequiredError,
      );
    });
  });

  describe('getter/setter', () => {
    const todoDto = { id: '1', ownerId: '1', title: 'TODO #1', status: TodoStatus.Undone };

    test('OK: id', () => {
      const todo = new TodoEntity(todoDto);
      expect(todo.getId().isEqual(todoDto.id)).toBeTruthy();

      const newId = new ID('999');
      todo.setId(newId);
      expect(todo.getId().isEqual(newId)).toBeTruthy();
    });

    test('OK: ownerId', () => {
      const todo = new TodoEntity(todoDto);
      expect(todo.getOwnerId().isEqual(todoDto.id)).toBeTruthy();

      const newOwnerId = new ID('999');
      todo.setOwnerId(newOwnerId);
      expect(todo.getOwnerId().isEqual(newOwnerId)).toBeTruthy();
    });

    test('OK: title', () => {
      const todo = new TodoEntity(todoDto);
      expect(todo.getTitle()).toBe(todoDto.title);

      const newTitle = 'new TODO title';
      todo.setTitle(newTitle);
      expect(todo.getTitle()).toBe(newTitle);
    });

    test('OK: dueDate', () => {
      const dueDate = new Date('2020-01-01T00:00Z');
      const todo = new TodoEntity({ ...todoDto, dueDate });
      expect(todo.getDueDate()).toBe(dueDate);

      const newDueDate = new Date('2020-02-02T00:00Z');
      todo.setDueDate(newDueDate);
      expect(todo.getDueDate()).toBe(newDueDate);
    });

    test('OK: done', () => {
      const todo = new TodoEntity(todoDto);
      expect(todo.getStatus()).toBe(TodoStatus.Undone);

      todo.done();
      expect(todo.getStatus()).toBe(TodoStatus.Done);
    });

    test('OK: undone', () => {
      const todo = new TodoEntity({ ...todoDto, status: TodoStatus.Done });
      expect(todo.getStatus()).toBe(TodoStatus.Done);

      todo.undone();
      expect(todo.getStatus()).toBe(TodoStatus.Undone);
    });

    test('NG: すでにdoneなTODOをdoneすることはできない', () => {
      const todo = new TodoEntity({ ...todoDto, status: TodoStatus.Done });
      expect(() => todo.done()).toThrow(ConflictError);
    });

    test('NG: すでにundoneなTODOをundoneすることはできない', () => {
      const todo = new TodoEntity({ ...todoDto, status: TodoStatus.Undone });
      expect(() => todo.undone()).toThrow(ConflictError);
    });
  });
});
