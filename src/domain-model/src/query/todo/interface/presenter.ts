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

export type DeadlineNearingTodosOutputData = AllTodosOutputData;

export interface DeadlineNearingTodosPresenter {
  output(response: DeadlineNearingTodosOutputData): void;
}
