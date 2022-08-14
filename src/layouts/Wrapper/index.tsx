import { Box, Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC, ReactNode } from 'react';
import Footer from '../Footer';
import Navigation from '../Navigation';

type Props = {
  children: ReactNode;
};

const Wrapper: FC<Props> = ({ children }) => {
  const router = useRouter();
  const nonAuth = ['/', '/login', '/register'].some(
    (item) => item === router.asPath
  );

  return (
    <Center
      display={'flex'}
      flexDir={'column'}
      position={'relative'}
      alignItems="center"
      minH={'100vh'}
      bgColor="green.300"
    >
      <Box as="main" w={'100%'} py="1rem">
        {children}
      </Box>
      {nonAuth && <Footer />}
      {!nonAuth && <Navigation />}
    </Center>
  );
};

export default Wrapper;
