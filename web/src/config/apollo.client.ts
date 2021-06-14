import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.SERVER_URI!,
});

const authLink = setContext(() => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      'x-auth-token': localStorage.getItem('token') || '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
