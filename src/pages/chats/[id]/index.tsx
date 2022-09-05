import SendIcon from '@/assets/icons/SendIcon';
import { SEND_MESSAGE } from '@/client/graphquery/mutation';
import { GET_MESSAGE } from '@/client/graphquery/query';
import ChatBubble from '@/components/General/ChatBubble';
import prisma from '@/server/db/client';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, FormControl, Textarea } from '@chakra-ui/react';
import { FormikHelpers, useFormik } from 'formik';
import { addApolloState, initializeApollo } from 'lib/apollo';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import nookies from 'nookies';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { token } = nookies.get({ req: ctx.req });
  const { id } = ctx.query;

  if (!token) {
    return {
      props: { isLoggedIn: false, token: null },
      redirect: { permanent: false, destination: '/' },
    };
  }

  const apolloClient = initializeApollo({
    ctx: { req: ctx.req, prisma: prisma },
  });

  await apolloClient.query({
    query: GET_MESSAGE,
    variables: { data: { receiverId: id } },
  });

  return addApolloState(apolloClient, {
    props: {
      id,
      isLoggedIn: true,
      token,
    },
  });
}

interface ChatPagePropsType {
  id: string;
  token: string;
  isLoggedIn: boolean;
}

interface ChatFormikType {
  message: string;
}

export interface MessageType {
  id: number;
  createdAt: Date;
  text: string;
  receiverId: string;
  senderId: string;
  type: string;
}

interface MessageBetweenUser {
  msgBetweenUser: MessageType[];
}

const ChatPage: NextPage<ChatPagePropsType> = ({ id }) => {
  const { data, refetch } = useQuery<MessageBetweenUser>(GET_MESSAGE, {
    variables: { data: { receiverId: id } },
  });

  const { msgBetweenUser } = data || {};

  const [sendMessage] = useMutation(SEND_MESSAGE);
  const handleSubmit = async (
    values: ChatFormikType,
    action: FormikHelpers<any>
  ) => {
    try {
      await sendMessage({
        variables: { data: { receiverId: id, text: values.message } },
      });
      refetch();
      action.resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: {
      message: '',
    },
  });

  return (
    <>
      <Head>
        <title>Chat Room | Chat Graph</title>
      </Head>

      <Box
        position={'absolute'}
        top="0"
        bottom={'135px'}
        minWidth="100%"
        display="flex"
      >
        <Box
          minH={'100%'}
          w={'100%'}
          display="flex"
          flexDir={'column-reverse'}
          justifySelf="flex-end"
        >
          {msgBetweenUser?.map((item: MessageType, idx: number) => (
            <ChatBubble item={item} key={idx}>
              {item.text}
            </ChatBubble>
          ))}
        </Box>
      </Box>

      <form
        onSubmit={formik.handleSubmit}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            return formik.handleSubmit();
          }
        }}
        style={{
          position: 'absolute',
          bottom: '57px',
          left: '0',
          right: '0',
        }}
      >
        <FormControl borderTop={'0.5px'} position="relative">
          <Textarea
            rounded={'none'}
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
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
