import { IllegalArgumentError } from 'common/error/IllegalArgument';

import { CreateUserInteractor } from '../CreateUser';
import { InMemoryUserRepository, createInMemoryStore } from '../../../repository/memory/user';
import { CreateUserPresenter } from '../../../presenter/user/CreateUser';

describe('CreateUserInteractor', () => {
  it('リクエストを処理し、新しいエンティティを生成できた', async () => {
    const store = createInMemoryStore();
    const repository = new InMemoryUserRepository(store);
    const presenter = new CreateUserPresenter();
    const interactor = new CreateUserInteractor(repository, presenter);
    const request = { email: 'aaa@bbb.com' };

    await interactor.handle(request);

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.user?.email).toBe(request.email);

    // repository にエンティティが書き込まれた
    expect(store.entities.get('1')?.getEmail().toString()).toBe(request.email);
  });

  it('複数回のリクエストを処理できた', async () => {
    const store = createInMemoryStore();
    const repository = new InMemoryUserRepository(store);
    const presenter = new CreateUserPresenter();
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

    // repository にエンティティが書き込まれた
    expect(store.entities.get(`${i}`)?.getEmail().toString()).toBe(`aaa${i}@bbb.com`);
  });

  it('不正なメールアドレスを指定したため、失敗した', async () => {
    const store = createInMemoryStore();
    const repository = new InMemoryUserRepository(store);
    const presenter = new CreateUserPresenter();
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
