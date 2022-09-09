import RegisterIcon from '@/assets/icons/RegisterIcon';
import BackButton from '@/components/BackButton';
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
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '@/client/graphquery/mutation';
import { useRouter } from 'next/router';
import { parseErrorMsg, RegisterSchema } from '@/utils/validation';
import nookies from 'nookies';
import { useEffect } from 'react';
import InputErrorMessage from '@/components/General/Form/InputErrorMessage';

interface FormikValuesType {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

interface RegisterPageProps {
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

const RegisterPage: NextPage<RegisterPageProps> = ({ token }) => {
  const [registerUser] = useMutation(REGISTER_USER);
  const toast = useToast();
  const router = useRouter();

  const handleSubmit = async (data: FormikValuesType) => {
    try {
      await registerUser({ variables: { data } });

      toast({
        position: 'top-right',
        title: `Registration Success.`,
        status: 'success',
        duration: 1000,
        isClosable: true,
      });

      router.push('/login');
    } catch (error) {
      const errMsg = parseErrorMsg(error as Error);
      toast({
        position: 'top-right',
        title: 'Registration Failed',
        description: errMsg,
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      userName: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: handleSubmit,
    validationSchema: RegisterSchema,
  });
  const isFormInvalid = (name: string) => {
    // @ts-ignore
    if (formik.errors[name] && formik.touched[name]) return true;
    else false;
  };

  useEffect(() => {
    if (token) router.push('/');
  }, [token]);

  return (
    <Box minH="100vh" w={'100%'} py="1rem" display={'flex'} as="main">
      <Head>
        <title>Register | ChatsQL</title>
      </Head>

      <Box
        as="section"
        minW="100%"
        display={'flex'}
        flexDir={'column'}
        alignItems="center"
        justifyContent={'center'}
        position={'relative'}
      >
        <AnimatePresence>
          <Container display="flex" flexDir={'column'}>
            <BackButton backTo="/" text="Home" />

            <Box mb={'1rem'} display="flex" flexDir={'column'} gap="0.5rem">
              <Heading color={'gray.700'}>
                Hello, we need some of your confirmation
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
                  <FormControl isInvalid={isFormInvalid('email')}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      placeholder="Enter your email"
                      type={'email'}
                    ></Input>
                    <InputErrorMessage name="email" formik={formik} />
                  </FormControl>
                  <FormControl isInvalid={isFormInvalid('userName')}>
                    <FormLabel>Username</FormLabel>
                    <Input
                      name="userName"
                      onChange={formik.handleChange}
                      value={formik.values.userName}
                      placeholder="Enter your username"
                    ></Input>
                    <InputErrorMessage name="userName" formik={formik} />
                  </FormControl>

                  <FormControl isInvalid={isFormInvalid('firstName')}>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      name="firstName"
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                      placeholder="Enter your first name"
                    ></Input>
                    <InputErrorMessage name="firstName" formik={formik} />
                  </FormControl>

                  <FormControl isInvalid={isFormInvalid('lastName')}>
                    <FormLabel>Last name</FormLabel>
                    <Input
                      name="lastName"
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                      placeholder="Enter your last name"
                    ></Input>
                    <InputErrorMessage name="lastName" formik={formik} />
                  </FormControl>

                  <FormControl isInvalid={isFormInvalid('password')}>
                    <FormLabel>Password</FormLabel>
                    <Input
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder="Enter your password"
                      type={'password'}
                    ></Input>
                    <InputErrorMessage name="password" formik={formik} />
                  </FormControl>

                  <FormControl isInvalid={isFormInvalid('confirmPassword')}>
                    <FormLabel>Retype Password</FormLabel>
                    <Input
                      name="confirmPassword"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      placeholder="Retype your password"
                      type={'password'}
                    ></Input>

                    <InputErrorMessage name="confirmPassword" formik={formik} />
                  </FormControl>
                </VStack>
                <Button
                  isLoading={formik.isSubmitting}
                  type="submit"
                  minW="100%"
                  mt={'2rem'}
                >
                  <Box display={'flex'} alignItems="center" gap={'0.2rem'}>
                    <RegisterIcon style={{ width: '24px' }} />
                    Register
                  </Box>
                </Button>

                <Text fontSize={'xs'} as={'span'}>
                  Already have an account ?{' '}
                  <Link href={'/login'} passHref>
                    <a>
                      <Text as={'span'} color="green.600" fontWeight={700}>
                        Login
                      </Text>
                    </a>
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

export default RegisterPage;
