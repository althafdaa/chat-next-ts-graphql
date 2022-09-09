import SendIcon from '@/assets/icons/SendIcon';
import { SEND_MESSAGE } from '@/client/graphquery/mutation';
import { GET_MESSAGE, GET_PROFILE } from '@/client/graphquery/query';
import ChatBubble from '@/components/General/ChatBubble';
import prisma from '@/server/db/client';
import { useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  FormControl,
  Image,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { FormikHelpers, useFormik } from 'formik';
import { addApolloState, initializeApollo } from 'lib/apollo';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import nookies from 'nookies';
import styles from './index.module.css';
import PhotoPlaceholder from '@/assets/img/PhotoPlaceholder.png';
import { getProfileResponseType } from '@/pages/profile';

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

  await apolloClient.query({
    query: GET_PROFILE,
    variables: { data: { id } },
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
    pollInterval: 1000,
  });
  const { data: profileData } = useQuery<getProfileResponseType>(GET_PROFILE, {
    variables: { data: { id } },
    notifyOnNetworkStatusChange: true,
  });

  const { UserById } = profileData || {};

  const { msgBetweenUser } = data || {};

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    notifyOnNetworkStatusChange: true,
  });
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
        as="header"
        position={'absolute'}
        top="0"
        minW={'100%'}
        display="flex"
        height="80px"
      >
        <Box
          p={'1rem'}
          bg="red"
          minW={'100%'}
          display="flex"
          alignItems={'center'}
          bgColor={'green.600'}
          roundedBottom={'xl'}
          boxShadow="xl"
          gap="1rem"
        >
          <Image
            rounded={'full'}
            h="36px"
            src={PhotoPlaceholder.src}
            alt="user photo"
          />
          <Text color={'white'} fontWeight="700">
            {UserById?.userName}
          </Text>
        </Box>
      </Box>

      <Box
        as="main"
        position={'absolute'}
        bottom="135px"
        minWidth="100%"
        display="flex"
      >
        <Box
          className={styles.chatbox}
          minH={'100%'}
          w={'100%'}
          display="flex"
          pt={'1rem'}
          flexDir={'column-reverse'}
          maxH="calc(100vh - 220px)"
          justifySelf="flex-end"
          overflowY={'scroll'}
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
            onFocus={() => refetch()}
            onMouseEnter={() => refetch()}
            onMouseLeave={() => refetch()}
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
