import { NotFoundError } from 'common/error/NotFound';
import { AuthenticationFailedError } from 'common/error/AuthenticationFailed';

import { SignInEmailPasswordInteractor } from '../SignInEmailPassword';
import { encryptPassword } from '../../../entity/common/Password';
import { MockUserRepository } from '../../user/__mocks__/MockUserRepository';
import { MockAuthEmailPasswordRepository } from '../__mocks__/MockAuthEmailPasswordRepository';
import { MockSignInEmailPasswordPresenter } from '../__mocks__/MockAuthPresenter';

/**
 * 認証済みのユーザを1名作成しておく
 */
const setup = async () => {
  // user repository
  const userRepository = new MockUserRepository();
  const userEntity = await userRepository.create({ email: 'target@email.com' });
  const userId = userEntity.getId().toString();

  // auth repository
  const password = 'password1';
  const passwordEncrypted = await encryptPassword(password);
  const authData = { email: 'target@email.com', passwordEncrypted, userId };
  const authRepository = new MockAuthEmailPasswordRepository();
  await authRepository.create(authData);

  // auth interactor
  const presenter = new MockSignInEmailPasswordPresenter();
  const interactor = new SignInEmailPasswordInteractor(authRepository, userRepository, presenter);

  return { authData, password, interactor, presenter };
};

describe('SignInEmailPasswordInteractor', () => {
  test('リクエストを処理し、ログインユーザとtokenを取得できた', async () => {
    const { authData, password, interactor, presenter } = await setup();
    const request = { email: authData.email!, password };

    await interactor.handle(request);

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.user?.email).toEqual(request.email);
    expect(response?.token).toBeDefined();
  });

  test('存在しないemailを指定したため、失敗した', async () => {
    const { password, interactor } = await setup();
    const request = { email: 'not_existed@email.com', password };

    await expect(interactor.handle(request)).rejects.toThrow(NotFoundError);
  });

  test('誤ったパスワードを指定したため、失敗した', async () => {
    const { authData, interactor } = await setup();
    const request = { email: authData.email!, password: 'invalidpassword' };

    await expect(interactor.handle(request)).rejects.toThrow(AuthenticationFailedError);
  });
});
