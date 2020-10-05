import { UserDto } from '../../../entity/user/UserDto';
import { UserEntity } from '../../../entity/user/UserEntity';

export type GetUserOutputData = {
  user: UserDto;
};

export interface GetUserPresenter {
  output(user: UserEntity | null): void;
  getResponse(): GetUserOutputData | null;
}

export type CreateUserOutputData = {
  user: UserDto;
};

export interface CreateUserPresenter {
  output(user: UserEntity | null): void;
  getResponse(): CreateUserOutputData | null;
}

export type UpdateUserRolesOutputData = {
  user: UserDto;
};

export interface UpdateUserRolesPresenter {
  output(user: UserEntity | null): void;
  getResponse(): UpdateUserRolesOutputData | null;
}
