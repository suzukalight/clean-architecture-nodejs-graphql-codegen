import { ConflictError } from 'common';

import { SignUpAuth0Interactor } from '../SignUpAuth0';
import { MockUserRepository } from '../../user/_mocks/MockUserRepository';
import { MockAuthAuth0Repository } from '../_mocks/MockAuthAuth0Repository';
import { MockSignUpAuth0Presenter } from '../_mocks/MockAuthPresenter';

/**
 * 認証済みのユーザを1名作成しておく
 */
const setup = async () => {
  // user repository
  const userRepository = new MockUserRepository();
  const userEntity = await userRepository.create({});
  const userId = userEntity.getId().toString();

  // auth repository
  const auth0UserId = 'auth0|1';
  const authData = { auth0UserId, userId };
  const authRepository = new MockAuthAuth0Repository();
  await authRepository.create(authData);

  // auth interactor
  const presenter = new MockSignUpAuth0Presenter();
  const interactor = new SignUpAuth0Interactor(authRepository, userRepository, presenter);

  return { authData, auth0UserId, interactor, presenter };
};

describe('SignUpAuth0Interactor', () => {
  test('リクエストを処理し、サインアップユーザとtokenを取得できた', async () => {
    const { interactor, presenter } = await setup();
    const request = { auth0UserId: 'auth0|2' };

    await interactor.handle(request);

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.token).toBeDefined();
  });

  test('すでに存在するauth0UserIdを指定したため、失敗した', async () => {
    const { auth0UserId, interactor } = await setup();
    const request = { auth0UserId };

    await expect(interactor.handle(request)).rejects.toThrow(ConflictError);
  });
});
