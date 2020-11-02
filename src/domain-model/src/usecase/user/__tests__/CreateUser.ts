import { CreateUserInteractor } from '../CreateUser';
import { MockUserRepository } from '../_mocks/MockUserRepository';
import { MockCreateUserPresenter } from '../_mocks/MockUserPresenter';

/**
 * interactor を生成
 */
const setup = () => {
  const repository = new MockUserRepository();
  const presenter = new MockCreateUserPresenter();
  const interactor = new CreateUserInteractor(repository, presenter);

  return { interactor, presenter };
};

describe('CreateUserInteractor', () => {
  test('リクエストを処理し、新しいエンティティを生成できた', async () => {
    const { interactor, presenter } = setup();
    const request = {};

    await interactor.handle(request);

    // response として request で指定したデータが得られた
    const response = presenter.getResponse();
    expect(response?.user).toBeDefined();
  });
});
