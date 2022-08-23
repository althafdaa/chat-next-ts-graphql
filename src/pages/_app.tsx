import '../styles/globals.css';
import type { AppType } from 'next/dist/shared/lib/utils';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import Wrapper from '@/layouts/Wrapper';
import { useApollo } from 'lib/apollo';

const MyApp: AppType = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
