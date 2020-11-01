import { InMemoryCache, ApolloClient, from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import fetch from 'unfetch';

import introspectionResult from '../generated/introspection-result';
import { getToken } from './auth-token';

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
    authorization?: string;
  };
};

const authLink = setContext((_operation, prevContext: AuthHeader) => {
  const token = getToken();
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : '',
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
