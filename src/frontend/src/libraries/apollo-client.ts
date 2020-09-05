import { InMemoryCache, ApolloClient, from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import fetch from 'unfetch';

import introspectionResult from '../generated/introspection-result';

const cache = new InMemoryCache({ possibleTypes: introspectionResult.possibleTypes });

const errorLink = onError(({ graphQLErrors, networkError, forward, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, originalError }) => {
      // TODO: sentry

      // TODO: token expired

      console.log(
        `[GraphQL Error]: Message: ${message}, Locations: ${locations}, path: ${path}, originalError: ${originalError}`,
      );
    });
  }

  if (networkError) {
    console.log(`[Network Error]: ${networkError}`);
  }

  return forward(operation);
});

type AuthHeader = {
  headers?: {
    'x-auth-actor'?: string;
  };
};

const authLink = setContext((_operation, prevContext: AuthHeader) => {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlcyI6WyJBRE1JTiIsIk1FTUJFUiIsIkFOT05ZTU9VUyJdLCJpYXQiOjE1OTkyOTE3NjksImV4cCI6MTU5OTg5NjU2OX0.5Er0pc5Z-Dp6EUjsEgiqy6NhQnYGYSh-eBgEoEAxrPs';

  return {
    headers: {
      ...prevContext.headers,
      'x-auth-actor': token ?? '',
    },
  };
});

const uri = `http://localhost:3000/graphql`;
const httpLink = new HttpLink({
  uri,
  fetch,
  credentials: 'same-origin',
  includeExtensions: true,
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache,
  connectToDevTools: true,
});

export { client };
