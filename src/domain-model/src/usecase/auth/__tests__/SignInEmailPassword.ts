import { Maybe, SignInEmailPasswordResponse } from 'schema/types';
import { NotFoundError } from 'common/error/NotFound';
import { AuthenticationFailedError } from 'common/error/AuthenticationFailed';

import { SignInEmailPasswordPresenter } from '../interface/presenter';
import { SignInEmailPasswordUseCase } from '../interface/usecase';
import { SignInEmailPasswordInteractor } from '../SignInEmailPassword';
import { UserEntity } from '../../../entity/user/UserEntity';
import { RoleTypes } from '../../../entity/common/Role';
import { encryptPassword } from '../../../entity/common/Password';
import {
  AuthEmailPasswordEntity,
  AuthEmailPasswordDto,
} from '../../../entity/auth/AuthEmailPasswordEntity';
import {
  UserRepository,
  createInMemoryStore as createInMemoryUserStore,
} from '../../user/__mocks__/UserRepository';
import {
  AuthEmailPasswordRepository,
  createInMemoryStore as createInMemoryAuthStore,
} from '../__mocks__/AuthEmailPasswordRepository';

export class MockSignInEmailPasswordPresenter implements SignInEmailPasswordPresenter {
  private response: Maybe<SignInEmailPasswordResponse> = null;

  public getResponse(): Maybe<SignInEmailPasswordResponse> {
    return this.response;
  }

  public async output(token: string, user: UserEntity) {
    this.response = { token, user: user.toJSON() };
  }
}

type TestData = {
  presenter: SignInEmailPasswordPresenter;
  interactor: SignInEmailPasswordUseCase;
  authData: AuthEmailPasswordDto;
  password: string;
};

let testData: Maybe<TestData> = null;

describe('SignInEmailPasswordInteractor', () => {
  beforeAll(async () => {
    // user repository
    const userEntities = new Map<string, UserEntity>();
    const userId = '1';
    userEntities.set(
      userId,
      new UserEntity({ id: userId, email: 'target@email.com', roles: [RoleTypes.Anonymous] }),
    );
    const userStore = createInMemoryUserStore(1, userEntities);
    const userRepository = new UserRepository(userStore);

    // auth repository
    const password = 'password1';
    const passwordEncrypted = await encryptPassword(password);
    const authData = { email: 'target@email.com', passwordEncrypted, userId };
    const authEntities = new Map<string, AuthEmailPasswordEntity>();
    const authId = '1';
    authEntities.set(authId, new AuthEmailPasswordEntity(authData));
    const authStore = createInMemoryAuthStore(1, authEntities);
    const authRepository = new AuthEmailPasswordRepository(authStore);

    // auth interactor
    const presenter = new MockSignInEmailPasswordPresenter();
    const interactor = new SignInEmailPasswordInteractor(authRepository, userRepository, presenter);

    testData = {
      presenter,
      interactor,
      authData,
      password,
    };
  });

  test('リクエストを処理し、ログインユーザとtokenを取得できた', async () => {
    const request = { email: testData?.authData.email!, password: testData?.password! };

    await testData?.interactor.handle(request);

    // response として request で指定したデータが得られた
    const response = testData?.presenter.getResponse();
    expect(response?.user?.email).toEqual(request.email);
    expect(response?.token).toBeDefined();
  });

  test('存在しないemailを指定したため、失敗した', async () => {
    const request = { email: 'not_existed@email.com', password: testData?.password! };

    try {
      await testData?.interactor.handle(request);
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundError);
      return;
    }

    expect(true).toBeFalsy();
  });

  test('誤ったパスワードを指定したため、失敗した', async () => {
    const request = { email: testData?.authData.email!, password: 'invalidpassword' };

    try {
      await testData?.interactor.handle(request);
    } catch (e) {
      expect(e).toBeInstanceOf(AuthenticationFailedError);
      return;
    }

    expect(true).toBeFalsy();
  });
});
