import '../styles/globals.css';
import type { AppType } from 'next/dist/shared/lib/utils';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import Wrapper from '@/layouts/Wrapper';
import client from 'lib/apollo';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
