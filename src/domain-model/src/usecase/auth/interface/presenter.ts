import { UserDto } from '../../../entity/user/UserDto';

export type SignInEmailPassworOutputData = {
  user: UserDto | null;
  token: string | null;
};

export interface SignInEmailPasswordPresenter {
  output(response: SignInEmailPassworOutputData): void;
}

export type SignUpEmailPasswordOutputData = {
  user: UserDto | null;
  token: string | null;
};

export interface SignUpEmailPasswordPresenter {
  output(response: SignInEmailPassworOutputData): void;
}
