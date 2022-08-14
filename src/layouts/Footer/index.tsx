import { Box, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const CURRENT_YEAR = new Date().getFullYear();

  return (
    <>
      <Box pt={'16px'}></Box>
      <Box as="footer" pb="0.5rem" position={'absolute'} bottom={'0'}>
        <Text fontSize={'xs'} as="span" color={'black'}>
          built by{' '}
          <a
            href="https://www.linkedin.com/in/althafdaa/"
            target={'_blank'}
            rel="noreferrer"
          >
            @althafdaa
          </a>{' '}
          {CURRENT_YEAR}
        </Text>
      </Box>
    </>
  );
};

export default Footer;
