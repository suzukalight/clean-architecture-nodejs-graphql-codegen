import { ConflictError } from 'common/error/Conflict';

import { SignUpEmailPasswordInteractor } from '../SignUpEmailPassword';
import { encryptPassword } from '../../../entity/common/Password';
import { MockUserRepository } from '../../user/__mocks__/MockUserRepository';
import { MockAuthEmailPasswordRepository } from '../__mocks__/MockAuthEmailPasswordRepository';
import { MockSignUpEmailPasswordPresenter } from '../__mocks__/MockAuthPresenter';
import { IllegalArgumentError } from 'common/error/IllegalArgument';

/**
 * 認証済みのユーザを1名作成しておく
 */
const setup = async () => {
  // user repository
  const userRepository = new MockUserRepository();
  const userEntity = await userRepository.create({ email: 'existed@email.com' });
  const userId = userEntity.getId().toString();

  // auth repository
  const password = 'password1';
  const passwordEncrypted = await encryptPassword(password);
  const authData = { email: 'existed@email.com', passwordEncrypted, userId };
  const authRepository = new MockAuthEmailPasswordRepository();
  await authRepository.create(authData);

  // auth interactor
  const presenter = new MockSignUpEmailPasswordPresenter();
  const interactor = new SignUpEmailPasswordInteractor(authRepository, userRepository, presenter);

  return { authData, password, interactor, presenter };
};

describe('SignUpEmailPasswordInteractor', () => {
  test('リクエストを処理し、サインアップユーザとtokenを取得できた', async () => {
    const { password, interactor, presenter } = await setup();
    const request = { email: 'new_user@email.com', password };

    await interactor.handle(request);

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.user?.email).toEqual(request.email);
    expect(response?.token).toBeDefined();
  });

  test('すでに存在するemailを指定したため、失敗した', async () => {
    const { authData, password, interactor } = await setup();
    const request = { email: authData.email, password };

    await expect(interactor.handle(request)).rejects.toThrow(ConflictError);
  });

  test('適切ではないメールアドレスを指定したため、失敗した', async () => {
    const { password, interactor } = await setup();
    const request = { email: 'invalid_mail_address', password };

    await expect(interactor.handle(request)).rejects.toThrow(IllegalArgumentError);
  });

  test('適切ではないパスワードを指定したため、失敗した', async () => {
    const { interactor } = await setup();
    const request = { email: 'new_user@email.com', password: 'invalidpassword' };

    await expect(interactor.handle(request)).rejects.toThrow(IllegalArgumentError);
  });

  // test.todo('無効になったユーザを指定したため、失敗した');
});
