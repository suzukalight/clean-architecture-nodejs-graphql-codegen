import { NotFoundError } from 'common';

import { SignInOrSignUpAuth0Interactor } from '../SignInOrSignUpAuth0';
import { MockUserRepository } from '../../user/_mocks/MockUserRepository';
import { MockAuthAuth0Repository } from '../_mocks/MockAuthAuth0Repository';
import { MockSignInOrSignUpAuth0Presenter } from '../_mocks/MockAuthPresenter';

/**
 * 認証済みのユーザを1名作成しておく
 */
const setup = async () => {
  // user repository
  const userRepository = new MockUserRepository();
  const userEntity = await userRepository.create({});
  const userId = userEntity.getId().toString();

  // auth repository
  const auth0UserId = 'auth0-test|1';
  const authData = { auth0UserId, userId };
  const authRepository = new MockAuthAuth0Repository();
  await authRepository.create(authData);

  // auth interactor
  const presenter = new MockSignInOrSignUpAuth0Presenter();
  const interactor = new SignInOrSignUpAuth0Interactor(authRepository, userRepository, presenter);

  return { authData, auth0UserId, interactor, presenter, userRepository };
};

describe('SignInOrSignUpAuth0Interactor', () => {
  test('OK: 登録済みのユーザを発見し、それを返した', async () => {
    const { auth0UserId, interactor, presenter } = await setup();
    const request = { auth0UserId };

    await interactor.handle(request);

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.user).toBeDefined();
    expect(response?.isNewUser).toBeFalsy();
  });

  test('OK: 未登録のユーザの場合、認証とユーザを作成し、それを返した', async () => {
    const { interactor, presenter } = await setup();
    const request = { auth0UserId: 'newauth|99999' };

    await interactor.handle(request);

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.user).toBeDefined();
    expect(response?.isNewUser).toBeTruthy();
  });

  test('NG: 存在しないユーザを指定した', async () => {
    const { interactor, auth0UserId, authData, userRepository } = await setup();
    const request = { auth0UserId };

    // ユーザを削除
    await userRepository.delete(authData.userId);

    await expect(interactor.handle(request)).rejects.toThrow(NotFoundError);
  });
});
