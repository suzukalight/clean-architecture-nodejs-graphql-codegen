import { TodoDto } from '../../../entity/todo/TodoDto';
import { Nullable, PageInfo, PagingInputData } from '../../type';
import { AllTodosInputData } from './usecase';

export type AllTodosQuery = AllTodosInputData;
export type AllTodosQueryResult = {
  todos: Nullable<TodoDto[]>;
  pageInfo?: PageInfo;
};

export type AllTodosWithDeadlineApproachingQuery = {
  dueDate: Date;
  daysBeforeWarning: number;
  paging?: Nullable<PagingInputData>;
};
export type AllTodosWithDeadlineApproachingQueryResult = {
  todos: Nullable<TodoDto[]>;
  pageInfo?: PageInfo;
};

export interface TodoQueryService {
  all(query: AllTodosQuery): Promise<AllTodosQueryResult>;

  allTodosWithDeadlineApproaching(
    query: AllTodosWithDeadlineApproachingQuery,
  ): Promise<AllTodosWithDeadlineApproachingQueryResult>;
}
