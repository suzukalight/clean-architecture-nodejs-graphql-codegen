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

export type SignInAuth0OutputData = {
  user: UserDto | null;
  token: string | null;
};

export interface SignInAuth0Presenter {
  output(response: SignInAuth0OutputData): void;
}

export type SignUpAuth0OutputData = {
  user: UserDto | null;
  token: string | null;
};

export interface SignUpAuth0Presenter {
  output(response: SignUpAuth0OutputData): void;
}
