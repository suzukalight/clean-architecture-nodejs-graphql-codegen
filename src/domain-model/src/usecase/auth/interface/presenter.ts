import { Maybe, SignInEmailPasswordResponse, SignUpEmailPasswordResponse } from 'schema/types';

import { UserEntity } from '../../../entity/user/UserEntity';

export interface AuthPresenter<Response> {
  output(token: string, user: UserEntity): void;
  getResponse(): Maybe<Response>;
}

export type SignInEmailPasswordPresenter = AuthPresenter<SignInEmailPasswordResponse>;
export type SignUpEmailPasswordPresenter = AuthPresenter<SignUpEmailPasswordResponse>;
