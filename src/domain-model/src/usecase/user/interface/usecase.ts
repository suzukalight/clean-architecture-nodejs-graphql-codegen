import { UserEntity } from '../../../entity';

export type GetUserInputData = {
  id: string;
};

export interface GetUserUseCase {
  handle(request: GetUserInputData): void;
}

export type CreateUserInputData = {
  _?: boolean;
};

export interface CreateUserUseCase {
  handle(request: CreateUserInputData): void;
}

export type UpdateUserRolesInputData = {
  id: string;
  roles: string[];
};

export interface UpdateUserRolesUseCase {
  handle(request: UpdateUserRolesInputData, actor: UserEntity): void;
}

export type DeleteUserInputData = {
  id: string;
};

export interface DeleteUserUseCase {
  handle(request: DeleteUserInputData, actor: UserEntity): void;
}
