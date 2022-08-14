import { Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC, ReactNode } from 'react';
import Footer from '../Footer';
import Navigation from '../Navigation';

type Props = {
  children: ReactNode;
};

const Wrapper: FC<Props> = ({ children }) => {
  const router = useRouter();
  const hideNavigation = ['/', '/login', '/register'].some(
    (item) => item === router.asPath
  );

  return (
    <Center flexDir={'column'} position={'relative'} minH={'100vh'}>
      {children}
      {hideNavigation && <Footer />}
      {!hideNavigation && <Navigation />}
    </Center>
  );
};

export default Wrapper;
