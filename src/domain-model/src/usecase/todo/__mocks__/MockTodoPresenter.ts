import {
  GetTodoPresenter,
  GetTodoOutputData,
  CreateTodoPresenter,
  CreateTodoOutputData,
  DeleteTodoPresenter,
  DeleteTodoOutputData,
  DoneTodoPresenter,
  DoneTodoOutputData,
  UndoneTodoPresenter,
  UndoneTodoOutputData,
} from '../interface/presenter';

export class MockGetTodoPresenter implements GetTodoPresenter {
  private response: GetTodoOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: GetTodoOutputData) {
    this.response = response;
  }
}

export class MockCreateTodoPresenter implements CreateTodoPresenter {
  private response: CreateTodoOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: CreateTodoOutputData) {
    this.response = response;
  }
}

export class MockDeleteTodoPresenter implements DeleteTodoPresenter {
  private response: DeleteTodoOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: DeleteTodoOutputData) {
    this.response = response;
  }
}

export class MockDoneTodoPresenter implements DoneTodoPresenter {
  private response: DoneTodoOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: DoneTodoOutputData) {
    this.response = response;
  }
}

export class MockUndoneTodoPresenter implements UndoneTodoPresenter {
  private response: UndoneTodoOutputData | null = null;

  public getResponse() {
    return this.response;
  }

  public async output(response: UndoneTodoOutputData) {
    this.response = response;
  }
}
