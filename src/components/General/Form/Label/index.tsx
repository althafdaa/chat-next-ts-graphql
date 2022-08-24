import { FormLabel } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

interface LabelProps {
  children: ReactNode;
}

const Label: FC<LabelProps> = ({ children }) => {
  const stylingProps = {
    fontSize: 'xs',
    fontWeight: '500',
  };
  return <FormLabel {...stylingProps}>{children}</FormLabel>;
};

export default Label;
