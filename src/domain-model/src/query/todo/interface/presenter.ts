import { Nullable, PageInfo } from '../../type';
import { TodoDto } from '../../../entity';

export type TodoEdge = {
  todo: TodoDto;
  cursor: string;
};

export type AllTodosOutputData = {
  edges: Nullable<TodoEdge[]>;
  pageInfo?: PageInfo;
};

export interface AllTodosPresenter {
  output(response: AllTodosOutputData): void;
}

export type AllTodosWithDeadlineApproachingOutputData = AllTodosOutputData;

export interface AllTodosWithDeadlineApproachingPresenter {
  output(response: AllTodosWithDeadlineApproachingOutputData): void;
}

export type AllTodosByOwnerIdOutputData = AllTodosOutputData;

export interface AllTodosByOwnerIdPresenter {
  output(response: AllTodosByOwnerIdOutputData): void;
}
