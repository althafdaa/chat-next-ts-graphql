import ChevronIcon from '@/assets/icons/Chevronicon';
import { Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import React, { FC } from 'react';

interface BackButtonProps {
  text: string;
  backTo: string;
}

const BackButton: FC<BackButtonProps> = ({ text, backTo }) => {
  return (
    <Link href={backTo} passHref>
      <ChakraLink display="flex" fontWeight={600} alignSelf="start">
        <ChevronIcon style={{ height: '24px' }} />
        {text}
      </ChakraLink>
    </Link>
  );
};

export default BackButton;
