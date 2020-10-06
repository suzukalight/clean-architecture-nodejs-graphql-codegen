import { UserDto } from '../../../entity/user/UserDto';
import { UserEntity } from '../../../entity/user/UserEntity';

export type SignInEmailPassworOutputData = {
  user: UserDto | null;
  token: string;
};

export interface SignInEmailPasswordPresenter {
  output(token: string, user: UserEntity | null): void;
  getResponse(): SignInEmailPassworOutputData | null;
}

export type SignUpEmailPasswordOutputData = {
  user: UserDto | null;
  token: string;
};

export interface SignUpEmailPasswordPresenter {
  output(token: string, user: UserEntity | null): void;
  getResponse(): SignUpEmailPasswordOutputData | null;
}
