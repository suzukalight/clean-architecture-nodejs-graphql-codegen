export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

export enum TodoStatus {
  Undone = 'UNDONE',
  Done = 'DONE'
}

export type Todo = {
  __typename?: 'Todo';
  id: Scalars['ID'];
  ownerId: Scalars['ID'];
  title: Scalars['String'];
  status: TodoStatus;
  dueDate?: Maybe<Scalars['DateTime']>;
  owner?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
};


export type Query = {
  __typename?: 'Query';
  createUser: CreateUserResponse;
  todo?: Maybe<Todo>;
  user?: Maybe<User>;
};


export type QueryCreateUserArgs = {
  input: CreateUserRequest;
};


export type QueryTodoArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type CreateUserRequest = {
  __typename?: 'CreateUserRequest';
  email: Scalars['String'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  user?: Maybe<User>;
};
