export type SignInEmailPasswordOutputData = {
  userId: string | null;
  token: string | null;
};

export interface SignInEmailPasswordPresenter {
  output(response: SignInEmailPasswordOutputData): void;
}

export type SignUpEmailPasswordOutputData = {
  userId: string | null;
  token: string | null;
};

export interface SignUpEmailPasswordPresenter {
  output(response: SignUpEmailPasswordOutputData): void;
}
