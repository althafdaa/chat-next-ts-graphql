import MailIcon from '@/assets/icons/MailIcon';
import UserIcon from '@/assets/icons/UserIcon';
import { LOGOUT, UPDATE_PROFILE } from '@/client/graphquery/mutation';
import { GET_PROFILE } from '@/client/graphquery/query';
import prisma from '@/server/db/client';
import { useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { addApolloState, initializeApollo } from 'lib/apollo';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import nookies from 'nookies';
import { useState } from 'react';
import PhotoPlaceholder from '@/assets/img/PhotoPlaceholder.png';
import { UpdateProfileSchema } from '@/utils/validation';
import Link from 'next/link';
import InputErrorMessage from '@/components/General/Form/InputErrorMessage';

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
  followings: [FollowingUserType];
}
export interface getProfileResponseType {
  UserById: ProfileType;
}

interface updateProfileFormikType {
  userName: string;
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

const ProfilePage: NextPage = () => {
  const { data, refetch } = useQuery<getProfileResponseType>(GET_PROFILE, {
    variables: { data: { id: null } },
    notifyOnNetworkStatusChange: true,
  });
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const [logout] = useMutation(LOGOUT);
  const toast = useToast();
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

      window.location.reload();
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

  const handleSubmit = async (payload: updateProfileFormikType) => {
    try {
      if (payload.userName === data?.UserById.userName) {
        return setIsEditing(false);
      }

      await updateProfile({ variables: { data: payload } });

      refetch();

      toast({
        position: 'top-right',
        title: `Profile updated.`,
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      const err = error as Error;
      console.log(err);
      toast({
        position: 'top-right',
        title: err.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    } finally {
      setIsEditing(false);
    }
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: {
      userName: data?.UserById.userName ?? '',
    },
    validationSchema: UpdateProfileSchema,
    validateOnChange: true,
  });

  const formLabelProps = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mt: '8px',
  };

  const isFormInvalid = (name: string) => {
    // @ts-ignore
    if (formik.errors[name] && formik.touched[name]) return true;
    else false;
  };

  return (
    <>
      <Head>
        <title>Profile | ChatsQL</title>
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

        <Text fontSize={'sm'} fontWeight={400} mt={'12px'}>
          {data?.UserById.followings.length} followings
        </Text>

        <form style={{ minWidth: '100%' }} onSubmit={formik.handleSubmit}>
          <VStack minW={'100%'}>
            <FormControl display={'flex'} alignItems="center">
              <FormLabel {...formLabelProps}>
                <MailIcon style={{ height: '24px' }} fill="currentColor" />
              </FormLabel>

              <Text fontSize={'sm'} px={'1rem'} py={'0.5rem'} fontWeight={600}>
                {data?.UserById.email}
              </Text>
            </FormControl>

            <FormControl isInvalid={isFormInvalid('userName')}>
              <Box display={'flex'} alignItems="center">
                <FormLabel {...formLabelProps}>
                  <UserIcon style={{ height: '24px' }} fill="currentColor" />
                </FormLabel>
                {isEditing && (
                  <Input
                    fontSize={'sm'}
                    name="userName"
                    onChange={formik.handleChange}
                    value={formik.values.userName}
                    placeholder="Enter your user name"
                    type={'text'}
                    disabled={!isEditing ?? false}
                  ></Input>
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
              </Box>
              <InputErrorMessage name="userName" formik={formik} />
            </FormControl>
            <Link href={'/profile/reset-password'} passHref>
              <ChakraLink alignSelf={'end'} fontSize={'xs'}>
                Change password
              </ChakraLink>
            </Link>

            {isEditing && (
              <Flex alignSelf="end" gap={'0.5rem'}>
                <Button
                  fontSize={'sm'}
                  colorScheme="pink"
                  fontWeight="500"
                  onClick={() => {
                    setIsEditing(false);
                    formik.resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  fontSize={'sm'}
                  colorScheme="teal"
                  type={'submit'}
                  alignSelf="end"
                  fontWeight="500"
                >
                  Save
                </Button>
              </Flex>
            )}

            {!isEditing && (
              <Button
                fontSize={'sm'}
                type={'button'}
                onClick={() => {
                  setIsEditing(true);
                  formik.setValues({ userName: data?.UserById.userName ?? '' });
                }}
                alignSelf="end"
              >
                Edit
              </Button>
            )}
          </VStack>
        </form>
      </Box>
    </>
  );
};

export default ProfilePage;
