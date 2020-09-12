import React, { createContext, FC, useCallback, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

import {
  User,
  useGetUserLazyQuery,
  SignInEmailPasswordRequest,
  useSignInEmailPasswordMutation,
} from '../../../generated/graphql-client';
import { getToken, resetToken, setToken } from '../../../libraries/auth-token';
import { client } from '../../../libraries/apollo-client';

type PickedUser = Pick<User, 'id' | 'roles' | 'email'>;
type Actor = PickedUser | null;
type Jwt = Pick<User, 'id' | 'roles'>;
type SubmitFunction = (input: SignInEmailPasswordRequest) => Promise<void>;

type AuthContext = {
  actor: Actor;
  login: SubmitFunction;
  logout: () => void;
  refetchMe: () => void;
};

export const AuthContext = createContext<AuthContext>({
  actor: null,
  login: async () => {
    //
  },
  logout: () => {
    //
  },
  refetchMe: () => {
    //
  },
});

export const AuthProvider: FC = ({ children }) => {
  const [actor, setActor] = useState<Actor>(null);
  const [signInEmailPasswordMutation] = useSignInEmailPasswordMutation();
  const [getUser, { loading }] = useGetUserLazyQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data) {
        setActor(data.user || null);
      }
    },
  });

  const refetchMe = useCallback(() => {
    const token = getToken();
    if (!token) return;

    const { id } = jwtDecode<Jwt>(token);
    if (!id) return;

    getUser({ variables: { id } });
  }, [getUser, setActor]);

  const reset = useCallback(() => {
    resetToken();
    client.clearStore();
  }, [client]);

  const login = useCallback<SubmitFunction>(
    async (input) => {
      const result = await signInEmailPasswordMutation({ variables: { input } });
      const { token, user } = result.data?.signInEmailPassword || {};

      if (token) setToken(token);
      if (user) setActor(user);
    },
    [signInEmailPasswordMutation],
  );

  const logout = useCallback(() => {
    reset();
  }, [client]);

  const value: AuthContext = {
    actor,
    login,
    logout,
    refetchMe,
  };

  useEffect(() => {
    refetchMe();
  }, []);

  const isLoading = loading;
  return <AuthContext.Provider value={value}>{isLoading ? null : children}</AuthContext.Provider>;
};
