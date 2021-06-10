import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import client from '@config/apollo.client';
import store from '@context/store';

//estilos de normalize
import 'normalize.css';
//estilos globales
import '@styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />;
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
