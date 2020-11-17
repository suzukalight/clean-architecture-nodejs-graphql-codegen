import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  Done = 'DONE',
  Undone = 'UNDONE'
}

export type Todo = {
  __typename?: 'Todo';
  createdAt?: Maybe<Scalars['DateTime']>;
  dueDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  owner?: Maybe<User>;
  ownerId: Scalars['ID'];
  status: TodoStatus;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export enum Role {
  Admin = 'ADMIN',
  Anonymous = 'ANONYMOUS',
  Member = 'MEMBER'
}

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  roles: Array<Role>;
  todos?: Maybe<Array<Maybe<Todo>>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};


export type CreateTodoRequest = {
  dueDate?: Maybe<Scalars['DateTime']>;
  ownerId: Scalars['ID'];
  title: Scalars['String'];
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

export type Mutation = {
  __typename?: 'Mutation';
  createTodo?: Maybe<CreateTodoResponse>;
  createUser?: Maybe<CreateUserResponse>;
  deleteTodo?: Maybe<DeleteTodoResponse>;
  deleteUser?: Maybe<DeleteUserResponse>;
  doneTodo?: Maybe<DoneTodoResponse>;
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


export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserRequest>;
};


export type MutationDoneTodoArgs = {
  input?: Maybe<DoneTodoRequest>;
};


export type MutationUndoneTodoArgs = {
  input?: Maybe<UndoneTodoRequest>;
};


export type MutationUpdateUserRolesArgs = {
  input?: Maybe<UpdateUserRolesRequest>;
};

export type TodoEdge = {
  __typename?: 'TodoEdge';
  cursor?: Maybe<Scalars['String']>;
  todo?: Maybe<Todo>;
};

export type AllTodosWithDeadlineApproachingRequest = {
  dueDate: Scalars['DateTime'];
  paging?: Maybe<PagingInput>;
};

export type AllTodosWithDeadlineApproachingResponse = {
  __typename?: 'AllTodosWithDeadlineApproachingResponse';
  edges?: Maybe<Array<Maybe<TodoEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type Query = {
  __typename?: 'Query';
  allTodosWithDeadlineApproaching?: Maybe<AllTodosWithDeadlineApproachingResponse>;
  todo?: Maybe<Todo>;
  user?: Maybe<User>;
};


export type QueryAllTodosWithDeadlineApproachingArgs = {
  query?: Maybe<AllTodosWithDeadlineApproachingRequest>;
};


export type QueryTodoArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export enum OrderBy {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PagingInput = {
  cursor?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type CreateUserRequest = {
  _?: Maybe<Scalars['Boolean']>;
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

export type DeleteUserRequest = {
  id: Scalars['ID'];
};

export type DeleteUserResponse = {
  __typename?: 'DeleteUserResponse';
  user: User;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  TodoStatus: TodoStatus;
  Todo: ResolverTypeWrapper<Todo>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Role: Role;
  User: ResolverTypeWrapper<User>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  CreateTodoRequest: CreateTodoRequest;
  CreateTodoResponse: ResolverTypeWrapper<CreateTodoResponse>;
  DoneTodoRequest: DoneTodoRequest;
  DoneTodoResponse: ResolverTypeWrapper<DoneTodoResponse>;
  UndoneTodoRequest: UndoneTodoRequest;
  UndoneTodoResponse: ResolverTypeWrapper<UndoneTodoResponse>;
  DeleteTodoRequest: DeleteTodoRequest;
  DeleteTodoResponse: ResolverTypeWrapper<DeleteTodoResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  TodoEdge: ResolverTypeWrapper<TodoEdge>;
  AllTodosWithDeadlineApproachingRequest: AllTodosWithDeadlineApproachingRequest;
  AllTodosWithDeadlineApproachingResponse: ResolverTypeWrapper<AllTodosWithDeadlineApproachingResponse>;
  Query: ResolverTypeWrapper<{}>;
  OrderBy: OrderBy;
  PagingInput: PagingInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateUserRequest: CreateUserRequest;
  CreateUserResponse: ResolverTypeWrapper<CreateUserResponse>;
  UpdateUserRolesRequest: UpdateUserRolesRequest;
  UpdateUserRolesResponse: ResolverTypeWrapper<UpdateUserRolesResponse>;
  DeleteUserRequest: DeleteUserRequest;
  DeleteUserResponse: ResolverTypeWrapper<DeleteUserResponse>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Todo: Todo;
  ID: Scalars['ID'];
  String: Scalars['String'];
  User: User;
  DateTime: Scalars['DateTime'];
  CreateTodoRequest: CreateTodoRequest;
  CreateTodoResponse: CreateTodoResponse;
  DoneTodoRequest: DoneTodoRequest;
  DoneTodoResponse: DoneTodoResponse;
  UndoneTodoRequest: UndoneTodoRequest;
  UndoneTodoResponse: UndoneTodoResponse;
  DeleteTodoRequest: DeleteTodoRequest;
  DeleteTodoResponse: DeleteTodoResponse;
  Mutation: {};
  TodoEdge: TodoEdge;
  AllTodosWithDeadlineApproachingRequest: AllTodosWithDeadlineApproachingRequest;
  AllTodosWithDeadlineApproachingResponse: AllTodosWithDeadlineApproachingResponse;
  Query: {};
  PagingInput: PagingInput;
  Int: Scalars['Int'];
  PageInfo: PageInfo;
  Boolean: Scalars['Boolean'];
  CreateUserRequest: CreateUserRequest;
  CreateUserResponse: CreateUserResponse;
  UpdateUserRolesRequest: UpdateUserRolesRequest;
  UpdateUserRolesResponse: UpdateUserRolesResponse;
  DeleteUserRequest: DeleteUserRequest;
  DeleteUserResponse: DeleteUserResponse;
}>;

export type TodoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['TodoStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  roles?: Resolver<Array<ResolversTypes['Role']>, ParentType, ContextType>;
  todos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Todo']>>>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type CreateTodoResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateTodoResponse'] = ResolversParentTypes['CreateTodoResponse']> = ResolversObject<{
  todo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type DoneTodoResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DoneTodoResponse'] = ResolversParentTypes['DoneTodoResponse']> = ResolversObject<{
  todo?: Resolver<ResolversTypes['Todo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UndoneTodoResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UndoneTodoResponse'] = ResolversParentTypes['UndoneTodoResponse']> = ResolversObject<{
  todo?: Resolver<ResolversTypes['Todo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type DeleteTodoResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteTodoResponse'] = ResolversParentTypes['DeleteTodoResponse']> = ResolversObject<{
  todo?: Resolver<ResolversTypes['Todo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createTodo?: Resolver<Maybe<ResolversTypes['CreateTodoResponse']>, ParentType, ContextType, RequireFields<MutationCreateTodoArgs, never>>;
  createUser?: Resolver<Maybe<ResolversTypes['CreateUserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, never>>;
  deleteTodo?: Resolver<Maybe<ResolversTypes['DeleteTodoResponse']>, ParentType, ContextType, RequireFields<MutationDeleteTodoArgs, never>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['DeleteUserResponse']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, never>>;
  doneTodo?: Resolver<Maybe<ResolversTypes['DoneTodoResponse']>, ParentType, ContextType, RequireFields<MutationDoneTodoArgs, never>>;
  undoneTodo?: Resolver<Maybe<ResolversTypes['UndoneTodoResponse']>, ParentType, ContextType, RequireFields<MutationUndoneTodoArgs, never>>;
  updateUserRoles?: Resolver<Maybe<ResolversTypes['UpdateUserRolesResponse']>, ParentType, ContextType, RequireFields<MutationUpdateUserRolesArgs, never>>;
}>;

export type TodoEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['TodoEdge'] = ResolversParentTypes['TodoEdge']> = ResolversObject<{
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  todo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type AllTodosWithDeadlineApproachingResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AllTodosWithDeadlineApproachingResponse'] = ResolversParentTypes['AllTodosWithDeadlineApproachingResponse']> = ResolversObject<{
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['TodoEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  allTodosWithDeadlineApproaching?: Resolver<Maybe<ResolversTypes['AllTodosWithDeadlineApproachingResponse']>, ParentType, ContextType, RequireFields<QueryAllTodosWithDeadlineApproachingArgs, never>>;
  todo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<QueryTodoArgs, 'id'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
}>;

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CreateUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUserResponse'] = ResolversParentTypes['CreateUserResponse']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UpdateUserRolesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateUserRolesResponse'] = ResolversParentTypes['UpdateUserRolesResponse']> = ResolversObject<{
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type DeleteUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteUserResponse'] = ResolversParentTypes['DeleteUserResponse']> = ResolversObject<{
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Todo?: TodoResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  CreateTodoResponse?: CreateTodoResponseResolvers<ContextType>;
  DoneTodoResponse?: DoneTodoResponseResolvers<ContextType>;
  UndoneTodoResponse?: UndoneTodoResponseResolvers<ContextType>;
  DeleteTodoResponse?: DeleteTodoResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  TodoEdge?: TodoEdgeResolvers<ContextType>;
  AllTodosWithDeadlineApproachingResponse?: AllTodosWithDeadlineApproachingResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  CreateUserResponse?: CreateUserResponseResolvers<ContextType>;
  UpdateUserRolesResponse?: UpdateUserRolesResponseResolvers<ContextType>;
  DeleteUserResponse?: DeleteUserResponseResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
