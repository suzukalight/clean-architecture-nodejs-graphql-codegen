import { Maybe, SignInEmailPasswordResponse } from 'schema/types';

import { UserEntity } from '../../../entity/user/UserEntity';

export interface SignInEmailPasswordPresenter {
  output(token: string, user: UserEntity): void;
  getResponse(): Maybe<SignInEmailPasswordResponse>;
}
