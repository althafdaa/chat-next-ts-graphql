import LoginIcon from '@/assets/icons/LoginIcon';
import { LOGIN_USER } from '@/client/graphquery/mutation';
import BackButton from '@/components/BackButton';
import { LoginSchema, parseErrorMsg } from '@/utils/validation';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { AnimatePresence, motion } from 'framer-motion';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import nookies, { setCookie } from 'nookies';
import { useEffect } from 'react';

interface FormikValuesType {
  userName: string;
  password: string;
}

interface LoginPageProps {
  token: string | null;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { chat_app_token } = nookies.get(ctx);

  // if (chat_app_token) {
  //   return {
  //     props: { token: chat_app_token },
  //     redirect: {
  //       permanent: false,
  //       destination: '/',
  //     },
  //   };
  // }

  return {
    props: { token: '' },
  };
}

const LoginPage: NextPage<LoginPageProps> = ({ token }) => {
  const [loginUser] = useMutation(LOGIN_USER);
  const router = useRouter();

  const handleSubmit = async (data: FormikValuesType) => {
    try {
      const res = await loginUser({
        variables: { data },
      });

      setCookie(null, 'chat_app_token', res.data.loginUser.token);

      toast({
        position: 'top-right',
        title: `Login Success.`,
        description: `Welcome ${res.data.loginUser.userName}`,
        status: 'success',
        duration: 1000,
        isClosable: true,
      });

      router.push('/search');
    } catch (error) {
      const errMsg = parseErrorMsg(error as Error);

      toast({
        position: 'top-right',
        title: 'Login Failed',
        description: errMsg,
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const toast = useToast();

  const formik = useFormik({
    initialValues: { userName: '', password: '' },
    onSubmit: handleSubmit,
    validationSchema: LoginSchema,
  });

  useEffect(() => {
    if (token) router.push('/');
  }, [token]);

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
        <title>Login | Chat Graph</title>
      </Head>

      <Box
        as="section"
        minW="100%"
        display={'flex'}
        alignItems="center"
        flexDir={'column'}
        justifyContent={'center'}
        position={'relative'}
      >
        <AnimatePresence>
          <Container display="flex" flexDir={'column'} minH="100%">
            <BackButton backTo="/" text="Home" />

            <Box mb={'1rem'} display="flex" flexDir={'column'} gap="0.5rem">
              <Heading color={'gray.700'}>
                One more step to connect with others
              </Heading>
              <Text fontSize={'xs'} color="gray.20" as={'span'}>
                Get yourself into the latest tech of chat-app built with Next,
                Typescript, and GraphQL
              </Text>
            </Box>

            <form onSubmit={formik.handleSubmit}>
              <VStack
                as={motion.div}
                initial={{ opacity: 0.8 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                bgColor={'white'}
                p="1rem"
                rounded={'lg'}
                boxShadow="md"
              >
                <VStack minW={'100%'}>
                  <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input
                      name="userName"
                      onChange={formik.handleChange}
                      value={formik.values.userName}
                      placeholder="Enter your username"
                    ></Input>
                    {formik.errors.userName && formik.touched.userName && (
                      <Text
                        fontSize="xs"
                        color="red"
                        as={motion.span}
                        initial={{ opacity: 0.5, y: -5 }}
                        animate={{ opacity: 1, y: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {formik.errors.userName}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder="Enter your password"
                      type={'password'}
                    ></Input>
                    {formik.errors.password && formik.touched.password && (
                      <Text
                        fontSize="xs"
                        color="red"
                        as={motion.span}
                        initial={{ opacity: 0.5, y: -5 }}
                        animate={{ opacity: 1, y: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {formik.errors.password}
                      </Text>
                    )}
                  </FormControl>
                </VStack>
                <Button
                  isLoading={formik.isSubmitting}
                  type="submit"
                  minW="100%"
                  mt={'2rem'}
                >
                  <Box display={'flex'} alignItems="center" gap={'0.2rem'}>
                    <LoginIcon style={{ width: '24px' }} />
                    LOGIN
                  </Box>
                </Button>

                <Text fontSize={'xs'} as={'span'}>
                  Haven&apos;t registered yet ?{' '}
                  <Link href={'/register'}>
                    <Text as={'span'} color="green.600" fontWeight={700}>
                      Join Us
                    </Text>
                  </Link>
                </Text>
              </VStack>
            </form>
          </Container>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default LoginPage;
