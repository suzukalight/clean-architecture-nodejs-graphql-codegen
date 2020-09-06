import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
const gql = Apollo.gql;
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
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  owner?: Maybe<User>;
};

export enum Role {
  Anonymous = 'ANONYMOUS',
  Member = 'MEMBER',
  Admin = 'ADMIN'
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  roles: Array<Role>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todos?: Maybe<Array<Maybe<Todo>>>;
};


export type SignUpEmailPasswordRequest = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpEmailPasswordResponse = {
  __typename?: 'SignUpEmailPasswordResponse';
  user: User;
  token: Scalars['String'];
};

export type SignInEmailPasswordRequest = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignInEmailPasswordResponse = {
  __typename?: 'SignInEmailPasswordResponse';
  user: User;
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo?: Maybe<CreateTodoResponse>;
  createUser?: Maybe<CreateUserResponse>;
  deleteTodo?: Maybe<DeleteTodoResponse>;
  doneTodo?: Maybe<DoneTodoResponse>;
  signInEmailPassword?: Maybe<SignInEmailPasswordResponse>;
  signUpEmailPassword?: Maybe<SignUpEmailPasswordResponse>;
  undoneTodo?: Maybe<UndoneTodoResponse>;
  updateUserRoles?: Maybe<UpdateUserRolesResponse>;
};


export type MutationCreateTodoArgs = {
  input?: Maybe<CreateTodoRequest>;
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserRequest>;
};


export type MutationDeleteTodoArgs = {
  input?: Maybe<DeleteTodoRequest>;
};


export type MutationDoneTodoArgs = {
  input?: Maybe<DoneTodoRequest>;
};


export type MutationSignInEmailPasswordArgs = {
  input?: Maybe<SignInEmailPasswordRequest>;
};


export type MutationSignUpEmailPasswordArgs = {
  input?: Maybe<SignUpEmailPasswordRequest>;
};


export type MutationUndoneTodoArgs = {
  input?: Maybe<UndoneTodoRequest>;
};


export type MutationUpdateUserRolesArgs = {
  input?: Maybe<UpdateUserRolesRequest>;
};

export type CreateTodoRequest = {
  ownerId: Scalars['ID'];
  title: Scalars['String'];
  dueDate?: Maybe<Scalars['DateTime']>;
};

export type CreateTodoResponse = {
  __typename?: 'CreateTodoResponse';
  todo?: Maybe<Todo>;
};

export type DoneTodoRequest = {
  id: Scalars['ID'];
};

export type DoneTodoResponse = {
  __typename?: 'DoneTodoResponse';
  todo: Todo;
};

export type UndoneTodoRequest = {
  id: Scalars['ID'];
};

export type UndoneTodoResponse = {
  __typename?: 'UndoneTodoResponse';
  todo: Todo;
};

export type DeleteTodoRequest = {
  id: Scalars['ID'];
};

export type DeleteTodoResponse = {
  __typename?: 'DeleteTodoResponse';
  todo: Todo;
};

export type Query = {
  __typename?: 'Query';
  todo?: Maybe<Todo>;
  user?: Maybe<User>;
};


export type QueryTodoArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type CreateUserRequest = {
  email: Scalars['String'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  user?: Maybe<User>;
};

export type UpdateUserRolesRequest = {
  id: Scalars['ID'];
  roles: Array<Role>;
};

export type UpdateUserRolesResponse = {
  __typename?: 'UpdateUserRolesResponse';
  user: User;
};

export type SignInEmailPasswordMutationVariables = Exact<{
  input?: Maybe<SignInEmailPasswordRequest>;
}>;


export type SignInEmailPasswordMutation = (
  { __typename?: 'Mutation' }
  & { signInEmailPassword?: Maybe<(
    { __typename?: 'SignInEmailPasswordResponse' }
    & Pick<SignInEmailPasswordResponse, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'roles'>
    ) }
  )> }
);

export type GetUserTodosQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetUserTodosQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'roles'>
    & { todos?: Maybe<Array<Maybe<(
      { __typename?: 'Todo' }
      & Pick<Todo, 'id' | 'ownerId' | 'title' | 'status' | 'dueDate'>
      & { owner?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email'>
      )> }
    )>>> }
  )> }
);


export const SignInEmailPasswordDocument = gql`
    mutation SignInEmailPassword($input: SignInEmailPasswordRequest) {
  signInEmailPassword(input: $input) {
    user {
      id
      email
      roles
    }
    token
  }
}
    `;
export type SignInEmailPasswordMutationFn = Apollo.MutationFunction<SignInEmailPasswordMutation, SignInEmailPasswordMutationVariables>;

/**
 * __useSignInEmailPasswordMutation__
 *
 * To run a mutation, you first call `useSignInEmailPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInEmailPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInEmailPasswordMutation, { data, loading, error }] = useSignInEmailPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInEmailPasswordMutation(baseOptions?: Apollo.MutationHookOptions<SignInEmailPasswordMutation, SignInEmailPasswordMutationVariables>) {
        return Apollo.useMutation<SignInEmailPasswordMutation, SignInEmailPasswordMutationVariables>(SignInEmailPasswordDocument, baseOptions);
      }
export type SignInEmailPasswordMutationHookResult = ReturnType<typeof useSignInEmailPasswordMutation>;
export type SignInEmailPasswordMutationResult = Apollo.MutationResult<SignInEmailPasswordMutation>;
export type SignInEmailPasswordMutationOptions = Apollo.BaseMutationOptions<SignInEmailPasswordMutation, SignInEmailPasswordMutationVariables>;
export const GetUserTodosDocument = gql`
    query GetUserTodos($id: ID!) {
  user(id: $id) {
    id
    email
    roles
    todos {
      id
      ownerId
      owner {
        id
        email
      }
      title
      status
      dueDate
    }
  }
}
    `;

/**
 * __useGetUserTodosQuery__
 *
 * To run a query within a React component, call `useGetUserTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTodosQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserTodosQuery(baseOptions?: Apollo.QueryHookOptions<GetUserTodosQuery, GetUserTodosQueryVariables>) {
        return Apollo.useQuery<GetUserTodosQuery, GetUserTodosQueryVariables>(GetUserTodosDocument, baseOptions);
      }
export function useGetUserTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTodosQuery, GetUserTodosQueryVariables>) {
          return Apollo.useLazyQuery<GetUserTodosQuery, GetUserTodosQueryVariables>(GetUserTodosDocument, baseOptions);
        }
export type GetUserTodosQueryHookResult = ReturnType<typeof useGetUserTodosQuery>;
export type GetUserTodosLazyQueryHookResult = ReturnType<typeof useGetUserTodosLazyQuery>;
export type GetUserTodosQueryResult = Apollo.QueryResult<GetUserTodosQuery, GetUserTodosQueryVariables>;