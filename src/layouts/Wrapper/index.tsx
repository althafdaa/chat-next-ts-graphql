import { Center, Container } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Wrapper: FC<Props> = ({ children }) => {
  return (
    <Center>
      <Container>{children}</Container>
    </Center>
  );
};

export default Wrapper;
