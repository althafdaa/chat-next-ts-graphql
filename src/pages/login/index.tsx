import LoginIcon from '@/assets/icons/LoginIcon';
import { LOGIN_USER } from '@/client/graphquery/mutation';
import BackButton from '@/components/BackButton';
import InputErrorMessage from '@/components/General/Form/InputErrorMessage';
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
import nookies from 'nookies';
import { Link as ChakraLink } from '@chakra-ui/react';

interface FormikValuesType {
  userName: string;
  password: string;
}

interface LoginPageProps {
  token: string | null;
  isLoggedIn: boolean;
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { token } = nookies.get(ctx);

  if (!token) {
    return {
      props: { isLoggedIn: false, token: null },
    };
  }

  return {
    props: { isLoggedIn: true, token: token },
    redirect: { permanent: false, destination: '/search' },
  };
}

const LoginPage: NextPage<LoginPageProps> = () => {
  const [loginUser] = useMutation(LOGIN_USER);
  const router = useRouter();

  const handleSubmit = async (data: FormikValuesType) => {
    try {
      const res = await loginUser({
        variables: { data },
      });

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

  const isFormInvalid = (name: string) => {
    // @ts-ignore
    if (formik.errors[name] && formik.touched[name]) return true;
    else false;
  };

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
                  <FormControl isInvalid={isFormInvalid('userName')}>
                    <FormLabel>Username</FormLabel>
                    <Input
                      name="userName"
                      onChange={formik.handleChange}
                      value={formik.values.userName}
                      placeholder="Enter your username"
                    />
                    <InputErrorMessage name="userName" formik={formik} />
                  </FormControl>
                  <FormControl isInvalid={isFormInvalid('password')}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder="Enter your password"
                      type={'password'}
                    />
                    <InputErrorMessage name="password" formik={formik} />
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
                    <ChakraLink color="green.600" fontWeight={700}>
                      Join Us
                    </ChakraLink>
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
