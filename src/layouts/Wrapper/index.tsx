import FollowingDrawer from '@/components/FollowingDrawer';
import { Center, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC, ReactNode } from 'react';
import Footer from '../Footer';
import Navigation from '../Navigation';

type Props = {
  children: ReactNode;
};

const Wrapper: FC<Props> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const nonAuth = ['/', '/login', '/register'].some(
    (item) => item === router.asPath
  );

  return (
    <Center
      display={'flex'}
      flexDir="column"
      position={'relative'}
      minH={'100vh'}
      bgColor={nonAuth ? 'green.300' : 'gray.100'}
    >
      {!nonAuth && (
        <FollowingDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      )}
      {children}

      {nonAuth && <Footer />}
      {!nonAuth && <Navigation onOpen={onOpen} />}
    </Center>
  );
};

export default Wrapper;
