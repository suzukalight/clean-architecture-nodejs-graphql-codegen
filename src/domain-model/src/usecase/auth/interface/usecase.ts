export type SignInEmailPasswordInputData = {
  email: string;
  password: string;
};

export interface SignInEmailPasswordUseCase {
  handle(request: SignInEmailPasswordInputData): void;
}

export type SignUpEmailPasswordInputData = {
  email: string;
  password: string;
};

export interface SignUpEmailPasswordUseCase {
  handle(request: SignUpEmailPasswordInputData): void;
}

export type SignInOrSignUpAuth0InputData = {
  auth0UserId: string;
};

export interface SignInOrSignUpAuth0UseCase {
  handle(request: SignInOrSignUpAuth0InputData): void;
}
