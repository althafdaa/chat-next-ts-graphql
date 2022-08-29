import SendIcon from '@/assets/icons/SendIcon';
import prisma from '@/server/db/client';
import {
  Box,
  Button,
  Circle,
  FormControl,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { addApolloState, initializeApollo } from 'lib/apollo';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import nookies from 'nookies';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { token } = nookies.get(ctx);
  const apolloClient = initializeApollo({
    ctx: { req: ctx.req, prisma: prisma },
  });

  if (!token) {
    return {
      props: { isLoggedIn: false, token: null },
      redirect: { permanent: false, destination: '/' },
    };
  }

  return addApolloState(apolloClient, {
    props: {
      isLoggedIn: true,
      token,
    },
  });
}

const ChatPage: NextPage = () => {
  const formik = useFormik({
    onSubmit: () => {},
    initialValues: {
      message: '',
    },
  });
  return (
    <>
      <Head>
        <title>Chat Room | Chat Graph</title>
      </Head>

      <Box w={'100%'}>ChatPage</Box>

      <form
        onSubmit={formik.handleSubmit}
        style={{ position: 'absolute', bottom: '57px', left: '0', right: '0' }}
      >
        <FormControl borderTop={'0.5px'} position="relative">
          <Textarea
            rounded={'none'}
            name="message"
            bg="gray.100"
            placeholder="Chats"
            maxW={'420px'}
          />
          <Button
            type="submit"
            p={0}
            rounded="full"
            position={'absolute'}
            zIndex="10"
            top={'0.3rem'}
            right="0.4rem"
            bg={'teal'}
          >
            <SendIcon
              style={{
                height: '24px',
              }}
              fill="white"
            />
          </Button>
        </FormControl>
      </form>
    </>
  );
};

export default ChatPage;
