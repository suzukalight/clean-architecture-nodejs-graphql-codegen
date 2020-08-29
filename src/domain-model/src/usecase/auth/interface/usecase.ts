import { SignInEmailPasswordRequest, SignUpEmailPasswordRequest } from 'schema';

interface AuthUseCase<Request> {
  handle(request: Request): void;
}

export type SignInEmailPasswordUseCase = AuthUseCase<SignInEmailPasswordRequest>;
export type SignUpEmailPasswordUseCase = AuthUseCase<SignUpEmailPasswordRequest>;
