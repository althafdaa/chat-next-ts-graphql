import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

const ChatsPage: NextPage = () => {
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

      <main>ChatsPage</main>
    </Box>
  );
};

export default ChatsPage;
