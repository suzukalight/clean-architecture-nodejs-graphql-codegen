import { NotFoundError } from 'common';

import { SignInAuth0Interactor } from '../SignInAuth0';
import { MockUserRepository } from '../../user/_mocks/MockUserRepository';
import { MockAuthAuth0Repository } from '../_mocks/MockAuthAuth0Repository';
import { MockSignInAuth0Presenter } from '../_mocks/MockAuthPresenter';

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
  const presenter = new MockSignInAuth0Presenter();
  const interactor = new SignInAuth0Interactor(authRepository, userRepository, presenter);

  return { authData, auth0UserId, interactor, presenter, userRepository };
};

describe('SignInAuth0Interactor', () => {
  test('成功：リクエストを処理し、ログインユーザとtokenを取得できた', async () => {
    const { auth0UserId, interactor, presenter } = await setup();
    const request = { auth0UserId };

    await interactor.handle(request);

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.token).toBeDefined();
  });

  test('失敗：誤ったauth0UserIdを指定した', async () => {
    const { interactor } = await setup();
    const request = { auth0UserId: 'not_existed|99999' };

    await expect(interactor.handle(request)).rejects.toThrow(NotFoundError);
  });

  test('失敗：存在しないユーザを指定した', async () => {
    const { interactor, auth0UserId, authData, userRepository } = await setup();
    const request = { auth0UserId };

    // ユーザを削除
    await userRepository.delete(authData.userId);

    await expect(interactor.handle(request)).rejects.toThrow(NotFoundError);
  });
});
