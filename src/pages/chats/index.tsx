import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

const index: NextPage = () => {
  return (
    <Box
      minH="100vh"
      w={'100%'}
      py="1rem"
      display={'flex'}
      as="main"
      alignItems={'center'}
    >
      <Head>
        <title>Chats | Chat Graph</title>
      </Head>

      <main>index</main>
    </Box>
  );
};

export default index;
