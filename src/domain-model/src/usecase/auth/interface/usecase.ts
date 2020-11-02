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

export type SignInAuth0InputData = {
  auth0UserId: string;
};

export interface SignInAuth0UseCase {
  handle(request: SignInAuth0InputData): void;
}

export type SignUpAuth0InputData = {
  auth0UserId: string;
};

export interface SignUpAuth0UseCase {
  handle(request: SignUpAuth0InputData): void;
}
