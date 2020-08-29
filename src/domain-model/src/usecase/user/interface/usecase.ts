import { CreateUserRequest, UpdateUserRolesRequest, Maybe } from 'schema';
import { UserEntity } from '../../../entity/user/UserEntity';

interface UserUseCase<Request> {
  handle(request: Request, actor: Maybe<UserEntity>): void;
}

export type GetUserUseCase = UserUseCase<string>;

export type CreateUserUseCase = UserUseCase<CreateUserRequest>;
export type UpdateUserRolesUseCase = UserUseCase<UpdateUserRolesRequest>;
