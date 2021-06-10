import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.SERVER_URI!,
  }),
  cache: new InMemoryCache(),
});

export default client;
