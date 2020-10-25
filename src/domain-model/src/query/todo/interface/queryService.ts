import { TodoDto } from '../../../entity/todo/TodoDto';
import { Nullable, PageInfo, PagingInputData } from '../../type';
import { AllTodosInputData } from './usecase';

export type AllTodosQuery = AllTodosInputData;
export type AllTodosQueryResult = {
  todos: Nullable<TodoDto[]>;
  pageInfo?: PageInfo;
};

export type DeadlineNearingTodosQuery = {
  dueDate: Date;
  daysBeforeWarning: number;
  paging?: Nullable<PagingInputData>;
};
export type DeadlineNearingTodosQueryResult = {
  todos: Nullable<TodoDto[]>;
  pageInfo?: PageInfo;
};

export interface TodoQueryService {
  all(query: AllTodosQuery): Promise<AllTodosQueryResult>;

  allDeadlineNearingTodos(
    query: DeadlineNearingTodosQuery,
  ): Promise<DeadlineNearingTodosQueryResult>;
}
