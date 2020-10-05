import { UserEntity } from '../../../entity';
import { RoleType } from '../../../entity/common/Role';

export type GetUserInputData = {
  id: string;
};

export interface GetUserUseCase {
  handle(request: GetUserInputData): void;
}

export type CreateUserInputData = {
  email: string;
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
