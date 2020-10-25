import { Nullable, OrderBy, PagingInputData } from '../../type';
import { TodoDto, TodoStatus } from '../../../entity/todo/TodoDto';
import { UserEntity } from '../../../entity/user/UserEntity';

export type TodoKeys = keyof TodoDto;

export type AllTodosFiltersInput = {
  id?: string;
  ownerId?: string;
  title?: string;
  status?: TodoStatus;
  dueDate?: Date;
};

export type AllTodosOrderInput = {
  [key in TodoKeys]?: OrderBy;
};
export type AllTodosOrdersInput = AllTodosOrderInput[];

export type AllTodosInputData = {
  query?: Nullable<string>;
  filters?: Nullable<AllTodosFiltersInput>;
  orders?: Nullable<AllTodosOrdersInput>;
  paging?: Nullable<PagingInputData>;
};

export interface AllTodosUseCase {
  handle(request: AllTodosInputData, actor: UserEntity): void;
}

export type DeadlineNearingTodosInputData = {
  dueDate: Date;
  paging?: Nullable<PagingInputData>;
};

export interface DeadlineNearingTodosUseCase {
  handle(request: DeadlineNearingTodosInputData, actor: UserEntity): void;
}
