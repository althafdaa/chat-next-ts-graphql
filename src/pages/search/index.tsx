import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

const SearchPage: NextPage = () => {
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

      <main>SearchPage</main>
    </Box>
  );
};

export default SearchPage;
