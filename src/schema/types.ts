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

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  todos?: Maybe<Array<Maybe<Todo>>>;
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

export type Mutation = {
  __typename?: 'Mutation';
  createTodo?: Maybe<CreateTodoResponse>;
  createUser?: Maybe<CreateUserResponse>;
  doneTodo?: Maybe<DoneTodoResponse>;
  undoneTodo?: Maybe<UndoneTodoResponse>;
};


export type MutationCreateTodoArgs = {
  input?: Maybe<CreateTodoRequest>;
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserRequest>;
};


export type MutationDoneTodoArgs = {
  input?: Maybe<DoneTodoRequest>;
};


export type MutationUndoneTodoArgs = {
  input?: Maybe<UndoneTodoRequest>;
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
  User: ResolverTypeWrapper<User>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  CreateTodoRequest: CreateTodoRequest;
  CreateTodoResponse: ResolverTypeWrapper<CreateTodoResponse>;
  DoneTodoRequest: DoneTodoRequest;
  DoneTodoResponse: ResolverTypeWrapper<DoneTodoResponse>;
  UndoneTodoRequest: UndoneTodoRequest;
  UndoneTodoResponse: ResolverTypeWrapper<UndoneTodoResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  CreateUserRequest: CreateUserRequest;
  CreateUserResponse: ResolverTypeWrapper<CreateUserResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
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
  Mutation: {};
  Query: {};
  CreateUserRequest: CreateUserRequest;
  CreateUserResponse: CreateUserResponse;
  Boolean: Scalars['Boolean'];
}>;

export type TodoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  ownerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['TodoStatus'], ParentType, ContextType>;
  dueDate?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  todos?: Resolver<Maybe<Array<Maybe<ResolversTypes['Todo']>>>, ParentType, ContextType>;
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

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createTodo?: Resolver<Maybe<ResolversTypes['CreateTodoResponse']>, ParentType, ContextType, RequireFields<MutationCreateTodoArgs, never>>;
  createUser?: Resolver<Maybe<ResolversTypes['CreateUserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, never>>;
  doneTodo?: Resolver<Maybe<ResolversTypes['DoneTodoResponse']>, ParentType, ContextType, RequireFields<MutationDoneTodoArgs, never>>;
  undoneTodo?: Resolver<Maybe<ResolversTypes['UndoneTodoResponse']>, ParentType, ContextType, RequireFields<MutationUndoneTodoArgs, never>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  todo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<QueryTodoArgs, 'id'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
}>;

export type CreateUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUserResponse'] = ResolversParentTypes['CreateUserResponse']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Todo?: TodoResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  CreateTodoResponse?: CreateTodoResponseResolvers<ContextType>;
  DoneTodoResponse?: DoneTodoResponseResolvers<ContextType>;
  UndoneTodoResponse?: UndoneTodoResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  CreateUserResponse?: CreateUserResponseResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
