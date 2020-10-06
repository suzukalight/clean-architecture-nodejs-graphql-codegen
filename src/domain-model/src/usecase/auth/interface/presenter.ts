import { UserDto } from '../../../entity/user/UserDto';

export type SignInEmailPasswordOutputData = {
  user: UserDto | null;
  token: string | null;
};

export interface SignInEmailPasswordPresenter {
  output(response: SignInEmailPasswordOutputData): void;
}

export type SignUpEmailPasswordOutputData = {
  user: UserDto | null;
  token: string | null;
};

export interface SignUpEmailPasswordPresenter {
  output(response: SignUpEmailPasswordOutputData): void;
}
