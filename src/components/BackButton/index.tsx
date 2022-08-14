import ChevronIcon from '@/assets/icons/Chevronicon';
import { Box } from '@chakra-ui/react';
import Link from 'next/link';
import React, { FC } from 'react';

interface BackButtonProps {
  text: string;
  backTo: string;
}

const BackButton: FC<BackButtonProps> = ({ text, backTo }) => {
  return (
    <Link href={backTo} passHref>
      <Box as="button" display="flex" fontWeight={600}>
        <ChevronIcon style={{ height: '24px' }} />
        {text}
      </Box>
    </Link>
  );
};

export default BackButton;
