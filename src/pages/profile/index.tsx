import MailIcon from '@/assets/icons/MailIcon';
import UserIcon from '@/assets/icons/UserIcon';
import { LOGOUT } from '@/client/graphquery/mutation';
import { GET_FOLLOWING, GET_PROFILE } from '@/client/graphquery/query';
import prisma from '@/server/db/client';
import { useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { addApolloState, initializeApollo } from 'lib/apollo';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { useState } from 'react';
import PhotoPlaceholder from '@/assets/img/PhotoPlaceholder.png';

interface FollowingUserType {
  id: string;
  createdAt: number;
  user: {
    id: string;
    email: string;
    userName: string;
  };
}

interface ProfileType {
  createdAt: number;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  userName: string;
  following: [FollowingUserType];
}
interface getProfileResponseType {
  UserById: ProfileType;
}

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

  await apolloClient.query({
    query: GET_PROFILE,
    variables: { data: { id: null } },
  });

  return addApolloState(apolloClient, {
    props: {
      isLoggedIn: true,
      token,
    },
  });
}

const ProfilePage: NextPage = (props) => {
  const { data, loading, error } = useQuery<getProfileResponseType>(
    GET_PROFILE,
    {
      variables: { data: { id: null } },
      notifyOnNetworkStatusChange: true,
    }
  );
  const router = useRouter();
  const [logout] = useMutation(LOGOUT);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      userName: data?.UserById.userName ?? '',
    },
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await logout();

      toast({
        position: 'top-right',
        title: `Logged out.`,
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
      return router.push('/');
    } catch (error) {
      console.log(error);
      toast({
        position: 'top-right',
        title: `Something went wrong`,
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const formLabelProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mt: '8px',
  };

  const formValidationErrorProps = {
    fontSize: 'xs',
    color: 'red',
    as: motion.span,
    initial: { opacity: 0.5, y: -5 },
    animate: { opacity: 1, y: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <Head>
        <title>Profile | Chat App</title>
      </Head>

      <Box
        as="button"
        fontSize={'sm'}
        bg="green.600"
        px={'1rem'}
        py={'0.2rem'}
        fontWeight="600"
        rounded={'84px'}
        color="white"
        position={'absolute'}
        top="1rem"
        right="1rem"
        onClick={handleLogout}
      >
        Logout
      </Box>

      <Box
        as="section"
        minW="100%"
        px={'1rem'}
        display={'flex'}
        flexDir={'column'}
        alignItems="center"
        justifyContent={'center'}
        position={'relative'}
      >
        <img
          style={{
            height: '84px',
            width: '84px',
            borderRadius: '99999px',
          }}
          src={PhotoPlaceholder.src}
          alt="photoprofile"
        />

        <Text>Followings: {data?.UserById.following.length}</Text>

        <form style={{ minWidth: '100%' }}>
          <VStack minW={'100%'}>
            <FormControl display={'flex'} alignItems="center">
              <FormLabel {...formLabelProps}>
                <MailIcon style={{ height: '24px' }} fill="currentColor" />
              </FormLabel>

              <Text fontSize={'sm'} px={'1rem'} py={'0.5rem'} fontWeight={600}>
                {data?.UserById.email}
              </Text>
            </FormControl>

            <FormControl display={'flex'} alignItems="center">
              <FormLabel {...formLabelProps}>
                <UserIcon style={{ height: '24px' }} fill="currentColor" />
              </FormLabel>
              {isEditing && (
                <>
                  <Input
                    fontSize={'sm'}
                    name="userName"
                    onChange={formik.handleChange}
                    value={formik.values.userName}
                    placeholder="Enter your user name"
                    type={'email'}
                    disabled={!isEditing ?? false}
                  ></Input>
                  {formik.errors.userName && formik.touched.userName && (
                    <Text {...formValidationErrorProps}>
                      {formik.errors.userName}
                    </Text>
                  )}
                </>
              )}

              {!isEditing && (
                <Text
                  fontSize={'sm'}
                  px={'1rem'}
                  py={'0.5rem'}
                  fontWeight={600}
                >
                  {data?.UserById.userName}
                </Text>
              )}
            </FormControl>
            <Button
              onClick={() => setIsEditing((prev) => !prev)}
              alignSelf="end"
            >
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default ProfilePage;
