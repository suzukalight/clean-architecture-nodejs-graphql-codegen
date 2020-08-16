import { Maybe, CreateUserResponse } from 'schema/types';
import { IllegalArgumentError } from 'common/error/IllegalArgument';

import { UserEntity } from '../../../entity/user/UserEntity';
import { CreateUserInteractor } from '../CreateUser';
import { CreateUserPresenter } from '../interface/presenter';
import { UserRepository, createInMemoryStore } from '../__mocks__/UserRepository';

export class MockCreateUserPresenter implements CreateUserPresenter {
  private response: Maybe<CreateUserResponse> = null;

  public getResponse(): Maybe<CreateUserResponse> {
    return this.response;
  }

  public async output(userEntity: Maybe<UserEntity>) {
    this.response = { user: userEntity ? userEntity.toJSON() : null };
  }
}

describe('CreateUserInteractor', () => {
  it('リクエストを処理し、新しいエンティティを生成できた', async () => {
    const store = createInMemoryStore();
    const repository = new UserRepository(store);
    const presenter = new MockCreateUserPresenter();
    const interactor = new CreateUserInteractor(repository, presenter);
    const request = { email: 'aaa@bbb.com' };

    await interactor.handle(request);

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.user?.email).toBe(request.email);
  });

  it('複数回のリクエストを処理できた', async () => {
    const store = createInMemoryStore();
    const repository = new UserRepository(store);
    const presenter = new MockCreateUserPresenter();
    const interactor = new CreateUserInteractor(repository, presenter);

    let i = 0;
    while (i <= 10) {
      ++i;
      const request = { email: `aaa${i}@bbb.com` };
      await interactor.handle(request);
    }

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.user?.email).toBe(`aaa${i}@bbb.com`);
  });

  it('不正なメールアドレスを指定したため、失敗した', async () => {
    const store = createInMemoryStore();
    const repository = new UserRepository(store);
    const presenter = new MockCreateUserPresenter();
    const interactor = new CreateUserInteractor(repository, presenter);
    const request = { email: 'hogehoge' };

    try {
      await interactor.handle(request);
    } catch (e) {
      expect(e).toBeInstanceOf(IllegalArgumentError);
      return;
    }

    expect(true).toBeFalsy();
  });
});
