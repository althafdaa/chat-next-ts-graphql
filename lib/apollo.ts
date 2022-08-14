import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { parseCookies } from 'nookies';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/api/graphql',
});

const authLink = setContext((_, { headers }) => {
  const { chat_app_token: token } = parseCookies();
  return {
    headers: {
      ...headers,
      authorization: token ?? '',
    },
  };
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
