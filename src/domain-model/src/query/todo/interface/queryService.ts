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
export type AllTodosWithDeadlineApproachingQueryResult = AllTodosQueryResult;

export type AllTodosByOwnerIdQuery = {
  ownerId: string;
  paging?: Nullable<PagingInputData>;
};
export type AllTodosByOwnerIdQueryResult = AllTodosQueryResult;

export interface TodoQueryService {
  all(query: AllTodosQuery): Promise<AllTodosQueryResult>;

  allTodosWithDeadlineApproaching(
    query: AllTodosWithDeadlineApproachingQuery,
  ): Promise<AllTodosWithDeadlineApproachingQueryResult>;

  allTodosByOwnerId(query: AllTodosByOwnerIdQuery): Promise<AllTodosByOwnerIdQueryResult>;
}
