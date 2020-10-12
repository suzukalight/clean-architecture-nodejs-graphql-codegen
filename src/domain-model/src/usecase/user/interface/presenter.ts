import { UserDto } from '../../../entity/user/UserDto';

export type GetUserOutputData = {
  user: UserDto | null;
};

export interface GetUserPresenter {
  output(response: GetUserOutputData): void;
}

export type CreateUserOutputData = {
  user: UserDto | null;
};

export interface CreateUserPresenter {
  output(response: CreateUserOutputData): void;
}

export type UpdateUserRolesOutputData = {
  user: UserDto | null;
};

export interface UpdateUserRolesPresenter {
  output(response: UpdateUserRolesOutputData): void;
}

export type DeleteUserOutputData = {
  user: UserDto | null;
};

export interface DeleteUserPresenter {
  output(response: DeleteUserOutputData): void;
}
